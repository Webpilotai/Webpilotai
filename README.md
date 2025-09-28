
# 🌐 **WebPilot AI ✈️**

**“Your personal co-pilot for the web” – it doesn’t just answer, it executes.**

---

## 📌 **Project Summary**

### 🔎 **Problem Understanding**

Browsing the web to achieve even a simple goal is still **time-consuming**.
Example: *Finding laptops under ₹50,000 requires…*

* Searching multiple sites
* Opening product pages
* Comparing features
* Checking stock availability
* Writing down results

👉 Current AI tools only **give text answers**. They **cannot autonomously perform multi-step tasks** in a real browser.

---

### 💡 **Proposed Prototype Solution**

Our project **WebPilot AI** transforms natural language instructions into **complete browsing journeys**.

✔️ A **local LLM** interprets the query
✔️ Generates a **step-by-step plan**
✔️ **Browser automation** executes it
✔️ System collects data → presents in **two formats**:

* 📝 **Human-readable summaries** – quick highlights
* 📊 **Structured outputs** – CSV/JSON/tables for deeper analysis

---

### 🚀 **Uniqueness and Impact**

Unlike normal chatbots that *“talk but don’t act”*, **WebPilot AI does the work**.

**Direct benefits:**

* 🛒 **E-commerce:** Instant product comparisons
* 📚 **Research:** Summarize and structure info from 10+ sites
* ✈️ **Travel:** Compare bookings across multiple platforms
* ♿ **Accessibility:** Assist less tech-savvy users

---

## 📝 **Submission Template**

### a) **Problem Statement Reference**

* **Problem Statement Chosen:** HACXPB002 – Web Navigator AI Agent (OneCompiler)
* **Reason to Choose:** Current AI tools only generate answers. We want one that can **act inside the browser** and deliver **actionable outputs**.

---

### b) **Solution Overview**

**Proposed Approach (2–3 lines):**
➡️ Parse instructions → create workflow plan → run browser automation → extract results → deliver **summary + structured output**.

**Key Features / Modules:**

* ✅ Natural language parser (LLM)
* ✅ Multi-step planner & orchestrator
* ✅ Browser automation (Playwright)
* ✅ Data extraction & cleaning
* ✅ Dual outputs (summary + CSV/JSON)

---

### c) **System Architecture**

**Workflow Diagram (Text):**

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
2. LLM creates step-by-step plan.
3. Orchestrator runs each step.
4. Browser visits sites & extracts info.
5. Data cleaned & normalized.
6. Results returned as **summary + CSV/JSON**.

---

### d) **Technology Stack**

* **Backend:** Python (FastAPI, Playwright)
* **Frontend:** React (UI for input/output)
* **Database:** SQLite (results + logs)
* **ML/AI Frameworks:** LangChain + Local LLMs (Ollama, LLaMA 2, GPT4All)
* **Libraries:** BeautifulSoup, Pandas

---

### e) **Algorithms & Models**

* **Algorithms Chosen:** LLM for parsing & workflow planning + Playwright for execution
* **Reason:**

  * LLMs → understand free-text instructions
  * Playwright → reliable browser actions
* **Training & Testing:** Few-shot prompts, tested on shopping/news/travel tasks

---

### f) **Data Handling**

* **Data Sources:** Live websites (e-commerce, search, news)
* **Preprocessing:** HTML cleanup, text filtering, duplicate removal, spec/price normalization
* **Storage:** SQLite (logs) + CSV/JSON (outputs)

---

### g) **Implementation Plan**

1. ⚙️ Setup LLM + Playwright + FastAPI
2. 🧩 Build parser, orchestrator, automation modules
3. 📑 Add summary + structured output layer
4. 🧪 Test on real-world queries
5. 📦 Deploy with Docker + simple web UI

---

### h) **Performance & Validation**

* **Metrics:** Success rate, accuracy of data, clarity of summaries, latency per workflow
* **Testing Strategy:** Product comparison & news scenarios + human feedback on readability

---

### i) **Deployment & Scalability**

* **Deployment Plan:** Dockerized backend + frontend; runs locally with web UI
* **Scalability:** Pluggable LLMs, multi-threading, cloud-ready design

---

🔥 **WebPilot AI** = **Your personal co-pilot for the web** – it doesn’t just answer, it **executes**.



