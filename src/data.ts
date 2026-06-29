// Anshuman Mishra — Portfolio Data

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
  logo?: string;
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

// ───────────────────────── PROJECTS ─────────────────────────

export const PROJECTS: Project[] = [
  {
    id: 'carepredict',
    number: '01',
    title: 'CarePredictAI',
    subtitle: 'Clinical Risk Prediction System',
    shortDesc:
      'Full-stack health risk platform predicting 90-day patient deterioration using time-series EHR data with explainable SHAP importance maps.',
    tags: ['React', 'FastAPI', 'PyTorch'],
    fullTags: ['React', 'FastAPI', 'PyTorch LSTM', 'XGBoost', 'SHAP', 'MIMIC-IV EHR', 'PostgreSQL', 'Docker'],
    description:
      'CarePredictAI is an advanced clinical decision support system engineered to predict 90-day mortality and physiological deterioration risk for ICU patients. Utilizing sequence-based LSTM autoencoders on MIMIC-IV time-series EHR data, the platform achieves state-of-the-art predictive accuracy with full model explainability through SHAP waterfall plots. Clinicians can interact with risk trajectories, trace feature importances, and receive real-time alerts when patient vitals cross predicted thresholds.',
    challenges: [
      'Processing highly sparse and irregularly sampled clinical time-series observations with up to 40% missing values.',
      'Translating deep learning feature representations into clinician-interpretable SHAP parameters without information loss.',
      'Deploying low-latency PyTorch inference pipelines inside EHR microservices under strict sub-50ms SLA constraints.',
    ],
    achievements: [
      'Engineered LSTM-Autoencoder pipeline handling missing values via linear-decay imputation — outperformed baseline models by 18%.',
      'Achieved ROC-AUC score of 0.89 on MIMIC-IV mortality benchmarks, surpassing published logistic regression baselines.',
      'Designed interactive risk trajectory dashboard with per-feature SHAP waterfall charts for clinical explainability.',
    ],
    architecture: 'React Dashboard → FastAPI Gateway → PyTorch LSTM Inference → PostgreSQL + Redis Cache',
    liveUrl: '#carepredict-demo',
    githubUrl: 'https://github.com/anshumanvatsa/CarePredictAI',
    category: 'ml',
    metrics: [
      { label: 'ROC-AUC', value: '0.89' },
      { label: 'Inference', value: '42ms' },
      { label: 'F1 Score', value: '0.81' },
    ],
    year: '2024',
    status: 'research',
  },
  {
    id: 'cloudpilot',
    number: '02',
    title: 'CloudPilot',
    subtitle: 'DevOps Deployment Automation',
    shortDesc:
      'DevOps monitoring dashboard replicating Vercel/Render CI-CD workflows with Docker build queues, AWS EC2 provisioning, and real-time log streaming.',
    tags: ['TypeScript', 'Docker', 'AWS'],
    fullTags: ['TypeScript', 'Python', 'Docker', 'AWS EC2', 'Jenkins', 'Redis Pub/Sub', 'WebSockets', 'GitHub Webhooks'],
    description:
      'CloudPilot delivers Git-integrated deployment automation and telemetry tracking modeled after Vercel and Render cloud pipelines. Developers can connect repositories, trigger containerized builds on push events, provision sandboxed AWS EC2 environments, and stream step-by-step build logs and CPU/memory telemetry to a live browser dashboard via WebSockets. Redis Pub/Sub handles concurrent build queue orchestration at scale.',
    challenges: [
      'Managing safely isolated concurrent container builds across multiple host environments without resource contention.',
      'Streaming live build step logs from Docker pods to browser clients with under 15ms perceived latency.',
      'Orchestrating real-time CPU and memory telemetry timeseries without saturating database write throughput.',
    ],
    achievements: [
      'Built a Redis Pub/Sub microservice architecture for horizontally scalable build queue management.',
      'Implemented WebSocket streaming achieving sub-15ms log delivery from build runner to browser terminal.',
      'Automated deployment webhooks via GitHub Actions integration reducing manual intervention by 100%.',
    ],
    architecture: 'GitHub Webhook → Jenkins Builder → Docker Registry → AWS EC2 Runners → WebSocket Stream → Dashboard',
    liveUrl: '#cloudpilot-demo',
    githubUrl: 'https://github.com/anshumanvatsa/CloudPilot',
    category: 'devops',
    metrics: [
      { label: 'Build Spin-up', value: '<2.1s' },
      { label: 'Log Latency', value: '15ms' },
      { label: 'Uptime', value: '99.8%' },
    ],
    year: '2024',
    status: 'open-source',
  },
  {
    id: 'varuna',
    number: '03',
    title: 'VARUNA',
    subtitle: 'Ocean Hazard Early Warning System',
    shortDesc:
      'Live ocean hazard reporting platform aggregating crowdsourced geospatial data to provide early warnings for rip currents, pollution, and coastal threats.',
    tags: ['Next.js 14', 'Supabase', 'Leaflet'],
    fullTags: ['Next.js 14', 'Leaflet.js', 'Supabase', 'PostGIS', 'PostgreSQL', 'Twilio', 'Geospatial Indexing'],
    description:
      'VARUNA is a high-availability community safety system designed to track oceanographic hazards including rip currents, water pollution events, and illegal coastal dumping. Integrating crowd-reported GPS coordinates with automated weather triggers, the map-centric dashboard provides coastal communities with early threat awareness and dispatches SMS/Email alerts to registered subscribers within 1.2 seconds of validation.',
    challenges: [
      'Ensuring low-latency spatial indexing and cluster calculations for hundreds of simultaneous geospatial coordinate loads.',
      'Building verifiable reporting loops to filter false hazard alerts with community upvoting and verified reporter networks.',
      'Delivering real-time localized SMS and Email alert triggers to citizen subscribers under 1.5 seconds.',
    ],
    achievements: [
      'Leveraged Supabase PostGIS spatial indexes for millisecond geo-clustering across 10k+ data points.',
      'Implemented multi-agent alert validation protocol reducing false positive hazard reports by 73%.',
      'Live vector map with Leaflet.js rendering custom marine coordinate overlays with sub-400ms initial load.',
    ],
    architecture: 'Next.js Map → Leaflet Canvas → Supabase PostGIS → Alert Queue → Twilio SMS/Email',
    liveUrl: '#varuna-demo',
    githubUrl: 'https://github.com/anshumanvatsa/Varuna',
    category: 'fullstack',
    metrics: [
      { label: 'Map Load', value: '0.4s' },
      { label: 'Alert Dispatch', value: '1.2s' },
      { label: 'False Positives', value: '-73%' },
    ],
    year: '2024',
    status: 'open-source',
  },
  {
    id: 'cascadeiq',
    number: '04',
    title: 'CascadeIQ',
    subtitle: 'Virality Forecasting via Temporal Graphs',
    shortDesc:
      'Social media intelligence platform using Temporal Graph Networks to model information cascade propagation and predict virality pathways across dynamic networks.',
    tags: ['PyTorch', 'TGN', 'Graph ML'],
    fullTags: ['PyTorch Geometric', 'Temporal Graph Networks', 'NetworkX', 'FastAPI', 'Redis', 'D3.js', 'MongoDB'],
    description:
      'CascadeIQ is an active research project developing a state-of-the-art virality prediction engine using Temporal Graph Networks (TGN). The system models how information cascades propagate through social network topologies over time, identifying virality inflection points before they occur. Currently targeting publication in IEEE Access with a novel attention-gated temporal propagation layer for multi-hop cascade reasoning.',
    challenges: [
      'Designing efficient temporal graph data structures for streaming social interaction edges at millions-of-events scale.',
      'Training TGN models on sparse, biased social media cascade datasets with distribution shift across platforms.',
      'Rendering complex temporal graph topology animations in real-time without degrading browser performance.',
    ],
    achievements: [
      'Designed novel Attention-Gated Temporal Propagation (AGTP) layer achieving 12% AUC improvement over baseline TGNs.',
      'Built streaming graph update pipeline processing 50k edge events per second with Redis-backed edge memory.',
      'Interactive D3.js visualization of cascade propagation pathways with animated node-edge rendering.',
    ],
    architecture: 'Social Data Feed → TGN Model → Cascade Predictor → FastAPI → D3.js Visualization',
    liveUrl: '#cascadeiq-demo',
    githubUrl: 'https://github.com/anshumanvatsa/CascadeIQ',
    category: 'ml',
    metrics: [
      { label: 'AUC Improvement', value: '+12%' },
      { label: 'Edge Throughput', value: '50k/s' },
      { label: 'Paper Status', value: 'Drafted' },
    ],
    year: '2025',
    status: 'research',
  },
  {
    id: 'nexusai',
    number: '05',
    title: 'NexusAI Chat',
    subtitle: 'Multi-Model LLM Orchestration Platform',
    shortDesc:
      'Full-stack LLM orchestration platform supporting GPT-4, Claude, Gemini, and local Ollama models with RAG pipelines, streaming responses, and conversation memory.',
    tags: ['React', 'LangChain', 'FastAPI'],
    fullTags: ['React', 'LangChain', 'FastAPI', 'ChromaDB', 'OpenAI API', 'Anthropic Claude', 'Gemini', 'Ollama', 'pgvector'],
    description:
      'NexusAI Chat is a production-ready LLM orchestration platform enabling users to seamlessly switch between frontier AI models including GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and local Ollama models from a unified interface. Features include RAG-powered document Q&A via ChromaDB vector stores, real-time streaming tokens via SSE, conversation branching, and fine-grained system prompt management.',
    challenges: [
      'Building a unified streaming interface across heterogeneous LLM provider APIs with different token streaming protocols.',
      'Implementing efficient RAG retrieval with hybrid dense + sparse retrieval across ChromaDB and pgvector backends.',
      'Managing conversation memory and branching state across long multi-turn chat sessions.',
    ],
    achievements: [
      'Unified streaming layer abstracting OpenAI, Anthropic, Google, and Ollama APIs into a single SSE stream.',
      'Built hybrid RAG retrieval combining ChromaDB dense embeddings with BM25 sparse retrieval — 23% relevance improvement.',
      'Conversation branching and forking system handling 1000+ turn sessions with sub-100ms retrieval.',
    ],
    architecture: 'React Chat UI → FastAPI Orchestrator → LangChain Router → Multi-LLM Providers → ChromaDB RAG',
    liveUrl: '#nexusai-demo',
    githubUrl: 'https://github.com/anshumanvatsa/NexusAI',
    category: 'ml',
    metrics: [
      { label: 'Models Supported', value: '6+' },
      { label: 'RAG Relevance', value: '+23%' },
      { label: 'Stream Latency', value: '90ms' },
    ],
    year: '2025',
    status: 'live',
  },
];

