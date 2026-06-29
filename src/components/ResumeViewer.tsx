import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Mail, MapPin, Globe, Github, Award, Briefcase, GraduationCap, Code2 } from 'lucide-react';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const RESUME = {
  name: 'Anshuman Mishra',
  title: 'Machine Learning Engineer & Full-Stack Developer',
  location: 'Chennai, India',
  email: 'atulvatsamishra@gmail.com',
  github: 'github.com/anshumanvatsa',
  linkedin: 'linkedin.com/in/anshumanmishra',
  summary: 'Final-year Computer Science student at VIT Chennai (CGPA 8.83/10) specializing in building production-grade AI/ML systems and full-stack web infrastructure. Experienced in the complete ML lifecycle — from research and model training to FastAPI deployment and React dashboards. Currently building post-engagement prediction engines at Deuglo and researching temporal graph networks for virality forecasting.',
  experience: [
    {
      title: 'Machine Learning Engineer Intern',
      company: 'Deuglo',
      period: 'May 2024 — Present',
      type: 'Full-time Internship · Remote',
      points: [
        'Architected post-engagement prediction engine using XGBoost + SHAP, achieving 15% uplift in precision over legacy heuristics.',
        'Deployed PyTorch inference APIs inside FastAPI microservices maintaining <42ms average latency under production SLAs.',
        'Designed ETL data pipelines processing 2M+ daily social engagement records using Python and AWS S3.',
        'Authored ML model versioning documentation and A/B deployment protocols for 3-person engineering team.',
      ],
    },
    {
      title: 'Propulsion Research Engineer',
      company: 'Special Team — Ignition (Collegiate Rocketry)',
      period: 'Aug 2023 — Apr 2024',
      type: 'Technical Team · VIT Chennai',
      points: [
        'Built computational fluid dynamics models for bipropellant fuel injection and thermal boundary analysis.',
        'Conducted finite element structural simulations for atmospheric test cell components.',
        'Led 6-member subsystem integration team for static fire test protocols.',
      ],
    },
    {
      title: 'General Secretary',
      company: 'MMC Cultural Club, VIT Chennai',
      period: 'Aug 2023 — May 2024',
      type: 'Leadership · Student Organization',
      points: [
        'Organized large-scale cultural events (1200+ attendees) end-to-end with digital ticketing and logistics.',
        'Established ₹2.5L sponsorship portfolio from 12 corporate partners via outreach and pitch decks.',
        'Built automated registration platform in Google Apps Script reducing manual effort by 80%.',
      ],
    },
  ],
  education: [
    {
      degree: 'B.Tech Computer Science & Engineering',
      institution: 'Vellore Institute of Technology (VIT), Chennai',
      period: '2023 — 2027',
      detail: 'CGPA: 8.83 / 10 (Top 10% batch)',
      courses: 'Machine Learning, Deep Learning, DBMS, OS, Computer Networks, Data Structures & Algorithms',
    },
  ],
  projects: [
    { name: 'CarePredictAI', stack: 'PyTorch LSTM · FastAPI · React · PostgreSQL', desc: 'Clinical risk prediction platform on MIMIC-IV EHR data. ROC-AUC 0.89, F1 0.81, <42ms inference.', year: '2024' },
    { name: 'CascadeIQ', stack: 'PyTorch Geometric · TGN · FastAPI · D3.js', desc: 'Temporal Graph Network model for social media virality forecasting. Novel AGTP layer, +12% AUC. IEEE Access submission.', year: '2025' },
    { name: 'CloudPilot', stack: 'Docker · AWS EC2 · Jenkins · Redis · WebSockets', desc: 'DevOps CI/CD automation dashboard with live build log streaming. <2.1s spin-up, 99.8% uptime.', year: '2024' },
    { name: 'NexusAI Chat', stack: 'LangChain · ChromaDB · FastAPI · React', desc: 'Multi-model LLM orchestration (GPT-4, Claude, Gemini) with RAG pipelines. +23% retrieval relevance.', year: '2025' },
    { name: 'VARUNA', stack: 'Next.js 14 · Supabase · PostGIS · Twilio', desc: 'Ocean hazard early-warning system. Real-time geospatial clustering, 1.2s alert dispatch, -73% false positives.', year: '2024' },
  ],
  skills: [
    { label: 'ML / AI', items: 'PyTorch, TensorFlow, Scikit-learn, XGBoost, LangChain, SHAP, PyTorch Geometric, ONNX, Transformers' },
    { label: 'Full-Stack', items: 'React, Next.js, Node.js, FastAPI, Django, Express, TypeScript, Prisma, tRPC' },
    { label: 'DevOps & Cloud', items: 'Docker, AWS (EC2/S3), Jenkins, GitHub Actions, Nginx, Linux, Vercel, Terraform' },
    { label: 'Databases', items: 'PostgreSQL, MongoDB, Redis, Supabase, ChromaDB, PostGIS, pgvector, SQLite' },
    { label: 'Languages', items: 'Python, TypeScript, JavaScript, C++, SQL, Bash, HTML/CSS' },
  ],
  certifications: [
    'Deep Learning Specialization — DeepLearning.AI (Andrew Ng) · 2024',
    'AWS Cloud Practitioner Essentials — Amazon Web Services · 2024',
    'Full-Stack Open — University of Helsinki · 2023',
    'CS50x — Harvard University (edX) · 2023',
  ],
};

