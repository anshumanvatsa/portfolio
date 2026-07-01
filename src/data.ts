// Anshuman Mishra — Portfolio Data (verified from GitHub + actual resume)

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  tags: string[];
  fullTags: string[];
  description: string;
  challenges: string[];
  achievements: string[];
  architecture: string;
  liveUrl: string;
  githubUrl?: string;
  category: 'ml' | 'fullstack' | 'devops' | 'all';
  metrics: { label: string; value: string }[];
  year: string;
  status: 'live' | 'research' | 'open-source';
}

export interface TimelineItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  details: string[];
  type: 'experience' | 'education' | 'extra';
}

export interface SkillCategory {
  category: string;
  techs: string[];
  id: string;
  icon: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  badge: string;
}

export interface Achievement {
  id: string;
  title: string;
  body: string;
  icon: string;
  year: string;
}

// ─────────────────── PROJECTS (all from GitHub — anshumanvatsa) ───────────────────

export const PROJECTS: Project[] = [
  {
    id: 'carepredict',
    number: '01',
    title: 'CarePredictAI',
    subtitle: 'Clinical Risk Prediction System',
    shortDesc:
      'Full-stack health risk platform predicting 90-day patient deterioration across 4 conditions. v2 added XGBoost classifiers with risk stratification and explainability dashboard.',
    tags: ['React', 'FastAPI', 'PyTorch LSTM'],
    fullTags: ['React', 'FastAPI', 'PyTorch LSTM', 'XGBoost', 'SHAP', 'Python', 'Tailwind CSS'],
    description:
      'CarePredictAI is a full-stack health risk platform predicting 90-day patient deterioration across 4 clinical conditions using PyTorch LSTM models. A FastAPI backend serves the inference layer with a React dashboard for clinical visualization. Version 2 added XGBoost classifiers with SHAP-based risk stratification and a full explainability dashboard so clinicians can trace which features drove the prediction.',
    challenges: [
      'Handling clinical time-series data with irregular sampling intervals and significant missing value rates.',
      'Building a model explainability layer that translates SHAP outputs into actionable clinical summaries.',
      'Coordinating v2 XGBoost pipeline alongside the existing LSTM model without breaking the live inference API.',
    ],
    achievements: [
      'PyTorch LSTM pipeline for patient deterioration prediction across 4 clinical conditions.',
      'v2 XGBoost classifiers with full SHAP explainability and risk stratification dashboard.',
      'Deployed live at care-predict-ai.vercel.app.',
    ],
    architecture: 'React Dashboard → FastAPI → PyTorch LSTM / XGBoost → PostgreSQL',
    liveUrl: 'https://care-predict-ai.vercel.app',
    githubUrl: 'https://github.com/anshumanvatsa/care-predict-ai-v1',
    category: 'ml',
    metrics: [
      { label: 'Conditions', value: '4' },
      { label: 'Models', value: '2' },
      { label: 'Live', value: 'Vercel' },
    ],
    year: '2024',
    status: 'live',
  },
  {
    id: 'cloudpilot',
    number: '02',
    title: 'CloudPilot',
    subtitle: 'DevOps Monitoring Dashboard',
    shortDesc:
      'DevOps monitoring dashboard replicating Vercel/Render functionality — JWT auth, CSRF protection, real-time infrastructure tracking, one-command Docker deployment.',
    tags: ['TypeScript', 'Docker', 'AWS EC2'],
    fullTags: ['TypeScript', 'Python', 'Docker', 'AWS EC2', 'WebSockets', 'JWT', 'CSRF Protection', 'CI/CD'],
    description:
      'CloudPilot is a DevOps monitoring dashboard that replicates Vercel/Render-style cloud deployment workflows. It provides real-time infrastructure tracking via WebSockets, JWT authentication, CSRF protection, and one-command Docker deployment. Developers can monitor server health, view live metrics, and manage services from a unified UI — deployed on AWS EC2.',
    challenges: [
      'Streaming real-time infrastructure metrics from AWS EC2 instances to browsers without high polling overhead.',
      'Implementing JWT + CSRF protection on a stateless REST API without degrading developer UX.',
      'Making Docker deployment configuration trivial enough to run with a single terminal command.',
    ],
    achievements: [
      'Real-time infrastructure tracking via WebSockets with JWT auth and CSRF protection.',
      'One-command Docker deployment pipeline for rapid service spin-up.',
      'Live at cloudpilot.13.60.57.168.sslip.io on AWS EC2.',
    ],
    architecture: 'React Dashboard → WebSocket Server → Docker → AWS EC2 → Live Metrics',
    liveUrl: 'http://cloudpilot.13.60.57.168.sslip.io',
    githubUrl: 'https://github.com/anshumanvatsa/cloudpilot-devops-platform',
    category: 'devops',
    metrics: [
      { label: 'Auth', value: 'JWT' },
      { label: 'Deploy', value: '1-cmd' },
      { label: 'Host', value: 'AWS EC2' },
    ],
    year: '2024',
    status: 'live',
  },
  {
    id: 'varuna',
    number: '03',
    title: 'VARUNA',
    subtitle: 'Live Ocean Hazard Reporting Platform',
    shortDesc:
      'Co-built live ocean hazard reporting platform with interactive Leaflet.js map. Owned the analytics dashboard and admin panel with Zod + React Hook Form validation.',
    tags: ['Next.js 14', 'Supabase', 'Leaflet.js'],
    fullTags: ['Next.js 14', 'Leaflet.js', 'Supabase', 'PostgreSQL', 'Zod', 'React Hook Form', 'Tailwind CSS'],
    description:
      'VARUNA is a live ocean hazard reporting platform where users submit and view coastal hazard events on an interactive Leaflet.js map with real-time updates. I co-built this project and personally owned the analytics dashboard and admin panel, implementing Zod schema validation and React Hook Form for type-safe data entry. Supabase provides the real-time database and authentication backend.',
    challenges: [
      'Building type-safe form validation using Zod schemas that sync with Supabase table constraints.',
      'Rendering a Leaflet.js map with real-time hazard markers that update without a full page reload.',
      'Designing a role-based admin panel for hazard report moderation.',
    ],
    achievements: [
      'Owned analytics dashboard and admin panel with Zod + React Hook Form validation.',
      'Supabase real-time subscriptions for live hazard event updates on the map.',
      'Live at varuna001.vercel.app.',
    ],
    architecture: 'Next.js 14 → Leaflet.js Map → Supabase Real-time DB → Admin Panel',
    liveUrl: 'https://varuna001.vercel.app',
    githubUrl: 'https://github.com/anshumanvatsa/Varuna',
    category: 'fullstack',
    metrics: [
      { label: 'Stack', value: 'Next 14' },
      { label: 'DB', value: 'Supabase' },
      { label: 'Live', value: 'Vercel' },
    ],
    year: '2024',
    status: 'live',
  },
  {
    id: 'autostream',
    number: '04',
    title: 'AutoStream AI Agent',
    subtitle: 'Conversational Lead-Gen AI Agent',
    shortDesc:
      'Full-stack conversational AI agent converting user chats into qualified leads using intent detection, RAG-based knowledge retrieval, and controlled lead capture workflows.',
    tags: ['FastAPI', 'LangGraph', 'React'],
    fullTags: ['FastAPI', 'LangGraph', 'Python', 'FAISS', 'React', 'RAG', 'LLMs', 'Groq'],
    description:
      'AutoStream is a full-stack conversational AI agent that converts user chats into qualified leads using intent detection, RAG-based knowledge retrieval, and controlled lead capture workflows. Built with FastAPI, LangGraph, and React for a production-style SaaS experience. The agent maintains multi-turn conversation state, retrieves relevant product knowledge from a FAISS vector store, and triggers lead capture at the right moment in the conversation flow.',
    challenges: [
      'Designing a LangGraph state machine that gracefully handles diverse user intents without falling into loops.',
      'Building a RAG pipeline with FAISS that retrieves relevant domain knowledge with low latency per turn.',
      'Triggering lead capture at the optimal conversational moment without feeling intrusive.',
    ],
    achievements: [
      'Multi-turn conversational AI with LangGraph state management and intent detection.',
      'RAG knowledge retrieval via FAISS for contextually accurate product responses.',
      'Full-stack SaaS-style architecture: FastAPI backend + React frontend.',
    ],
    architecture: 'React Chat UI → FastAPI → LangGraph Agent → FAISS RAG → Lead Capture',
    liveUrl: 'https://github.com/anshumanvatsa/AutoStream-AI-Agent',
    githubUrl: 'https://github.com/anshumanvatsa/AutoStream-AI-Agent',
    category: 'ml',
    metrics: [
      { label: 'Agent', value: 'LangGraph' },
      { label: 'RAG', value: 'FAISS' },
      { label: 'Type', value: 'AI Agent' },
    ],
    year: '2025',
    status: 'open-source',
  },
  {
    id: 'roadpavement',
    number: '05',
    title: 'PavePro Vision',
    subtitle: 'AI Road Damage Detection & Forecasting',
    shortDesc:
      'YOLOv8-powered road damage detection platform with hybrid ML models (weather + traffic data) to forecast future pavement degradation. Interactive React digital twin dashboard.',
    tags: ['YOLOv8', 'FastAPI', 'React'],
    fullTags: ['YOLOv8', 'Python', 'TypeScript', 'FastAPI', 'React', 'Computer Vision', 'Hybrid ML'],
    description:
      'PavePro Vision is an AI-driven predictive maintenance platform that uses YOLOv8 for real-time road damage detection from images, combined with hybrid ML models incorporating weather and traffic data to forecast future pavement degradation. The system features an interactive React digital twin dashboard powered by a FastAPI backend, giving road authorities actionable maintenance scheduling insights.',
    challenges: [
      'Fine-tuning YOLOv8 on domain-specific road damage imagery for high precision across damage types.',
      'Fusing heterogeneous data sources (image detections, weather, traffic) into a single degradation forecast model.',
      'Building a React digital twin that visually represents road health across a geographic map.',
    ],
    achievements: [
      'YOLOv8 computer vision pipeline for real-time road damage classification.',
      'Hybrid ML forecasting model integrating weather and traffic data for degradation prediction.',
      'Interactive digital twin dashboard for maintenance scheduling.',
    ],
    architecture: 'React Digital Twin → FastAPI → YOLOv8 Detection → Hybrid ML Forecaster',
    liveUrl: 'https://github.com/anshumanvatsa/Road-Pavement-Damage-Prediction',
    githubUrl: 'https://github.com/anshumanvatsa/Road-Pavement-Damage-Prediction',
    category: 'ml',
    metrics: [
      { label: 'Vision', value: 'YOLOv8' },
      { label: 'Stack', value: 'TypeScript' },
      { label: 'Type', value: 'CV + ML' },
    ],
    year: '2025',
    status: 'open-source',
  },
  {
    id: 'construction',
    number: '06',
    title: 'Construction Digital Twin',
    subtitle: 'Real-time IoT Site Monitoring Platform',
    shortDesc:
      'Real-time construction site digital twin using FastAPI, WebSockets, and React to simulate worker movement, safety monitoring, and risk analytics in an IoT-based environment.',
    tags: ['React', 'FastAPI', 'WebSockets'],
    fullTags: ['React', 'FastAPI', 'WebSockets', 'TypeScript', 'Python', 'IoT', 'Real-time Analytics'],
    description:
      'A real-time construction site digital twin that simulates worker movement, safety monitoring zones, and risk analytics in an IoT-based environment. FastAPI powers the backend with WebSocket streams delivering live sensor events to a React frontend dashboard. Safety incidents are detected in real-time and risk scores are updated dynamically across the site map.',
    challenges: [
      'Streaming live IoT sensor events at high frequency via WebSockets without performance degradation.',
      'Building a spatial site map UI that updates worker positions and safety zones in real-time.',
      'Designing a risk scoring model that processes incoming sensor events and updates dynamically.',
    ],
    achievements: [
      'Real-time IoT event streaming via WebSockets to a React digital twin dashboard.',
      'Worker movement simulation and safety zone monitoring across the site map.',
      'Dynamic risk analytics and alerting system for site safety events.',
    ],
    architecture: 'IoT Sensors → FastAPI WebSocket → React Digital Twin Dashboard → Risk Analytics',
    liveUrl: 'https://github.com/anshumanvatsa/construction-digital-twin',
    githubUrl: 'https://github.com/anshumanvatsa/construction-digital-twin',
    category: 'fullstack',
    metrics: [
      { label: 'Stack', value: 'TypeScript' },
      { label: 'Stream', value: 'WebSocket' },
      { label: 'Type', value: 'IoT Twin' },
    ],
    year: '2025',
    status: 'open-source',
  },
  {
    id: 'selective-encryption',
    number: '07',
    title: 'Selective Encryption System',
    subtitle: 'AES-256-GCM Security Platform',
    shortDesc:
      'Production-ready selective encryption system with AES-256-GCM, JWT authentication, RBAC, file encryption, audit logging, and full-stack architecture — FastAPI + React, Docker, CI/CD.',
    tags: ['AES-256-GCM', 'FastAPI', 'React'],
    fullTags: ['AES-256-GCM', 'JWT', 'RBAC', 'FastAPI', 'React', 'Docker', 'CI/CD', 'Python', 'Audit Logging'],
    description:
      'A production-ready selective encryption system implementing AES-256-GCM authenticated encryption, JWT-based authentication, role-based access control (RBAC), file-level encryption, and comprehensive audit logging. The full-stack architecture uses FastAPI for the secure backend and React for the management UI, containerized with Docker and deployed via a CI/CD pipeline with observability tooling.',
    challenges: [
      'Implementing AES-256-GCM correctly with authenticated encryption and proper IV/nonce management.',
      'Designing a RBAC system that enforces granular file-access permissions across user roles.',
      'Building a tamper-evident audit log that records all encryption/decryption operations.',
    ],
    achievements: [
      'AES-256-GCM authenticated encryption with JWT + RBAC access control.',
      'File encryption engine with comprehensive audit logging.',
      'Dockerized full-stack deployment with CI/CD pipeline and observability.',
    ],
    architecture: 'React UI → FastAPI → AES-256-GCM Engine → RBAC → Audit Log → Docker',
    liveUrl: 'https://github.com/anshumanvatsa/Selective-Encryption',
    githubUrl: 'https://github.com/anshumanvatsa/Selective-Encryption',
    category: 'fullstack',
    metrics: [
      { label: 'Cipher', value: 'AES-256' },
      { label: 'Auth', value: 'JWT+RBAC' },
      { label: 'Type', value: 'Security' },
    ],
    year: '2025',
    status: 'open-source',
  },
  {
    id: 'heartdisease',
    number: '08',
    title: 'Heart Disease Predictor',
    subtitle: 'Multi-Model ML Classification Pipeline',
    shortDesc:
      'ML pipeline comparing Logistic Regression, Random Forest, XGBoost & MLP for heart disease prediction using the UCI Cleveland dataset, with SHAP explainability.',
    tags: ['Python', 'XGBoost', 'SHAP'],
    fullTags: ['Python', 'Scikit-learn', 'XGBoost', 'MLP', 'SHAP', 'Pandas', 'Matplotlib', 'UCI Dataset'],
    description:
      'A comprehensive ML pipeline that benchmarks Logistic Regression, Random Forest, XGBoost, and MLP neural network classifiers for heart disease prediction using the UCI Cleveland Heart Disease dataset. The project includes thorough EDA, feature engineering, hyperparameter tuning, and SHAP explainability analysis to identify the most predictive clinical features, with publication-ready output charts.',
    challenges: [
      'Conducting rigorous model comparison with consistent cross-validation methodology across all classifiers.',
      'Generating SHAP force plots and summary plots that provide clinically interpretable feature importance.',
      'Handling class imbalance in the UCI dataset without data leakage during preprocessing.',
    ],
    achievements: [
      'Multi-model benchmarking: Logistic Regression, Random Forest, XGBoost, MLP.',
      'SHAP explainability analysis identifying key clinical predictors.',
      'Publication-ready evaluation outputs and visualizations.',
    ],
    architecture: 'UCI Dataset → EDA + Feature Engineering → Model Pipeline → SHAP Analysis → Reports',
    liveUrl: 'https://github.com/anshumanvatsa/Heart-Disease-Predictor',
    githubUrl: 'https://github.com/anshumanvatsa/Heart-Disease-Predictor',
    category: 'ml',
    metrics: [
      { label: 'Models', value: '4' },
      { label: 'XAI', value: 'SHAP' },
      { label: 'Dataset', value: 'UCI' },
    ],
    year: '2024',
    status: 'open-source',
  },
  {
    id: 'documind',
    number: '09',
    title: 'DocuMind RAG',
    subtitle: 'Document Q&A Chatbot with RAG',
    shortDesc:
      'RAG-based document intelligence chatbot — upload PDFs and get context-aware AI answers using LangChain, vector stores, and LLM integration.',
    tags: ['LangChain', 'Python', 'RAG'],
    fullTags: ['Python', 'LangChain', 'ChromaDB', 'FAISS', 'LLMs', 'PDF Parsing', 'FastAPI'],
    description:
      'DocuMind is a RAG-based document Q&A system that lets users upload PDFs and receive context-aware AI-generated answers. Documents are parsed, chunked, and embedded into a vector store (ChromaDB/FAISS) using LangChain. An LLM then retrieves the most relevant chunks and generates accurate, grounded responses — eliminating hallucinations by anchoring answers to source documents.',
    challenges: [
      'Designing an optimal chunking strategy that preserves semantic context across document sections.',
      'Tuning retrieval k-nearest neighbors to balance precision and recall in the RAG pipeline.',
      'Handling diverse PDF structures (tables, headers, multi-column layouts) during parsing.',
    ],
    achievements: [
      'End-to-end RAG pipeline: PDF parsing → embedding → vector retrieval → LLM generation.',
      'Context-grounded answers that reduce hallucination by anchoring to source documents.',
      'LangChain integration supporting multiple LLM backends.',
    ],
    architecture: 'PDF Upload → LangChain Parser → ChromaDB/FAISS Embeddings → LLM → Grounded Answer',
    liveUrl: 'https://github.com/anshumanvatsa/Documind---rag',
    githubUrl: 'https://github.com/anshumanvatsa/Documind---rag',
    category: 'ml',
    metrics: [
      { label: 'Type', value: 'RAG' },
      { label: 'LLM', value: 'LangChain' },
      { label: 'Store', value: 'ChromaDB' },
    ],
    year: '2025',
    status: 'open-source',
  },
  {
    id: 'safety-vision',
    number: '10',
    title: 'Safety Sparkle Vision',
    subtitle: 'Workplace PPE Safety Detection',
    shortDesc:
      'AI-powered workplace safety monitoring system using computer vision to detect PPE compliance, hard hats, and safety violations in real-time from live video feeds.',
    tags: ['YOLOv8', 'TypeScript', 'Computer Vision'],
    fullTags: ['YOLOv8', 'TypeScript', 'Python', 'OpenCV', 'FastAPI', 'React', 'Real-time Detection'],
    description:
      'Safety Sparkle Vision is a workplace safety monitoring platform using computer vision to detect PPE compliance — hard hats, vests, and safety gear — from live or recorded video feeds. The system flags violations in real-time and generates safety compliance reports. Built with a TypeScript/React frontend and a Python/FastAPI backend running YOLOv8 inference.',
    challenges: [
      'Training/fine-tuning YOLOv8 on PPE-specific datasets for accurate helmet and vest detection.',
      'Processing video frames in real-time without falling behind the live feed.',
      'Designing a violation detection and alerting workflow that minimizes false positives.',
    ],
    achievements: [
      'Real-time PPE detection (hard hats, vests) from video feeds using YOLOv8.',
      'TypeScript + React frontend with live violation overlay on video stream.',
      'Safety compliance reporting and violation logging system.',
    ],
    architecture: 'Video Feed → YOLOv8 Inference → FastAPI → React Dashboard → Compliance Reports',
    liveUrl: 'https://github.com/anshumanvatsa/safety-sparkle-vision',
    githubUrl: 'https://github.com/anshumanvatsa/safety-sparkle-vision',
    category: 'ml',
    metrics: [
      { label: 'Vision', value: 'YOLOv8' },
      { label: 'Stack', value: 'TypeScript' },
      { label: 'Type', value: 'Safety AI' },
    ],
    year: '2025',
    status: 'open-source',
  },
];

