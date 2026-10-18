# 🇧🇩 Bangladesh Integrated Land Services Portal (BILSP)

### One Nation. One Portal. Simplified Land Services.

<p align="center">
  <a href="https://hackathon-project-bangladesh-land-v.vercel.app/">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Visit_BILSP-0F766E?style=for-the-badge" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/Land_Tech_Hackathon-2026-2563EB?style=for-the-badge" alt="Land Tech Hackathon 2026" />
  <img src="https://img.shields.io/badge/Interface-Bangla_%7C_English-9333EA?style=for-the-badge" alt="Bilingual Interface" />
  <img src="https://img.shields.io/badge/Status-Prototype-F59E0B?style=for-the-badge" alt="Prototype" />
</p>

**BILSP (Bangladesh Integrated Land Services Portal)** is a citizen-focused digital platform concept designed to make Bangladesh's land-related services easier to discover, understand, and navigate from one place.

Instead of requiring citizens to search across multiple websites and government offices, BILSP brings together a searchable service directory, institutional information, land-office discovery, interactive mapping concepts, citizen tools, and an AI-powered land information assistant in one unified interface.

> **🌐 Live Website:** [https://hackathon-project-bangladesh-land-v.vercel.app/](https://hackathon-project-bangladesh-land-v.vercel.app/)

---

## 📌 Table of Contents

- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [Key Features](#-key-features)
- [How It Works](#-how-it-works)
- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [Available Scripts](#-available-scripts)
- [API Overview](#-api-overview)
- [Demo Data and Limitations](#-demo-data-and-limitations)
- [Future Roadmap](#-future-roadmap)
- [Contributing](#-contributing)
- [Security](#-security)
- [License](#-license)
- [Project Links](#-project-links)

---

## 🎯 The Problem

Land-related processes can be difficult to navigate when information is spread across different institutions, websites, offices, and record systems.

Citizens may struggle to:

- Identify the correct government institution for a particular land service.
- Find official service information and relevant application resources.
- Understand which land office is responsible for their area.
- Navigate historical land-record terminology, including CS, SA, RS, and BS records.
- Locate guidance for mutation, land development tax, deed registration, succession, and other land-related matters.
- Distinguish official information from unofficial websites or unreliable guidance.
- Understand where to begin before visiting a government office.

These challenges can increase confusion, unnecessary visits, delays, and dependence on intermediaries.

## 💡 Our Solution

BILSP proposes a **unified discovery and guidance platform for Bangladesh's land services**.

The platform aims to help citizens discover relevant services, explore institutions, find land-office information, understand land-related terminology, and access preliminary guidance through a single interface.

Our approach combines:

- **Service discovery:** Search and filter land-related services.
- **Institutional navigation:** Explore relevant government institutions.
- **Geographic exploration:** Navigate a demonstration map of Bangladesh.
- **Citizen-oriented tools:** Access prototype calculators, searches, and application workflows.
- **AI-assisted guidance:** Ask common land-related questions in a conversational interface.
- **Administrative workflows:** Demonstrate how service information and administrative tasks might be organized.

BILSP is currently a **hackathon prototype**, not an official government platform or a replacement for legally recognized land records and government services.

---

## ✨ Key Features

### 1. 🔎 Unified Land Service Directory

Discover land-related services through a central directory.

- Search for services using keywords.
- Explore service categories and institutions.
- Apply available filters to narrow results.
- Find relevant service information and external resources.
- Explore popular or featured services where available.
- Use Bangla and English interface options.

**Goal:** Reduce the effort required to find the appropriate starting point for a land-related task.

### 2. 🏛️ Government Institution Browser

Explore institutions and their relationship to land-related services.

The prototype includes institutional discovery concepts involving bodies and offices such as:

- Ministry and land administration institutions.
- Land Records and Survey-related offices.
- Land Reform and Land Appeal institutions.
- Divisional, district, and upazila-level land administration.

The information displayed should be treated as prototype content and verified against current official sources before practical or legal use.

### 3. 📍 Land Office Finder

Explore demonstration land-office information and narrow results using available geographic filters.

Potential uses include:

- Finding relevant offices by division or district.
- Understanding the administrative path for a land-related service.
- Discovering office information before planning a visit.

**Note:** The office dataset is demonstration data. Users should verify actual office addresses, jurisdiction, contact details, and operating hours through official channels.

### 4. 🗺️ Interactive Bangladesh Map

The interactive map demonstrates a geographic approach to land-service discovery.

Features include:

- Navigation through Bangladesh's eight divisions.
- Drill-down exploration of districts and upazilas.
- Demonstration cadastral and parcel-related data.
- Multiple map exploration modes.
- Geographic data structures that can support future land-information integrations.

The map and parcel information are illustrative. They are not an authoritative cadastral map or a substitute for certified survey records.

### 5. 📚 Historical Land-Record Exploration

BILSP explores how historical survey records might be presented in a more understandable way.

The prototype includes concepts associated with:

- **CS — Cadastral Survey**
- **SA — State Acquisition Survey**
- **RS — Revisional Survey**
- **BS — Bangladesh Survey**

The BhumiSutra concept focuses on exploring relationships between historical records, parcel identifiers, and possible land-record changes such as subdivision, merging, and renumbering.

The current demonstration does not establish a legally verified chain of title, prove ownership, or automatically determine whether fraud or encroachment has occurred. Those conclusions require authenticated records and appropriate legal or administrative review.

### 6. 🤖 AI Land Assistant — “ভূমি সহায়ক”

The AI assistant provides a conversational interface for preliminary land-related questions.

Its intended uses include:

- Explaining common land-related terminology.
- Providing general procedural guidance.
- Helping users identify the type of service they may need.
- Offering a more accessible way to explore land information.

Depending on configuration, the assistant can use Google's Gemini API or a built-in topic-based fallback.

**Important:** AI-generated responses may be incomplete, inaccurate, or outdated. They are not legal advice and should be verified against official sources.

### 7. 🧰 Citizen Tools and Workflows

The prototype includes several citizen-oriented tools:

| Tool | Purpose |
|---|---|
| Khas Land Application | Demonstrates a workflow for exploring government khas-land application information. |
| Farayej / Succession Calculator | Demonstrates preliminary inheritance-share calculations. |
| Vested Property Search | Demonstrates a search interface for vested-property information. |
| Amin Demarcation | Demonstrates a land-boundary or demarcation-related workflow. |
| Certified Deed / Order | Demonstrates a workflow for exploring certified deed or order requests. |
| Citizen Dashboard | Provides a central workspace for citizen-facing activities. |
| Saved Services and Notes | Helps organize selected services and personal notes within the prototype. |

These are demonstration workflows. They do not necessarily submit official applications, retrieve verified government records, issue certified documents, or produce legally binding determinations.

### 8. 🖥️ Administrative Portal

The administrative interface demonstrates how land-service information and administrative workflows could be organized.

Prototype workspaces include:

- **Records and Tax:** Concepts for record and land-tax-related administration.
- **Survey and Mapping:** Concepts for survey and geographic information workflows.
- **Deed Registration:** Concepts for deed-registration workflows.
- **Service Management:** Demonstration service creation and updates.
- **Audit Logs:** A prototype view of administrative activity records.

These interfaces are intended to demonstrate possible workflows. They are not connected to a verified production government administration system.

### 9. 🔗 Official Resource Discovery

BILSP includes features for discovering service-related websites and sources.

A URL-checking endpoint restricts checks to configured government-domain allowlists. This is intended to reduce exposure to unrelated or potentially misleading websites.

A successful URL check should not be interpreted as proof that a website is authoritative, that a particular service is available, or that the information on the page is correct.

### 10. 🌐 Bilingual Interface

BILSP supports Bangla and English interface experiences.

The goal is to make land-service information more approachable for citizens who prefer either language and to reduce barriers created by unfamiliar terminology.

---

## 🔄 How It Works

A typical citizen journey through the proposed platform is:

1. **Start with a problem** — Identify the land-related question or service needed.
2. **Search for a service** — Use the service directory, categories, and filters.
3. **Explore the responsible institution** — Review relevant institutional information.
4. **Find geographic information** — Explore the map or demonstration land-office directory.
5. **Review available guidance** — Use the AI assistant or relevant citizen tool for preliminary information.
6. **Verify official requirements** — Check the responsible authority's current rules, documents, fees, and procedures.
7. **Continue through official channels** — Complete formal applications or transactions through the appropriate authorized service.

The prototype helps demonstrate the discovery and guidance stages. It does not replace the final official application, verification, or decision-making process.

---

## 🛠️ Technology Stack

| Technology | Role |
|---|---|
| React 19 | Component-based user interface |
| TypeScript | Typed application development |
| Vite | Development server and frontend build tooling |
| Tailwind CSS 4 | Styling and responsive interface design |
| Node.js | JavaScript runtime |
| Express.js | Backend API routes and server functionality |
| Leaflet | Interactive mapping |
| Lucide React | Interface icons |
| Motion | Interface animation |
| Google Gemini API | Optional AI-assisted land guidance |
| Browser Local Storage | Selected client-side demonstration preferences and data |
| `tsx` | Running the TypeScript server |
| dotenv | Environment-variable configuration |

---

## 🏗️ Project Architecture

BILSP uses a React frontend with a TypeScript/Express backend.

```text
BILSP/
│
├── index.html
├── package.json
├── server.ts
├── vite.config.ts
├── .env.example
│
└── src/
    ├── App.tsx
    │
    ├── components/
    │   ├── ServiceDirectory.tsx
    │   ├── InstitutionBrowser.tsx
    │   ├── LandOfficeFinder.tsx
    │   ├── AdminPortal.tsx
    │   ├── BhumiSutraView.tsx
    │   ├── CitizenMyDesk.tsx
    │   └── ...
    │
    ├── contexts/
    │   ├── AuthContext.tsx
    │   └── LanguageContext.tsx
    │
    ├── services/
    │   └── apiClient.ts
    │
    ├── types/
    │   ├── authAndGeo.ts
    │   └── bilsp.ts
    │
    └── data/
        ├── adminDemoData.ts
        ├── cadastralDagsData.ts
        ├── districtVectorsData.ts
        ├── geoData.ts
        └── registryData.ts
```

*The tree highlights major project areas; some files and components have been omitted for readability.*

### Architecture overview

- **Frontend:** React components provide the service directory, citizen workspace, map, AI interface, and administrative screens.
- **API layer:** Express exposes endpoints for services, institutions, sources, offices, URL checks, and AI assistance.
- **Data layer:** Prototype datasets and in-memory server data support demonstration workflows.
- **AI layer:** The land assistant can use Gemini when configured and falls back to built-in topic-based guidance otherwise.
- **Client preferences:** Selected client-side features use browser storage where implemented.

**Current architectural limitation:** The project does not yet provide a production-grade persistent database or verified live integration with government land-record systems.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Install the following before starting:

- Node.js with npm
- Git
- A code editor such as Visual Studio Code

### 1. Clone the repository

Replace the placeholders with your actual GitHub repository URL and folder name.

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_PROJECT_DIRECTORY>
```

### 2. Install dependencies

```bash
npm install
```

If you use Bun, the repository also includes a `bun.lock` file.

### 3. Configure environment variables

Create a `.env` file in the project root. You can use `.env.example` as a reference.

```env
GEMINI_API_KEY=your_gemini_api_key
APP_URL=http://localhost:3000
PORT=3000
```

- `GEMINI_API_KEY` — Optional for the Gemini-powered assistant; the built-in fallback can be used when no key is configured.
- `APP_URL` — The application URL used by the server where applicable.
- `PORT` — The local server port; the server defaults to `3000`.

Never commit your real API key to GitHub.

### 4. Start the development server

```bash
npm run dev
```

Open the following URL in your browser:

**http://localhost:3000**

### 5. Build the project

```bash
npm run build
```

### 6. Preview the production frontend

```bash
npm run preview
```

For the server's production-serving path, configure `NODE_ENV=production` and start the application with the required production environment variables and built `dist` directory.

---

## ⚙️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server. |
| `npm start` | Starts the server using the configured runtime command. |
| `npm run build` | Builds the frontend for production. |
| `npm run preview` | Previews the built frontend. |
| `npm run lint` | Runs the TypeScript compiler in no-emit mode. |
| `npm run clean` | Removes generated build output and the configured server build file. |

---

## 🔌 API Overview

The Express backend provides the following main endpoints.

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Checks server health. |
| `GET` | `/api/categories` | Retrieves service categories. |
| `GET` | `/api/institutions` | Retrieves institutional information. |
| `GET` | `/api/websites` | Retrieves website-related information. |
| `GET` | `/api/sources` | Retrieves information sources. |
| `GET` | `/api/offices` | Retrieves office information, with supported geographic filters. |
| `GET` | `/api/audit-logs` | Retrieves demonstration audit-log data. |
| `GET` | `/api/services` | Searches and filters services. |
| `GET` | `/api/services/:id` | Retrieves a service by its identifier. |
| `POST` | `/api/check-url` | Checks URLs against configured government-domain restrictions. |
| `POST` | `/api/ai/land-assistant` | Provides land-assistant responses. |
| `POST` | `/api/admin/services` | Demonstrates administrative service creation. |

The service directory supports query and filter parameters such as `q`, `category`, `institution`, `type`, `status`, and `popular`, as implemented by the backend.

The API and data behavior should be checked against the current source code before using these endpoints in another application.

---

## ⚠️ Demo Data and Limitations

Transparency is important for any project related to land, property, and public services.

BILSP is a hackathon prototype, and the following limitations apply:

- **Not an official government website:** BILSP is an independent project concept and is not endorsed by the Government of Bangladesh.
- **No verified live land-record integration:** The current prototype does not establish a live, authenticated connection to official land databases.
- **Illustrative geographic data:** Map features, cadastral records, and parcel relationships may use sample or synthetic data.
- **Demonstration workflows:** Citizen tools and administrative screens do not necessarily submit real applications or perform official transactions.
- **Authentication limitations:** Authentication, demo accounts, and OTP-related flows must not be assumed to provide production-grade identity verification.
- **Data persistence limitations:** Some data is held in memory or browser storage; this is not equivalent to a secure, shared production database.
- **AI limitations:** AI responses may be incorrect or outdated and require verification.
- **No legal determination:** The application cannot independently prove land ownership, establish title, confirm inheritance rights, or determine fraud, forgery, or encroachment.

Before any real-world deployment, the project would require verified official data sources, authorization from relevant institutions, a secure and persistent database, robust authentication and access control, privacy safeguards, auditability, legal review, and independent security testing.

---

## 🗺️ Future Roadmap

The following are proposed improvements, not claims about functionality already delivered.

- [ ] Integrate verified official service information and source links.
- [ ] Add a persistent, secure database and reliable data-management workflows.
- [ ] Establish authorized integrations with relevant government systems.
- [ ] Improve historical survey-record relationships with verified provenance.
- [ ] Add source citations and update dates to service information.
- [ ] Improve accessibility, mobile usability, and Bangla-language clarity.
- [ ] Strengthen authentication, role-based permissions, and administrative audit trails.
- [ ] Add privacy-conscious document workflows and secure file handling.
- [ ] Validate inheritance calculations with applicable legal rules and expert review.
- [ ] Test performance, security, and usability with real users.
- [ ] Establish data governance and a process for correcting inaccurate information.

---

## 🤝 Contributing

Contributions and constructive feedback are welcome.

If you would like to contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the relevant functionality.
5. Submit a pull request with a clear description of the change.

Please avoid submitting real citizens' personal information, property documents, API keys, passwords, or other confidential data.

For features involving official land records, legal processes, or government integrations, include relevant sources and explain how the proposed change would be validated.

---

## 🔐 Security

If you discover a security issue, please avoid publicly sharing sensitive details or real citizen information. Report the issue privately to the project maintainers through an appropriate contact channel once one has been established.

Security priorities for a future production deployment include:

- Server-side secret management.
- Input validation and output encoding.
- Authentication and authorization.
- Rate limiting and abuse prevention.
- Protection against unsafe URL checks and server-side request forgery.
- Secure handling of personal and property-related data.
- Appropriate logging, retention, and access controls.

Do not use this prototype to store sensitive real-world property records or personal documents.

---

## 📄 License

The repository should have a clearly defined project-wide license before redistribution or reuse.

Some source files contain Apache-2.0 SPDX headers, but that alone does not establish that every file and dependency in the repository is licensed under Apache-2.0. Check the existing source notices and third-party dependency licenses, then add a root-level `LICENSE` file reflecting the project's intended licensing terms.

---

## 🔗 Project Links

| Resource | Link |
|---|---|
| 🌐 Live Demo | [Open BILSP](https://hackathon-project-bangladesh-land-v.vercel.app/) |
| 🏆 Event | Rights Hackathon 2026 |
| 🇧🇩 Project | Bangladesh Integrated Land Services Portal |
| 🧭 Focus | Land-service discovery, citizen guidance, and digital accessibility |

---

## 💚 Our Vision

We envision a Bangladesh where citizens can more easily understand land-related procedures, discover the right public services, and find reliable information without unnecessary confusion.

BILSP is an initial step toward that vision: **one accessible starting point for exploring Bangladesh's land services, built around citizen needs, transparency, and responsible digital innovation.**

<p align="center">
  <strong>🇧🇩 Built for a more accessible and transparent land-service experience.</strong>
  <br />
  <a href="https://hackathon-project-bangladesh-land-v.vercel.app/">Explore the Live Prototype →</a>
</p>
