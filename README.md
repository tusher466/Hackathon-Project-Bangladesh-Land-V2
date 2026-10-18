# Bangladesh Integrated Land Service Platform (BILSP)

🌐 **Live Demo:** [https://hackathon-project-bangladesh-land-v.vercel.app/](https://hackathon-project-bangladesh-land-v.vercel.app/)[cite: 1]

---

## 📌 Executive Summary & Problem Statement
The **Bangladesh Integrated Land Service Platform (BILSP)** is a full-stack e-governance architecture engineered to resolve the most critical systemic failure in Bangladesh's land administration: the **complete institutional disconnection and lack of real-time data synchronization between Deed Registration** (managed by Sub-Registry Offices under the Ministry of Law) and **Record Mutation & Cadastral Mapping** (managed by AC Land Offices and the Department of Land Records & Surveys under the Ministry of Land). 

When a property transaction is executed and registered, the official ownership record (*Khatian*) and the physical plot boundary map (*Mouza Dag*) do not update automatically. Because registrars lack real-time access to live records, encumbrances, or government schedules during registration—and because completing a manual mutation (*Namjari*) takes an arduous 45 to 90+ days across a separate ministry—a massive administrative loophole is created. Fraudsters exploit this structural gap to repeatedly sell the same plot using forged deeds, while everyday citizens face severe inheritance (*Farayej*) miscalculations, boundary disputes, and systemic extortion by middlemen (*Dalals*)[cite: 1].

### The Evidence
* **Judicial Backlog:** According to Supreme Court and legal research statistics, **over 70% of all pending civil and criminal litigation in Bangladesh (surpassing 3 million active cases)** directly originates from land disputes, driven heavily by dual registrations, fake *Khatians*, and unverified title transfers.
* **Bureaucratic Extortion:** Reports from Transparency International Bangladesh (TIB) consistently rank land administration among the most corruption-plagued public sectors, where **more than 60% of service seekers report paying bribes or relying on intermediaries** solely due to fragmented records and non-transparent bureaucratic workflows.

---

## 💡 Our Solution & Mechanism (How It Works)
Instead of digitizing forms in isolation, BILSP operates as a unified, state-synchronized pipeline (`server.ts`, `apiClient.ts`) that binds spatial plot geometry, ownership records, and three separate government departments into a single source of truth[cite: 1].

1. **Spatial-to-Registry Pre-Verification (Citizen Layer):** 
   * When a citizen selects a region (`geoData.ts`, `districtVectorsData.ts`), the **Interactive GIS Map** (`BangladeshInteractiveMap.tsx`) renders interactive plot polygons (*Dags*) from cadastral vector data (`cadastralDagsData.ts`)[cite: 1].
   * Clicking a plot polygon instantly queries the central registry (`registryData.ts`) to return current ownership, land class, and active restrictions, while **Vested Property Search** (`VestedPropertySearchModal.tsx`) and **Khas Land** modules (`KhasLandApplicationModal.tsx`) cross-check restricted government schedules prior to contract signing[cite: 1].
2. **Event-Driven Three-Workspace State Machine (Admin Layer):**
   * **Deed Registration Workspace (`DeedRegistrationWorkspace.tsx`):** Approving a deed locks that specific *Dag/Khatian* share in the database, making simultaneous double-registrations technically impossible[cite: 1].
   * **Records & Tax Workspace (`RecordsAndTaxWorkspace.tsx`):** Instantly pushes a pre-populated e-mutation payload to the AC Land officer's queue for rapid *Khatian* splitting and tax ledger updates[cite: 1].
   * **Survey & Mapping Workspace (`SurveyAndMappingWorkspace.tsx`):** Dynamically updates polygon coordinates and boundary metadata whenever plots are split or physical demarcations are completed via the **Amin Demarcation Modal** (`AminDemarcationModal.tsx`)[cite: 1].
3. **Algorithmic & AI-Driven Broker Bypass:**
   * **Farayej Calculator (`FarayejCalculatorModal.tsx`):** Computes precise fractional and decimal land distribution shares per heir based on statutory inheritance laws[cite: 1].
   * **Guidance & AI Engine:** Combines statutory checklists (`BhumiSutraView.tsx`, `TaskBrowser.tsx`) with a 24/7 bilingual **Land AI Assistant** (`LandAIAssistantModal.tsx`) to route direct digital applications—such as **Certified Deed Orders** (`CertifiedDeedOrderModal.tsx`)—straight to relevant administrative queues[cite: 1].

---

## 🛠️ Tech Stack & Feasibility

* **Frontend:** React, Vite (`vite.config.ts`), Tailwind CSS v4 (`src/index.css`), React Context API (`AuthContext.tsx`, `LanguageContext.tsx` for instant bilingual toggling)[cite: 1].
* **Backend & Runtime:** Bun (`bun.lock`), TypeScript HTTP/REST Server (`server.ts`), and central API client abstraction (`apiClient.ts`)[cite: 1].
* **Data Models & Types:** End-to-end strictly typed schemas (`bilsp.ts`, `authAndGeo.ts`) ensuring error-free legal and financial computations[cite: 1].
* **GIS Mapping Engine:** Custom browser-native vector/SVG rendering engine (`BangladeshInteractiveMap.tsx`) optimized for low-bandwidth rural networks without heavy commercial GIS license dependencies[cite: 1].
* **Deployment:** Live production hosting on Vercel (`https://hackathon-project-bangladesh-land-v.vercel.app/`)[cite: 1].

---

## 📊 Data Sources

To strictly protect citizen privacy while demonstrating a fully functional architecture, BILSP utilizes a hybrid model:
* **Authentic Public Data:** Statutory service workflows, document checklists, and fee schedules (`registryData.ts`, `BhumiSutraView.tsx`) are sourced from the Ministry of Land and DLRS open manuals[cite: 1]. Administrative hierarchies and vector boundaries (`geoData.ts`, `districtVectorsData.ts`) derive from open BBS/GeoDASH datasets[cite: 1].
* **Synthetic Cadastral & Ownership Records:** Individual *Khatian* entries, NIDs, owner profiles, polygon coordinates (`cadastralDagsData.ts`), and pending workflows (`adminDemoData.ts`) are **100% synthetic**, strictly structured to match authentic Bangladeshi CS/RS/BS schemas for seamless future government database integration[cite: 1].

---

## ⚙️ How to Run Locally

Follow these steps to set up and run the project on your local machine:

### 1. Prerequisites
Ensure you have the following installed on your system:
* **Node.js** (v18 or higher recommended)
* **Bun** (preferred runtime) or **npm**

### 2. Clone the Repository
```bash
git clone [https://github.com/your-username/hackathon-project-bangladesh-land-v2.git](https://github.com/your-username/hackathon-project-bangladesh-land-v2.git)
cd hackathon-project-bangladesh-land-v2
