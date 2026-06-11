import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // Initialize server-side Gemini client
  let ai: GoogleGenAI | null = null;
  try {
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY") {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      console.log("GoogleGenAI initialized successfully from GEMINI_API_KEY secret.");
    } else {
      console.warn("GEMINI_API_KEY environment variable is a placeholder or not found. Chat queries will be answered with offline sustainability intelligence.");
    }
  } catch (err) {
    console.error("Error initializing GoogleGenAI:", err);
  }

  // API router FIRST
  app.post("/api/ask-eva", async (req, res) => {
    try {
      const { prompt, history } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      if (!ai) {
        // Intelligent offline responder representing Eva with context
        const responseLower = prompt.toLowerCase();
        let fallbackText = "";

        if (responseLower.includes("scope 1") || responseLower.includes("calculate") || responseLower.includes("emission")) {
          fallbackText = `### Offline Guidance on Calculating Emissions

To calculate **Scope 1 (Direct) Emissions** for your facilities:
1. **Identify Sources**: Natural gas burners, diesel backup generators, and company-owned fleet vehicles.
2. **Collect Activity Data**: Look at utility invoices for fuel usage metrics (e.g., Therms or MMBtu of natural gas, gallons of diesel).
3. **Apply Emission Factors**: Use regional factors like US EPA or Defra.
   $$\\text{Emissions (kg CO2e)} = \\text{Fuel Consumed} \\times \\text{Emission Factor}$$

*SmartEase Tip: Use our "Facilities" tab to click on any site and input physical consumption. The system automatically computes tCO2e using live GHG Protocol coefficients!*`;
        } else if (responseLower.includes("brsr") || responseLower.includes("align") || responseLower.includes("report") || responseLower.includes("framework")) {
          fallbackText = `### BRSR Alignment & Reporting Guidelines

The **Business Responsibility and Sustainability Report (BRSR)** is mandated for top listed entities in India and requested globally:
- **Section A**: General Disclosures about your corporate entity and operational sites.
- **Section B**: Management and Process Disclosures (policies on human rights, environment, ethics).
- **Section C**: Principle-wise Performance Disclosures (Essential vs. Leadership indicators).

**To optimize your BRSR alignment in SmartEase:**
- Keep your Scope 1 and Scope 2 metrics verified month-by-month in the **ESG Performance** section.
- Compile worker training percentages and safety incidence rates in our **Assessment/VCP** questionnaire.
- Download the aggregated CSRD/BRSR-compliant CSV from our **Reports** tab.`;
        } else if (responseLower.includes("water") || responseLower.includes("consumption") || responseLower.includes("flag")) {
          fallbackText = `### Water Footprint & Intensity Flags Analysis

Water consumption risks are tracked in detail under our **Facilities** section:
- **Baseline Flags**: Tokyo Hub shows a **15% year-on-year increase** in municipal water intake, triggering a baseline flag.
- **Intensity Metrics**: Look at $m^3$ of water consumed per FTE.
- **Mitigation Ideas**: Install low-flow smart valves and implement internal graywater recycling loops.

*Activate these automations in the "Automation & Logs" panel to receive smart Slack alerts if any facility exceeds its rolling 30-day water allocation.*`;
        } else {
          fallbackText = `### Ask Eva - Sustainted Corporate ESG Insights

Hello! I am **Eva**, your SmartEase sustainability companion. Here are some key metrics and frameworks you can track and learn more about:

1. **Carbon Footprint Monitoring**
   - Track fuel consumption (Scope 1) and purchased electricity (Scope 2).
   - Track your supplier value chain (Scope 3).
2. **Framework Compliance**
   - BRSR (Essential Indicators)
   - SEC Climate Disclosures
   - CSRD (Double Materiality alignments)
3. **Targets & Net-Zero Trajectories**
   - Establish Science Based Targets (SBTi).
   - Set intermediate renewable energy thresholds.

*To query me with real-time generative intelligence, configure your \`GEMINI_API_KEY\` secret in the **Secrets** panel.*`;
        }

        return res.json({ text: fallbackText });
      }

      const systemInstruction = `You are "Eva", SmartEase's advanced AI sustainability consultant. 
You provide expert advice on ESG performance, corporate carbon accounting, CSRD/SEC rules, BRSR (Business Responsibility and Sustainability Reporting) standards, and practical green initiatives. 
Keep answers structured, professional, and clear. Format key metrics and lists in beautiful, scannable Markdown. Use tables and bullet points where helpful. Mention specific SmartEase modules such as the "Facilities Dashboard" or "Goals Tracker" where appropriate.`;

      let textResponse = "";
      if (history && Array.isArray(history) && history.length > 0) {
        const contents = history.map(h => ({
          role: h.role === "assistant" ? "model" : "user",
          parts: [{ text: h.content }]
        }));
        
        contents.push({ role: "user", parts: [{ text: prompt }] });
        
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents,
          config: {
            systemInstruction,
          }
        });
        textResponse = response.text || "No response generated.";
      } else {
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            systemInstruction,
          }
        });
        textResponse = response.text || "No response generated.";
      }

      res.json({ text: textResponse });
    } catch (err: any) {
      console.error("Ask Eva controller error:", err);
      res.status(500).json({ error: err.message || "An error occurred with Gemini." });
    }
  });

  // Serve static assets or mount Vite in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: any, res: any) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