// ───────────────────────── TIMELINE ─────────────────────────

export const TIMELINE: TimelineItem[] = [
  {
    id: 'exp1',
    period: 'May 2024 — Present',
    role: 'Machine Learning Engineer Intern',
    organization: 'Deuglo · Full-time Internship',
    details: [
      'Architected post-engagement prediction engine using XGBoost + SHAP achieving 15% uplift in precision over previous heuristics.',
      'Deployed PyTorch model APIs inside FastAPI microservices with <42ms average inference latency under production SLAs.',
      'Collaborated with senior engineers on data pipeline ETL infrastructure processing 2M+ daily engagement records.',
      'Authored technical documentation for ML model versioning and A/B deployment protocols.',
    ],
    type: 'experience',
  },
  {
    id: 'exp2',
    period: 'Aug 2023 — Apr 2024',
    role: 'Propulsion Research Engineer',
    organization: 'Special Team — Ignition · Collegiate Rocketry',
    details: [
      'Spearheaded computational fluid dynamics modeling of bipropellant fuel injection profiles and thermal boundary dynamics.',
      'Designed structural analysis simulations for atmospheric test cells using finite element mathematics.',
      'Led a team of 6 engineers on subsystem integration and static fire test preparation protocols.',
    ],
    type: 'experience',
  },
  {
    id: 'exp3',
    period: 'Aug 2023 — May 2024',
    role: 'General Secretary',
    organization: 'MMC Cultural Club · VIT Chennai',
    details: [
      'Directed large-scale regional cultural events (1200+ attendees) with end-to-end logistics and digital ticketing systems.',
      'Established ₹2.5L sponsorship portfolio from 12 corporate partners through direct outreach and pitch decks.',
      'Built automated digital registration platform using Google Apps Script, reducing manual workload by 80%.',
    ],
    type: 'extra',
  },
  {
    id: 'edu1',
    period: '2023 — 2027',
    role: 'B.Tech Computer Science & Engineering',
    organization: 'VIT Chennai · CGPA 8.83 / 10',
    details: [
      'Core coursework: Machine Learning, Deep Learning, Database Systems, Operating Systems, Computer Networks, Algorithms.',
      'Active researcher on Temporal Graph Networks (TGNs) for social media virality cascade forecasting.',
      'Member of the AI/ML research cluster and competitive programming team.',
    ],
    type: 'education',
  },
];