export default function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-4 md:p-8" id="resume-viewer-overlay">
        {/* Backdrop */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-0" />

        {/* Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 32 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="relative w-full max-w-4xl rounded-2xl shadow-2xl shadow-black/20 z-10 overflow-hidden"
        >
          {/* Toolbar */}
          <div className="bg-[#09090b] px-6 py-4 flex justify-between items-center print:hidden border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs text-white/60 uppercase tracking-widest">Resume · Anshuman Mishra</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary text-white rounded-lg font-mono text-xs hover:bg-primary-container transition-colors"
                id="print-resume-btn">
                <Printer className="w-3.5 h-3.5" /> Print / Save PDF
              </button>
              <button onClick={onClose}
                className="p-1.5 text-white/50 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                id="close-resume-btn">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Paper */}
          <div className="bg-white overflow-y-auto max-h-[85vh] print:max-h-none">
            <div className="p-8 md:p-12 max-w-4xl mx-auto font-sans">

              {/* Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 pb-7 mb-7 border-b-2 border-on-surface">
                <div>
                  <h1 className="font-display font-bold text-4xl md:text-5xl text-on-surface tracking-tight mb-1">{RESUME.name}</h1>
                  <p className="font-mono text-xs text-primary font-semibold uppercase tracking-[0.15em] mt-1.5">{RESUME.title}</p>
                </div>
                <div className="flex flex-col gap-2 text-xs font-mono text-secondary min-w-[200px]">
                  <a href={`mailto:${RESUME.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" /> {RESUME.email}
                  </a>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" /> {RESUME.location}
                  </div>
                  <a href={`https://${RESUME.github}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Github className="w-3.5 h-3.5 text-primary flex-shrink-0" /> {RESUME.github}
                  </a>
                  <a href={`https://${RESUME.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Globe className="w-3.5 h-3.5 text-primary flex-shrink-0" /> {RESUME.linkedin}
                  </a>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-8">
                <SectionHead icon={<Award className="w-4 h-4" />} label="Professional Summary" />
                <p className="font-sans text-sm text-on-surface-variant leading-[1.75]">{RESUME.summary}</p>
              </div>

              {/* Experience */}
              <div className="mb-8">
                <SectionHead icon={<Briefcase className="w-4 h-4" />} label="Professional Experience" />
                <div className="flex flex-col gap-6">
                  {RESUME.experience.map((exp, i) => (
                    <div key={i} className="border-l-2 border-primary/20 pl-5 relative">
                      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary" />
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                        <div>
                          <h4 className="font-display font-bold text-sm text-on-surface">{exp.title}</h4>
                          <p className="font-sans text-sm text-primary font-medium">{exp.company}</p>
                          <p className="font-mono text-[10px] text-secondary mt-0.5">{exp.type}</p>
                        </div>
                        <span className="font-mono text-xs text-secondary flex-shrink-0">{exp.period}</span>
                      </div>
                      <ul className="flex flex-col gap-1.5 mt-2">
                        {exp.points.map((pt, j) => (
                          <li key={j} className="flex gap-2 text-xs text-on-surface-variant leading-relaxed">
                            <span className="text-primary font-bold mt-0.5 flex-shrink-0">▸</span> {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="mb-8">
                <SectionHead icon={<GraduationCap className="w-4 h-4" />} label="Education" />
                {RESUME.education.map((edu, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <h4 className="font-display font-bold text-sm text-on-surface">{edu.degree}</h4>
                      <p className="font-sans text-sm text-primary font-medium">{edu.institution}</p>
                      <p className="font-mono text-xs text-on-surface font-semibold mt-1">{edu.detail}</p>
                      <p className="font-sans text-xs text-secondary mt-1">Core courses: {edu.courses}</p>
                    </div>
                    <span className="font-mono text-xs text-secondary flex-shrink-0">{edu.period}</span>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div className="mb-8">
                <SectionHead icon={<Code2 className="w-4 h-4" />} label="Key Projects" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {RESUME.projects.map((p, i) => (
                    <div key={i} className="p-4 rounded-xl border border-surface-container bg-surface-container-low/50">
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-display font-bold text-sm text-on-surface">{p.name}</h5>
                        <span className="font-mono text-[10px] text-secondary">{p.year}</span>
                      </div>
                      <p className="font-mono text-[10px] text-primary mb-1.5">{p.stack}</p>
                      <p className="font-sans text-xs text-on-surface-variant leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <SectionHead icon={<Code2 className="w-4 h-4" />} label="Technical Skills" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {RESUME.skills.map((s, i) => (
                    <div key={i}>
                      <p className="font-mono text-[10px] text-secondary uppercase tracking-widest mb-1 font-semibold">{s.label}</p>
                      <p className="font-sans text-xs text-on-surface leading-relaxed">{s.items}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <SectionHead icon={<Award className="w-4 h-4" />} label="Certifications" />
                <ul className="flex flex-col gap-1.5">
                  {RESUME.certifications.map((c, i) => (
                    <li key={i} className="flex gap-2 text-xs text-on-surface-variant font-sans">
                      <span className="text-primary flex-shrink-0">✓</span> {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Print footer */}
              <div className="hidden print:block text-center text-[10px] text-secondary font-mono mt-10 pt-4 border-t border-surface-container">
                anshumanvatsa.github.io/portfolio · atulvatsamishra@gmail.com
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function SectionHead({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-surface-container">
      <span className="text-primary">{icon}</span>
      <h3 className="font-display font-bold text-xs text-on-surface uppercase tracking-[0.12em]">{label}</h3>
    </div>
  );
}
