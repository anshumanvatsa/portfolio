// Anshuman Mishra's Portfolio Content Data

export interface Project {
  id: string;
  number: string;
  title: string;
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
}

export const PROJECTS: Project[] = [
  {
    id: 'carepredict',
    number: '01',
    title: 'CarePredictAI',
    shortDesc: 'Full-stack health risk platform predicting 90-day patient deterioration using time-series electronic health records.',
    tags: ['React', 'FastAPI', 'PyTorch'],
    fullTags: ['React', 'FastAPI', 'PyTorch LSTM', 'XGBoost', 'SHAP', 'EHR Datasets'],
    description: `CarePredictAI is an advanced clinical support system engineered to predict 90-day mortality and physiological deterioration risks. Utilizing sequence-based deep learning models on time-series EHR data (such as MIMIC-III/IV), the system achieves state-of-the-art predictive accuracy while offering robust model explainability.`,
    challenges: [
      'Processing highly sparse and irregularly sampled clinical time-series observations.',
      'Translating deep learning feature representations into clinicians-interpretable SHAP parameters.',
      'Deploying low-latency prediction pipelines inside real-world EHR microservices.'
    ],
    achievements: [
      'Engineered an LSTM-Autoencoder pipeline that handles missing values via linear-decay imputation.',
      'Achieved a ROC-AUC score of 0.89 on mortality prediction benchmarks, surpassing baseline logistic systems.',
      'Designed an interactive clinician interface presenting real-time patient risk trajectories and feature importances.'
    ],
    architecture: 'React Front-End -> FastAPI Middleware -> PyTorch Inference Node -> SQLite/PostgreSQL',
    liveUrl: '#carepredict-demo',
    githubUrl: 'https://github.com/anshuman-mishra/CarePredictAI',
    category: 'ml',
    metrics: [
      { label: 'ROC-AUC', value: '0.89' },
      { label: 'Inference Latency', value: '42ms' },
      { label: 'F1 Score', value: '0.81' }
    ]
  },
  {
    id: 'cloudpilot',
    number: '02',
    title: 'CloudPilot',
    shortDesc: 'DevOps monitoring dashboard replicating Vercel/Render workflows with automated deployment pipelines and real-time metric visualization.',
    tags: ['TypeScript', 'AWS'],
    fullTags: ['TypeScript', 'Python', 'Docker', 'AWS EC2', 'Jenkins', 'Redis', 'WebSockets'],
    description: `CloudPilot delivers Git-integrated deployment automation and telemetry tracking. Designed to model workflows similar to modern cloud platforms, it allows developers to connect repositories, trigger container builds on-push, provision sandboxed AWS resources, and stream build logs and compute metrics in real-time.`,
    challenges: [
      'Managing safe isolated container builds concurrently on host environments.',
      'Streaming live step-by-step logs from build pods to the client browser.',
      'Orchestrating real-time time-series CPU/memory telemetry without database throttling.'
    ],
    achievements: [
      'Built a microservice architecture in Node.js and Redis Pub/Sub for scalable build queuing.',
      'Implemented WebSockets for sub-second terminal log streaming and telemetry rendering.',
      'Created automated deployment webhooks triggered on GitHub actions pushing code.'
    ],
    architecture: 'Git Webhook -> Jenkins Builder Service -> Docker Registry -> AWS EC2 Runner Nodes',
    liveUrl: '#cloudpilot-demo',
    githubUrl: 'https://github.com/anshuman-mishra/CloudPilot',
    category: 'devops',
    metrics: [
      { label: 'Build Spin-up Time', value: '<2.1s' },
      { label: 'Log Stream Latency', value: '15ms' },
      { label: 'Telemetry Precision', value: '99.8%' }
    ]
  },
  {
    id: 'varuna',
    number: '03',
    title: 'VARUNA',
    shortDesc: 'Live ocean hazard reporting platform aggregating crowdsourced geospatial data to provide early warnings for coastal communities.',
    tags: ['Next.js', 'Supabase'],
    fullTags: ['Next.js 14', 'Leaflet.js', 'Supabase', 'PostgreSQL', 'Geospatial Querying'],
    description: `VARUNA is a high-availability community safety system designed to track oceanographic hazards (e.g. rip currents, water pollution, illegal dumping). Integrating crowd-reported coordinates with automated weather alerts, the map-centric dashboard provides coastal communities with early threat awareness.`,
    challenges: [
      'Ensuring low-latency spatial indexing and cluster calculations for massive coordinate loads.',
      'Establishing verifiable reporting loops to filter false hazard alerts.',
      'Delivering real-time localized SMS/Email alert triggers to signed-up citizens.'
    ],
    achievements: [
      'Leveraged Supabase (PostgREST) and pg_vector/PostGIS spatial indexes for geo-clustering calculations.',
      'Implemented an interactive vector map client with Leaflet.js support for custom marine coordinates.',
      'Designed a multi-agent validation protocol leveraging community upvoting and verified ocean reporters.'
    ],
    architecture: 'Next.js Map View -> Leaflet Canvas -> Supabase PostGIS Database -> Twilio Alert System',
    liveUrl: '#varuna-demo',
    githubUrl: 'https://github.com/anshuman-mishra/Varuna',
    category: 'fullstack',
    metrics: [
      { label: 'Map Load Time', value: '0.4s' },
      { label: 'Reporting Lag', value: 'Real-time' },
      { label: 'Alert Dispatch', value: '1.2s' }
    ]
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: 'exp1',
    period: '2024 — Present',
    role: 'ML Intern',
    organization: 'Deuglo',
    details: [
      'Designed and deployed post-engagement prediction engines using advanced XGBoost and SHAP explainers.',
      'Collaborated closely with backend engineers to deploy PyTorch model APIs inside FastAPI servers under strict SLA requirements.'
    ],
    type: 'experience'
  },
  {
    id: 'exp2',
    period: '2023 — 2024',
    role: 'Propulsion Engineer',
    organization: 'Special Team-Ignition',
    details: [
      'Spearheaded computational modeling of fuel injection profiles and thermal dynamics equations.',
      'Designed structural analysis loops for atmospheric test systems.'
    ],
    type: 'experience'
  },
  {
    id: 'exp3',
    period: '2023 — 2024',
    role: 'General Secretary',
    organization: 'MMC Cultural Club',
    details: [
      'Directed large-scale regional student activities, establishing sponsorships and digital registration software.',
      'Managed structural budget allocation and cross-functional student committees.'
    ],
    type: 'experience'
  },
  {
    id: 'edu1',
    period: '2023 — 2027',
    role: 'B.Tech Computer Science',
    organization: 'VIT Chennai · CGPA 8.83/10',
    details: [
      'Core focus areas: Machine Learning, Artificial Intelligence, Database Management, and Systems Engineering.',
      'Active research researcher on Temporal Graph Networks (TGNs) for forecasting media virality pathways.'
    ],
    type: 'education'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'ml',
    category: 'ML / AI',
    techs: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'LangChain', 'SHAP', 'Transformers']
  },
  {
    id: 'fullstack',
    category: 'Full-Stack',
    techs: ['React', 'Next.js', 'Node.js', 'FastAPI', 'Django', 'Express', 'Tailwind CSS']
  },
  {
    id: 'devops',
    category: 'DevOps',
    techs: ['Docker', 'AWS EC2', 'Jenkins', 'GitHub Actions', 'Linux Shell', 'Nginx']
  },
  {
    id: 'databases',
    category: 'Databases',
    techs: ['PostgreSQL', 'MongoDB', 'Supabase', 'Redis', 'SQLite', 'PostGIS']
  },
  {
    id: 'languages',
    category: 'Languages',
    techs: ['Python', 'TypeScript', 'JavaScript', 'C++', 'SQL', 'HTML/CSS']
  }
];