// ───────────────────────── SKILLS ─────────────────────────

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'ml',
    category: 'ML / AI',
    techs: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'LangChain', 'SHAP', 'Transformers', 'PyG', 'ONNX'],
    icon: '🧠',
  },
  {
    id: 'fullstack',
    category: 'Full-Stack',
    techs: ['React', 'Next.js', 'Node.js', 'FastAPI', 'Django', 'Express', 'TypeScript', 'tRPC', 'Prisma'],
    icon: '🌐',
  },
  {
    id: 'devops',
    category: 'DevOps & Cloud',
    techs: ['Docker', 'AWS EC2/S3', 'Jenkins', 'GitHub Actions', 'Nginx', 'Linux', 'Vercel', 'Terraform'],
    icon: '☁️',
  },
  {
    id: 'databases',
    category: 'Databases',
    techs: ['PostgreSQL', 'MongoDB', 'Supabase', 'Redis', 'ChromaDB', 'PostGIS', 'SQLite', 'pgvector'],
    icon: '🗄️',
  },
  {
    id: 'languages',
    category: 'Languages',
    techs: ['Python', 'TypeScript', 'JavaScript', 'C++', 'SQL', 'Bash', 'HTML/CSS'],
    icon: '💻',
  },
];

// ───────────────────────── CERTIFICATIONS ─────────────────────────

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'c1',
    name: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI (Andrew Ng)',
    date: '2024',
    badge: '🎓',
  },
  {
    id: 'c2',
    name: 'AWS Cloud Practitioner Essentials',
    issuer: 'Amazon Web Services',
    date: '2024',
    badge: '☁️',
  },
  {
    id: 'c3',
    name: 'Full-Stack Open',
    issuer: 'University of Helsinki',
    date: '2023',
    badge: '🌐',
  },
  {
    id: 'c4',
    name: 'CS50x: Introduction to Computer Science',
    issuer: 'Harvard University (edX)',
    date: '2023',
    badge: '🏛️',
  },
];

// ───────────────────────── ACHIEVEMENTS ─────────────────────────

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a1',
    title: 'IEEE Access Paper — Under Review',
    body: 'Research paper on CascadeIQ Temporal Graph Networks for virality prediction submitted to IEEE Access.',
    icon: '📄',
    year: '2025',
  },
  {
    id: 'a2',
    title: 'Top 10% GPA — VIT Chennai',
    body: 'Consistent CGPA of 8.83/10 placing within top 10% of the Computer Science batch.',
    icon: '🏆',
    year: '2024',
  },
  {
    id: 'a3',
    title: 'VIT Hackathon — Finalist',
    body: 'Reached finals of inter-college hackathon with CarePredictAI healthcare ML system.',
    icon: '⚡',
    year: '2024',
  },
  {
    id: 'a4',
    title: 'Open Source — 200+ GitHub Stars',
    body: 'CloudPilot and VARUNA projects received 200+ combined GitHub stars from the developer community.',
    icon: '⭐',
    year: '2024',
  },
];
