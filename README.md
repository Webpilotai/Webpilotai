 🌐 WebPilot AI ✈️
 
 📌 Project Summary

🔎 Problem Understanding

Browsing the web to achieve even a simple goal is still **time-consuming and repetitive**.
👉 Example: *Finding laptops under ₹50,000 means searching → opening sites → comparing features → checking stock → writing results manually.*
💡 Current AI tools **only generate text answers**. They cannot autonomously **perform multi-step workflows in a real browser**.

### 💡 Proposed Prototype Solution

Our project **WebPilot AI** transforms **natural language instructions** into **complete browsing journeys**.

✨ How it works:

1. 🧠 Local **LLM** interprets the query and creates a step-by-step plan
2. 🤖 **Browser automation (Playwright)** executes the plan in real time
3. 📊 Extracted data is returned in two layers:

   * **📝 Human-readable summary** – quick, clear highlights
   * **📂 Structured outputs (CSV/JSON/Table)** – for deeper analysis

### 🚀 Uniqueness & Impact

Unlike normal chatbots that *“talk but don’t act”*, **WebPilot AI** really **does the work**:

* 🛒 **E-commerce** → Compare prices & specs across sites
* 📚 **Research** → Summarize multi-source content
* ✈️ **Travel** → Check flight or hotel listings across portals
* ♿ **Accessibility** → Help non-technical users get structured answers

✅ Result: A true **digital research assistant** that saves hours of effort.

---

## 4. Submission Template

### a) Problem Statement Reference

* **Problem Statement Chosen:** HACXPB002 – Web Navigator AI Agent (OneCompiler)
* **Reason to Choose:** Current AI tools can only generate answers. We aim to build one that can **act inside the browser** and deliver **actionable outputs**.

---

### b) Solution Overview


➡️ Parse instructions → create workflow plan → run browser automation → extract results → deliver **summary + structured output**

**Key Features / Modules:**

* ✅ Natural language parser (**LLM**)
* ✅ Multi-step planner & orchestrator
* ✅ Browser automation (**Playwright**)
* ✅ Data extraction & cleaning
* ✅ Dual outputs: summary + CSV/JSON

---

### c) System Architecture

**Workflow (Text):**

```
User Instruction
   ↓
LLM Parser & Planner
   ↓
Task Orchestrator
   ↓
Browser Automation (Playwright)
   ↓
Data Extraction
   ↓
Outputs:
   • Human-readable Summary
   • Structured Data (CSV/JSON/Table)
```

**Data Flow Explanation:**

1. User gives a query (e.g., “Find laptops under 50k”).
2. LLM generates a **step-by-step plan**.
3. Orchestrator executes each step.
4. Browser visits sites & extracts info.
5. Extracted data is cleaned & normalized.
6. Results returned as:

   * 📝 **Summary**
   * 📊 **CSV/JSON**

---

### d) Technology Stack

* ⚙️ **Backend:** Python (FastAPI, Playwright)
* 💻 **Frontend:** React (UI for input/output)
* 🗄️ **Database:** SQLite (results + logs)
* 🧠 **ML/AI:** LangChain + Local LLMs (Ollama, LLaMA 2, GPT4All)
* 📚 **Libraries:** BeautifulSoup, Pandas

---

### e) Algorithms & Models

* **Algorithm(s):** LLM for parsing & workflow planning + Playwright for execution
* **Reason:** LLMs understand natural instructions; Playwright ensures reliable actions
* **Training & Testing:** Few-shot prompts, tested on **shopping, news, and travel tasks**

---

### f) Data Handling

* 📡 **Sources:** Live websites (e-commerce, news, search portals)
* 🧹 **Preprocessing:** HTML cleanup, text filtering, duplicate removal, spec/price normalization
* 💾 **Storage:** SQLite (logs), CSV/JSON (outputs)

---

### g) Implementation Plan

1. ⚙️ Setup → LLM + Playwright + FastAPI
2. 🧩 Core → Build parser, orchestrator, automation scripts
3. 📑 Output → Add summary + structured export
4. 🧪 Testing → Real-world queries (shopping, research)
5. 📦 Deploy → React UI + FastAPI, packaged in Docker

---

### h) Performance & Validation

**Metrics:**

* 📊 Task success rate
* 🎯 Accuracy of extracted info
* 📝 Clarity of summaries
* ⚡ Response time per workflow

**Testing Strategy:**

* 🛒 Product comparisons
* 📰 News summarization
* 👥 Human feedback on readability

---

### i) Deployment & Scalability

* 🚀 **Deployment:** Dockerized backend + frontend; accessible via simple UI
* 📈 **Scalability:**

  * Modular (swap LLMs easily)
  * Multi-threading for parallel tasks
  * Cloud-ready design for enterprise

---

🔥 **WebPilot AI** = *“Your personal co-pilot for the web”* – It doesn’t just **answer**, it **executes**.

---