// ─────────────────────── TIMELINE (verified dates) ───────────────────────

export const TIMELINE: TimelineItem[] = [
  {
    id: 'exp1',
    period: 'May 2026 — Present',
    role: 'ML Intern',
    organization: 'Deuglo',
    details: [
      'Built a post-performance prediction model for DG-Social via data enrichment, labeling, and trend-based forecasting.',
      'Shipped AI content tools (captions, hashtags, cross-platform adaptation) across 6 new backend endpoints.',
    ],
    type: 'experience',
  },
  {
    id: 'exp2',
    period: 'Mar 2024 — Mar 2026',
    role: 'Propulsion Engineer',
    organization: 'Special Team-Ignition',
    details: [
      'Validated CFD models against experimental data for nozzle flow and combustion accuracy.',
      'Used OpenRocket/OpenMotor for motor design, trajectory, and thrust optimization.',
    ],
    type: 'experience',
  },
  {
    id: 'exp3',
    period: 'Jun 2025 — Jun 2026',
    role: 'General Secretary',
    organization: 'Collegiate Cultural Club · VIT Chennai',
    details: [
      'Planned and executed 15+ large-scale student events end-to-end.',
      'Managed cross-functional teams, budgets, and sponsorship coordination.',
    ],
    type: 'extra',
  },
  {
    id: 'edu1',
    period: 'Jul 2023 — Present',
    role: 'B.Tech Computer Science & Engineering',
    organization: 'VIT Chennai · CGPA 8.83 / 10',
    details: [
      'Core coursework: Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks, OOP.',
      'Additional focus: AI/ML tools and frameworks pursued through personal projects and certifications.',
    ],
    type: 'education',
  },
];

