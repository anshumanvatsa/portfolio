// Anshuman — Portfolio Data (verified from GitHub + actual resume)

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
  previewImage?: string;
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
    id: 'multi-platform-engagement',    title: 'Multi-Platform Social Media Predictor',
    subtitle: 'LightGBM Engagement Forecasting',
    shortDesc:
      'Production-grade ML system classifying social media posts across five platforms. Trained on 800K+ real posts with full SHAP explainability.',
    tags: ['LightGBM', 'Python', 'FastAPI'],
    fullTags: ['LightGBM', 'Python', 'FastAPI', 'SHAP', 'Pandas', 'Machine Learning', 'Data Science'],
    description:
      'A production-grade machine learning system that classifies social media posts as HIGH or LOW engagement across five platforms (Facebook, TikTok, Twitter, YouTube). Trained on 800,953 real posts, this system uses per-platform binarisation and compares 5 models with 5-fold stratified cross-validation. The winning LightGBM model achieves an F1 score of 0.87 and AUC of 0.94 on a 160K held-out test set, with SHAP TreeExplainer for full explainability.\n\n> Note: This is the theoretical research model unrestricted by data-leakage. We dropped post-publication columns to prevent leakage and built a highly-constrained live production web app (F1=0.63) called "Social Media Predictor" (also linked below).',
    challenges: [
      'Handling severe class imbalance and differing engagement baselines across 5 separate social platforms.',
      'Processing an 800K row dataset while maintaining strict 5-fold stratified cross-validation without data leakage.',
      'Deploying the model via a FastAPI microservice with SHAP TreeExplainer for real-time inference.',
    ],
    achievements: [
      'LightGBM model achieving F1=0.8701 and AUC=0.9444 on a 160K held-out test set.',
      'Full SHAP explainability with 7 publication-ready figures.',
      'Per-platform thresholding ensuring "High" engagement means high for that specific platform.',
    ],
    architecture: '800K Dataset → Feature Engineering → LightGBM Model → SHAP Explainer → FastAPI',
    liveUrl: 'https://engageiq-sk54.onrender.com/',
    githubUrl: 'https://github.com/anshumanvatsa/multi-platform-engagement-predictor',
    previewImage: '/multi-platform-preview.png',
    category: 'ml',
    metrics: [
      { label: 'F1 Score', value: '0.87' },
      { label: 'AUC-ROC', value: '0.94' },
      { label: 'Dataset', value: '800K' },
    ],
    year: '2025',
    status: 'open-source',
  },
  {
    id: 'roadpavement',    title: 'PavePro Vision',
    subtitle: 'YOLOv8 Road Damage Detection & Forecasting',
    shortDesc:
      'YOLOv8 trained on RDD2022 dataset (mAP@50: 55%, Precision: 0.608, 20 epochs). Hybrid XGBoost model fusing weather + traffic + vision features for pavement degradation forecasting. React digital twin dashboard.',
    tags: ['YOLOv8', 'XGBoost', 'FastAPI'],
    fullTags: ['YOLOv8', 'XGBoost', 'Python', 'TypeScript', 'FastAPI', 'React', 'RDD2022', 'Computer Vision'],
    description:
      'PavePro Vision is an AI-driven road maintenance platform built on real training data. The YOLOv8 detection model was trained for 20 epochs on the RDD2022 road damage dataset, achieving mAP@50 of 55% (up from 15.6% at epoch 1) with precision 0.608 and recall 0.511 — still trending upward at cutoff. A hybrid XGBoost regressor fuses weather, traffic, and vision-derived severity features to forecast future pavement degradation. The system includes a React digital twin dashboard with a FastAPI backend for maintenance scheduling.',
    challenges: [
      'Training YOLOv8 on the RDD2022 multi-country road damage dataset and managing class imbalance across damage types (D00, D10, D20).',
      'Fusing heterogeneous inputs (YOLOv8 detections, weather API, traffic volume) into a single XGBoost regression pipeline.',
      'Model was cut short at 20 epochs (still improving) — a longer training run would push mAP@50 toward ~65–70%.',
    ],
    achievements: [
      'YOLOv8 on RDD2022: mAP@50 = 55.0%, Precision = 0.608, Recall = 0.511 (20 epochs, real training run).',
      'CNN severity classifier across 5 damage classes: 55% accuracy (vs 20% random baseline).',
      'Hybrid XGBoost forecaster outperforms weather-only and severity-only baselines.',
    ],
    architecture: 'React Digital Twin → FastAPI → YOLOv8 Detection → XGBoost Hybrid Forecaster',
    liveUrl: 'https://predictive-pavement.vercel.app',
    githubUrl: 'https://github.com/anshumanvatsa/Road-Pavement-Damage-Prediction',
    previewImage: '/pave-pro-preview.png',
    category: 'ml',
    metrics: [
      { label: 'mAP@50', value: '55%' },
      { label: 'Precision', value: '0.608' },
      { label: 'Dataset', value: 'RDD2022' },
    ],
    year: '2025',
    status: 'open-source',
  },
  {
    id: 'carepredict',    title: 'CarePredictAI',
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
    previewImage: '/carepredict-preview.png',
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
    id: 'varuna',    title: 'VARUNA',
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
    previewImage: '/varuna-preview.png',
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
    id: 'bharat-truth-lens',    title: 'Bharat Truth Lens',
    subtitle: 'AI-Powered Fake News Detection',
    shortDesc:
      'A full-stack platform combining AI fact-checking with real civic engagement, featuring virtual elections and age-wise voting statistics.',
    tags: ['React', 'FastAPI', 'MongoDB'],
    fullTags: ['React', 'TypeScript', 'FastAPI', 'Python', 'MongoDB', 'AI', 'Civic Tech', 'Fact Checking'],
    description:
      'Pulse of India - Bharat Truth Lens is a full-stack civic technology platform combining AI-powered fake news detection with interactive civic engagement. Users can analyze news articles with AI fact-checking to detect misinformation and participate in virtual PM elections with dynamic, age-wise voting statistics.',
    challenges: [
      'Integrating a robust AI fact-checking pipeline that accurately flags misinformation in real-time.',
      'Building a secure and scalable voting system for virtual elections using MongoDB.',
      'Designing a seamless full-stack architecture connecting a React/TypeScript frontend with a FastAPI backend.',
    ],
    achievements: [
      'Deployed live AI fake news detection engine.',
      'Interactive virtual election system with real-time demographic analytics.',
      'Modern, responsive UI built with React and Tailwind CSS.',
    ],
    architecture: 'React UI → FastAPI Backend → AI Fact-Checker → MongoDB',
    liveUrl: 'https://bharat-truth-lens.vercel.app',
    githubUrl: 'https://github.com/anshumanvatsa/bharat-truth-lens',
    previewImage: '/bharat-truth-lens-preview.png',
    category: 'fullstack',
    metrics: [
      { label: 'Stack', value: 'FastAPI' },
      { label: 'DB', value: 'MongoDB' },
      { label: 'Live', value: 'Vercel' },
    ],
    year: '2025',
    status: 'live',
  },
  {
    id: 'cloudpilot',    title: 'CloudPilot',
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
    previewImage: '/cloudpilot-preview.png',
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
    id: 'pillsafe-ai',    title: 'PillSafe-AI',
    subtitle: 'Medicine Safety & Adverse Reaction AI',
    shortDesc:
      'A comprehensive medicine safety checker with a modern React frontend and a robust Flask backend. Uses XGBoost ML models to predict adverse reactions and provide clinical safety insights.',
    tags: ['React', 'Flask', 'XGBoost'],
    fullTags: ['React', 'Flask', 'XGBoost', 'Python', 'TypeScript', 'Machine Learning', 'Healthcare AI'],
    description:
      'PillSafe-AI is a comprehensive medicine safety platform designed to analyze drug interactions and predict potential adverse reactions. Built with a modern React UI and a Flask backend, the system leverages an XGBoost machine learning model trained on extensive clinical data to deliver high-accuracy safety insights. It aims to empower healthcare professionals and users with transparent, data-driven medication safety checks.',
    challenges: [
      'Training the XGBoost model on complex, high-dimensional pharmaceutical datasets.',
      'Translating raw ML probability scores into understandable clinical insights for the UI.',
      'Building a seamless bridge between a Python/Flask inference engine and a React frontend.',
    ],
    achievements: [
      'Successfully deployed an XGBoost ML model with high confidence scores for interaction predictions.',
      'Developed a highly polished, futuristic glassmorphism UI for displaying clinical data.',
      'Achieved low-latency inference for real-time medication safety checks.',
    ],
    architecture: 'React Frontend → Flask Backend API → XGBoost ML Model → Clinical Insights',
    liveUrl: 'https://pillsafe-ai.vercel.app',
    githubUrl: 'https://github.com/anshumanvatsa/PillSafe-AI',
    previewImage: '/pillsafe-preview.png',
    category: 'ml',
    metrics: [
      { label: 'Model', value: 'XGBoost' },
      { label: 'Backend', value: 'Flask' },
      { label: 'Type', value: 'Health AI' },
    ],
    year: '2024',
    status: 'live',
  },
  {
    id: 'construction',    title: 'Construction Digital Twin',
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
    liveUrl: 'http://13.60.57.168:4005',
    githubUrl: 'https://github.com/anshumanvatsa/construction-digital-twin',
    previewImage: '/construction-preview.png',
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
    id: 'social-media-pre',    title: 'Social Media Predictor',
    subtitle: 'Pre-Publication Engagement Analytics',
    shortDesc:
      'Engagement predictor for social media posts trained on 800K+ real posts, explaining predictions in plain English using SHAP.',
    tags: ['Python', 'Random Forest', 'SHAP'],
    fullTags: ['Python', 'Random Forest', 'SHAP', 'Machine Learning', 'Analytics'],
    description:
      'A pre-publication engagement predictor designed for content managers. Before hitting publish, users receive a HIGH or LOW engagement prediction with a confidence score. The system is trained on 800K+ posts and accepts only features known before posting (platform, post type, time, hashtags, media). It uses SHAP to provide 3 plain-English reasons for the prediction and 1 actionable recommendation.',
    challenges: [
      'Training a Random Forest model on 800,000 rows of social media data.',
      'Translating complex SHAP values into actionable, plain-English recommendations for non-technical content managers.',
      'Restricting the feature set strictly to data available before a post is published.',
    ],
    achievements: [
      'Achieved F1=0.63 and AUC-ROC=0.64 using strictly pre-publication features.',
      'Generated SHAP-driven plain-English explanations for model predictions.',
      'Built a practical tool directly applicable to social media content strategy workflows.',
    ],
    architecture: '800K Dataset → Random Forest Model → SHAP Explainer → Plain-English Output',
    liveUrl: 'https://engageiq-sk54.onrender.com/',
    githubUrl: 'https://github.com/anshumanvatsa/Social-Media-engagement-prediction',
    previewImage: '/social-media-pre-preview.png',
    category: 'ml',
    metrics: [
      { label: 'F1 Score', value: '0.63' },
      { label: 'AUC-ROC', value: '0.64' },
      { label: 'XAI', value: 'SHAP' },
    ],
    year: '2025',
    status: 'open-source',
  },
  {
    id: 'autostream',    title: 'AutoStream AI Agent',
    subtitle: 'Conversational Lead-Gen AI Agent',
    shortDesc:
      'Full-stack conversational AI agent converting user chats into qualified leads using intent detection, RAG-based knowledge retrieval, and controlled lead capture workflows.',
    tags: ['FastAPI', 'LangGraph', 'React'],
    fullTags: ['FastAPI', 'LangGraph', 'Python', 'React', 'RAG', 'LLMs', 'Groq'],
    description:
      'AutoStream is a full-stack conversational AI agent that converts user chats into qualified leads using intent detection, RAG-based knowledge retrieval, and controlled lead capture workflows. Built with FastAPI, LangGraph, and React for a production-style SaaS experience. The agent maintains multi-turn conversation state, retrieves relevant product knowledge from a vector store, and triggers lead capture at the right moment in the conversation flow.',
    challenges: [
      'Designing a LangGraph state machine that gracefully handles diverse user intents without falling into loops.',
      'Building a RAG pipeline that retrieves relevant domain knowledge with low latency per turn.',
      'Triggering lead capture at the optimal conversational moment without feeling intrusive.',
    ],
    achievements: [
      'Multi-turn conversational AI with LangGraph state management and intent detection.',
      'RAG knowledge retrieval for contextually accurate product responses.',
      'Full-stack SaaS-style architecture: FastAPI backend + React frontend.',
    ],
    architecture: 'React Chat UI → FastAPI → LangGraph Agent → FAISS RAG → Lead Capture',
    liveUrl: 'https://github.com/anshumanvatsa/AutoStream-AI-Agent',
    githubUrl: 'https://github.com/anshumanvatsa/AutoStream-AI-Agent',
    previewImage: '/autostream-preview.png',
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
    id: 'heartdisease',    title: 'Heart Disease Predictor',
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
    previewImage: '/heartdisease-preview.png',
    category: 'ml',
    metrics: [
      { label: 'Best Acc.', value: '89%' },
      { label: 'Model', value: 'XGBoost' },
      { label: 'XAI', value: 'SHAP' },
    ],
    year: '2024',
    status: 'open-source',
  },
  {
    id: 'documind',    title: 'DocuMind RAG',
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
    previewImage: '/documind-preview.png',
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
    id: 'selective-encryption',    title: 'Selective Encryption System',
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
    previewImage: '/encryption-preview.png',
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
    id: 'medicine-safety',    title: 'DrugSafe AI',
    subtitle: 'Medicine Safety Predictor',
    shortDesc:
      'A complete drug safety prediction system with a Flask backend API and React frontend for batch CSV predictions.',
    tags: ['Flask', 'React', 'Python'],
    fullTags: ['Flask', 'React', 'Python', 'Machine Learning', 'API Design'],
    description:
      'DrugSafe AI is a comprehensive medicine safety prediction system that replaced a legacy Streamlit interface with a production-grade full-stack architecture. It features a Flask REST API backend and a React frontend, allowing users to upload batch CSV files of patient data and drug information to receive instant safety predictions and risk assessments.',
    challenges: [
      'Migrating a tightly-coupled Streamlit ML app into a decoupled API and frontend architecture.',
      'Handling batch CSV processing and prediction generation efficiently over REST endpoints.',
      'Designing a user-friendly React interface for medical data upload and risk visualization.',
    ],
    achievements: [
      'Built a scalable Flask API for serving ML predictions on batch CSV data.',
      'Developed a modern React frontend for seamless user interaction and data visualization.',
      'Improved system architecture from a monolithic script to a modular full-stack application.',
    ],
    architecture: 'React Frontend → Flask API → ML Model → Prediction Output',
    liveUrl: 'https://github.com/anshumanvatsa/Medicine_safety_checker',
    githubUrl: 'https://github.com/anshumanvatsa/Medicine_safety_checker',
    previewImage: '/medicine-safety-preview.png',
    category: 'fullstack',
    metrics: [
      { label: 'Backend', value: 'Flask' },
      { label: 'Input', value: 'CSV Batch' },
      { label: 'Type', value: 'Medical AI' },
    ],
    year: '2025',
    status: 'open-source',
  },
  {
    id: 'artful-heaven',    title: 'Artful Heaven',
    subtitle: 'Premium E-Commerce Art Platform',
    shortDesc: 'A highly aesthetic, UI/UX-heavy digital art and e-commerce platform featuring glassmorphism, fluid animations, and premium dark-mode styling.',
    tags: ['React', 'UI/UX', 'Tailwind'],
    fullTags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'UI/UX Design', 'Frontend', 'E-Commerce'],
    description: 'Artful Heaven is a premium digital art and e-commerce platform with an extreme focus on UI/UX design. It features immersive glassmorphism, dynamic routing, and fluid micro-animations that make discovering art feel luxurious. Built with modern React and Tailwind CSS, it implements complex interactive states and seamless page transitions.',
    challenges: [
      'Designing an ultra-premium dark theme using glassmorphic UI elements and subtle neon accents.',
      'Implementing smooth micro-animations for interactive elements without compromising performance.',
      'Structuring a scalable component system for an e-commerce layout.'
    ],
    achievements: [
      'Highly aesthetic UI/UX design that elevates the standard of frontend presentation.',
      'Responsive, mobile-first layouts with complex grid systems.',
      'Optimized asset delivery for high-resolution digital art.'
    ],
    architecture: 'React Frontend -> Framer Motion Animations -> Custom UI Design System',
    liveUrl: 'http://13.60.57.168:4008',
    githubUrl: 'https://github.com/anshumanvatsa/the-artful-haven',
    previewImage: '/artful-heaven-preview.png',
    category: 'fullstack',
    metrics: [
      { label: 'Type', value: 'E-Commerce' },
      { label: 'Design', value: 'UI/UX' },
      { label: 'Status', value: 'Building' }
    ],
    year: '2025',
    status: 'live'
  }
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
    organization: 'Special Team-Ignition (Student Rocketry Team)',
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
    techs: ['PostgreSQL', 'MongoDB', 'Firebase', 'Redis', 'Supabase', 'Neo4j', 'ChromaDB'],
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
    name: 'IBM DevOps Fundamentals',
    issuer: 'IBM',
    date: '2025',
    badge: '🏅',
  },
  {
    id: 'c2',
    name: 'IBM Agile & Design Thinking',
    issuer: 'IBM',
    date: '2025',
    badge: '🏅',
  },
  {
    id: 'c3',
    name: 'IBM DevOps Training',
    issuer: 'IBM',
    date: '2025',
    badge: '🏅',
  },
  {
    id: 'c4',
    name: 'Machine Learning I',
    issuer: 'Columbia+',
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
    title: '10+ Live Deployments',
    body: 'Successfully built, containerized, and deployed 10+ production-ready applications across Vercel, Render, and AWS.',
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
