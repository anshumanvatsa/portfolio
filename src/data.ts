// Anshuman Mishra — Portfolio Data (verified from actual resume)

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

// ─────────────────────── PROJECTS (3 verified projects from resume) ───────────────────────

export const PROJECTS: Project[] = [
  {
    id: 'carepredict',
    number: '01',
    title: 'CarePredictAI',
    subtitle: 'Clinical Risk Prediction System',
    shortDesc:
      'Full-stack health risk platform predicting 90-day patient deterioration across 4 conditions. v2 added XGBoost classifiers with risk stratification and an explainability dashboard.',
    tags: ['React', 'FastAPI', 'PyTorch LSTM'],
    fullTags: ['React', 'FastAPI', 'PyTorch LSTM', 'XGBoost', 'SHAP', 'Tailwind CSS'],
    description:
      'CarePredictAI is a full-stack health risk platform that predicts 90-day patient deterioration across 4 clinical conditions. The system uses PyTorch LSTM models for sequence-based time-series patient data, paired with a FastAPI backend and a React dashboard. Version 2 added XGBoost classifiers with SHAP-based explainability, providing clinicians with risk stratification scores and feature importance breakdowns they can act on.',
    challenges: [
      'Handling clinical time-series data with irregular sampling intervals and significant missing value rates.',
      'Building a model explainability layer that translates SHAP outputs into actionable clinical summaries.',
      'Integrating a v2 XGBoost pipeline alongside the existing LSTM model without breaking the inference API.',
    ],
    achievements: [
      'Built PyTorch LSTM pipeline for patient deterioration prediction across 4 clinical conditions.',
      'v2 XGBoost classifiers added risk stratification with a full SHAP explainability dashboard.',
      'FastAPI backend with React frontend deployed live at care-predict-ai.vercel.app.',
    ],
    architecture: 'React Dashboard → FastAPI → PyTorch LSTM / XGBoost Inference → PostgreSQL',
    liveUrl: 'https://care-predict-ai.vercel.app',
    githubUrl: 'https://github.com/anshumanvatsa/CarePredictAI',
    category: 'ml',
    metrics: [
      { label: 'Conditions', value: '4' },
      { label: 'Models', value: '2' },
      { label: 'Live at', value: 'Vercel' },
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
      'DevOps monitoring dashboard replicating Vercel/Render functionality with JWT auth, CSRF protection, real-time infrastructure tracking, and one-command Docker deployment.',
    tags: ['TypeScript', 'Docker', 'AWS EC2'],
    fullTags: ['TypeScript', 'Python', 'Docker', 'AWS EC2', 'WebSockets', 'JWT', 'CSRF Protection', 'CI/CD'],
    description:
      'CloudPilot is a DevOps monitoring dashboard modelled after Vercel and Render cloud platforms. It provides real-time infrastructure tracking via WebSockets, JWT-secured authentication, CSRF protection, and one-command Docker deployment. Developers can monitor server health, view live build logs, and manage deployment pipelines from a unified dashboard.',
    challenges: [
      'Streaming real-time infrastructure metrics from AWS EC2 instances to browser clients without high polling overhead.',
      'Implementing JWT + CSRF protection on a stateless REST API architecture without degrading developer UX.',
      'Making Docker deployment configuration simple enough to run with a single terminal command.',
    ],
    achievements: [
      'Real-time infrastructure tracking via WebSockets with JWT auth and CSRF protection.',
      'One-command Docker deployment pipeline reducing setup time significantly.',
      'Deployed at cloudpilot.13.60.57.168.sslip.io replicating Vercel/Render workflows.',
    ],
    architecture: 'React Dashboard → WebSocket Server → Docker → AWS EC2 → Live Metrics Stream',
    liveUrl: 'http://cloudpilot.13.60.57.168.sslip.io',
    githubUrl: 'https://github.com/anshumanvatsa/CloudPilot',
    category: 'devops',
    metrics: [
      { label: 'Auth', value: 'JWT' },
      { label: 'Deploy', value: '1-cmd' },
      { label: 'Live at', value: 'AWS EC2' },
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
      'Co-built live ocean hazard reporting platform. Owned the analytics dashboard and admin panel with Zod + React Hook Form validation and Supabase real-time backend.',
    tags: ['Next.js 14', 'Supabase', 'Leaflet.js'],
    fullTags: ['Next.js 14', 'Leaflet.js', 'Supabase', 'PostgreSQL', 'Zod', 'React Hook Form', 'Tailwind CSS'],
    description:
      'VARUNA is a collaborative live ocean hazard reporting platform where users can submit and view real-time coastal hazard events on an interactive Leaflet.js map. I co-built this project and personally owned the analytics dashboard and admin panel, implementing Zod schema validation and React Hook Form for reliable, type-safe data entry. Supabase provides the real-time database and auth backend.',
    challenges: [
      'Building a type-safe form validation system using Zod schemas that sync with Supabase table constraints.',
      'Rendering a Leaflet.js map with real-time hazard markers that update without a full page reload.',
      'Designing an admin panel with role-based access control for hazard report moderation.',
    ],
    achievements: [
      'Owned analytics dashboard and admin panel with Zod + React Hook Form validation.',
      'Integrated Supabase real-time subscriptions for live hazard event updates on the map.',
      'Deployed at varuna001.vercel.app with collaborative team development workflow.',
    ],
    architecture: 'Next.js 14 → Leaflet.js Map → Supabase Real-time DB → Admin Panel → Analytics Dashboard',
    liveUrl: 'https://varuna001.vercel.app',
    githubUrl: 'https://github.com/anshumanvatsa/Varuna',
    category: 'fullstack',
    metrics: [
      { label: 'Stack', value: 'Next 14' },
      { label: 'DB', value: 'Supabase' },
      { label: 'Live at', value: 'Vercel' },
    ],
    year: '2024',
    status: 'live',
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
    period: '2023 — 2024',
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
    techs: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'Bi-LSTM', 'Transformers', 'LLMs', 'RAG', 'Prompt Engineering'],
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
    techs: ['Docker', 'Kubernetes', 'Jenkins', 'Git', 'CI/CD', 'AWS EC2', 'Vercel'],
    icon: '☁️',
  },
  {
    id: 'databases',
    category: 'Databases',
    techs: ['PostgreSQL', 'Redis', 'Supabase'],
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
    date: '2024',
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
    title: '3 Live Projects Deployed',
    body: 'CarePredictAI, CloudPilot, and VARUNA are all deployed and publicly accessible.',
    icon: '🚀',
    year: '2024',
  },
  {
    id: 'a4',
    title: 'General Secretary',
    body: 'Led and executed 15+ large-scale student events as General Secretary of the Collegiate Cultural Club.',
    icon: '🎭',
    year: '2023–2024',
  },
];