// ─────────────────────── SKILLS (from actual resume) ───────────────────────

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'ml',
    category: 'AI / ML',
    techs: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'Bi-LSTM', 'Transformers', 'LLMs', 'RAG', 'Prompt Engineering', 'YOLOv8', 'LangChain', 'LangGraph'],
    icon: '🧠',
  },
  {
    id: 'fullstack',
    category: 'Full-Stack',
    techs: ['React.js', 'Next.js 14', 'Node.js', 'FastAPI', 'WebSockets', 'REST APIs', 'Tailwind CSS'],
    icon: '🌐',
  },
  {
    id: 'devops',
    category: 'DevOps & Cloud',
    techs: ['Docker', 'Kubernetes', 'Jenkins', 'Git', 'CI/CD', 'AWS EC2', 'Vercel', 'GitHub Actions'],
    icon: '☁️',
  },
  {
    id: 'databases',
    category: 'Databases',
    techs: ['PostgreSQL', 'Redis', 'Supabase', 'ChromaDB', 'FAISS'],
    icon: '🗄️',
  },
  {
    id: 'languages',
    category: 'Languages',
    techs: ['Python', 'C++', 'Java', 'JavaScript', 'TypeScript'],
    icon: '💻',
  },
  {
    id: 'other',
    category: 'Security & Simulation',
    techs: ['AES-256-GCM', 'JWT', 'RBAC', 'CSRF Protection', 'ANSYS', 'OpenRocket', 'OpenMotor', 'CFD Analysis'],
    icon: '🔐',
  },
];

// ─────────────────────── CERTIFICATIONS (verified) ───────────────────────

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'c1',
    name: 'IBM DevOps Certifications',
    issuer: 'IBM — Fundamentals, Agile & Design Thinking, DevOps Training',
    date: '2025',
    badge: '🏅',
  },
  {
    id: 'c2',
    name: 'Machine Learning I',
    issuer: 'Columbia+ — Regression, classification, model evaluation',
    date: '2025',
    badge: '🧠',
  },
];

// ─────────────────────── ACHIEVEMENTS (verified) ───────────────────────

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a1',
    title: 'IBM DevOps Certified',
    body: 'Completed IBM DevOps Fundamentals, Agile & Design Thinking, and DevOps Training certifications.',
    icon: '🏅',
    year: '2025',
  },
  {
    id: 'a2',
    title: 'CGPA 8.83 / 10',
    body: 'Consistent academic performance at VIT Chennai in Computer Science & Engineering.',
    icon: '🎓',
    year: '2023–Present',
  },
  {
    id: 'a3',
    title: '20+ GitHub Projects',
    body: 'Built and published 20+ projects on GitHub from 2023 to present across ML, full-stack, DevOps, and security.',
    icon: '🚀',
    year: '2023–Present',
  },
  {
    id: 'a4',
    title: 'General Secretary',
    body: 'Led and executed 15+ large-scale student events as General Secretary of the Collegiate Cultural Club.',
    icon: '🎭',
    year: 'Jun 2025–Jun 2026',
  },
];
