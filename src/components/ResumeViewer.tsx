import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Mail, MapPin, Globe, Github, Phone, Award, Briefcase, GraduationCap, Code2 } from 'lucide-react';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

// All data verified against actual resume
const RESUME = {
  name: 'ANSHUMAN',
  title: 'Machine Learning Engineer & Full-Stack Developer',
  location: 'Chennai, India',
  email: 'anshumanvatsamishra@gmail.com',
  phone: '+919508601270',
  github: 'github.com/anshumanvatsa',
  linkedin: 'linkedin.com/in/anshuman-vatsa-mishra',
  summary:
    'Final-year CS undergraduate at VIT Chennai, currently an ML Intern at Deuglo building AI-driven product features. Experienced across machine learning, full-stack development, and cloud deployment through production-grade personal projects.',
  skills: [
    { label: 'Programming', items: 'Python, C++, Java, JavaScript, TypeScript' },
    { label: 'AI / ML', items: 'PyTorch, TensorFlow, Scikit-learn, XGBoost, Bi-LSTM, Transformers, LLMs, RAG, Prompt Engineering' },
    { label: 'Full-Stack', items: 'React.js, Next.js 14, Node.js, FastAPI, WebSockets, REST APIs, Tailwind CSS' },
    { label: 'Databases', items: 'PostgreSQL, Redis, Supabase' },
    { label: 'DevOps & Cloud', items: 'Docker, Kubernetes, Jenkins, Git, CI/CD, AWS EC2, Vercel' },
    { label: 'Security', items: 'AES-256-GCM, JWT, RBAC, CSRF Protection' },
    { label: 'Simulation', items: 'ANSYS, OpenRocket, OpenMotor, CFD Analysis' },
  ],
  experience: [
    {
      title: 'ML Intern',
      company: 'Deuglo',
      period: 'May 2026 – Present',
      points: [
        'Built a post-performance prediction model for DG-Social via data enrichment, labeling, and trend-based forecasting.',
        'Shipped AI content tools (captions, hashtags, cross-platform adaptation) across 6 new backend endpoints.',
      ],
    },
    {
      title: 'Propulsion Engineer',
      company: 'Special Team-Ignition',
      period: 'Mar 2024 – Mar 2026',
      points: [
        'Validated CFD models against experimental data for nozzle flow and combustion accuracy.',
        'Used OpenRocket/OpenMotor for motor design, trajectory, and thrust optimization.',
      ],
    },
    {
      title: 'General Secretary',
      company: 'Collegiate Cultural Club · VIT Chennai',
      period: 'Jun 2025 – Jun 2026',
      points: [
        'Planned and executed 15+ large-scale student events end-to-end.',
      ],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Technology — Computer Science and Engineering',
      institution: 'Vellore Institute of Technology (VIT), Chennai',
      period: 'Jul 2023 – Present',
      cgpa: 'CGPA: 8.83 / 10',
    },
  ],
  projects: [
    {
      name: 'CarePredictAI',
      url: 'care-predict-ai.vercel.app',
      stack: 'React, FastAPI, PyTorch LSTM, XGBoost',
      desc: 'Full-stack health risk platform predicting 90-day patient deterioration across 4 conditions; v2 added XGBoost classifiers with risk stratification and explainability dashboard.',
    },
    {
      name: 'CloudPilot',
      url: 'cloudpilot.13.60.57.168.sslip.io',
      stack: 'TypeScript, Python, Docker, AWS EC2',
      desc: 'DevOps monitoring dashboard replicating Vercel/Render functionality; JWT auth, CSRF protection, real-time infrastructure tracking, one-command Docker deployment.',
    },
    {
      name: 'VARUNA',
      url: 'varuna001.vercel.app',
      stack: 'Next.js 14, Leaflet.js, Supabase',
      desc: 'Co-built live ocean hazard reporting platform; owned analytics dashboard and admin panel with Zod + React Hook Form validation.',
    },
  ],
  certifications: [
    { name: 'IBM DevOps Certifications', detail: 'Fundamentals, Agile & Design Thinking, and DevOps Training', year: '2025' },
    { name: 'Machine Learning I (Columbia+)', detail: 'Regression, classification, model evaluation', year: '2025' },
  ],
  achievements: [
    '20+ projects on GitHub (2023 – Present) across ML, full-stack, DevOps, and security.',
    'General Secretary, Collegiate Cultural Club (Jun 2025 – Jun 2026) — Planned & executed 15+ large-scale student events.',
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
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-0"
        />

        {/* Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 32 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="relative w-full max-w-4xl rounded-2xl shadow-2xl shadow-black/30 z-10 overflow-hidden"
        >
          {/* Toolbar */}
          <div className="bg-[#09090b] px-6 py-4 flex justify-between items-center print:hidden">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs text-white/50 uppercase tracking-widest">Resume · Anshuman</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary text-white rounded-lg font-mono text-xs hover:bg-primary-container transition-colors"
                id="print-resume-btn"
              >
                <Printer className="w-3.5 h-3.5" /> Print / Save PDF
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-surface-container/10 transition-colors"
                id="close-resume-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Paper */}
          <div className="bg-surface-container overflow-y-auto max-h-[85vh] print:max-h-none">
            <div className="p-8 md:p-12 max-w-4xl mx-auto font-sans text-[#09090b]">

              {/* ── Header ── */}
              <div className="mb-6 pb-6 border-b-2 border-[#09090b]">
                <h1 className="font-display font-bold text-5xl tracking-tight mb-1">{RESUME.name}</h1>
                <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-xs font-mono text-secondary">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" />{RESUME.location}</span>
                  <a href={`mailto:${RESUME.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors"><Mail className="w-3.5 h-3.5 text-primary" />{RESUME.email}</a>
                  <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-primary" />{RESUME.phone}</span>
                  <a href={`https://${RESUME.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors"><Globe className="w-3.5 h-3.5 text-primary" />{RESUME.linkedin}</a>
                  <a href={`https://${RESUME.github}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors"><Github className="w-3.5 h-3.5 text-primary" />{RESUME.github}</a>
                </div>
              </div>

              {/* ── Profile ── */}
              <div className="mb-7">
                <SectionHead label="PROFILE" />
                <p className="text-sm leading-[1.75] text-on-surface-variant">{RESUME.summary}</p>
              </div>

              {/* ── Skills ── */}
              <div className="mb-7">
                <SectionHead label="SKILLS" />
                <div className="flex flex-col gap-1.5">
                  {RESUME.skills.map((s, i) => (
                    <div key={i} className="flex flex-wrap text-sm leading-relaxed">
                      <span className="font-bold text-on-surface min-w-[130px]">{s.label}:</span>
                      <span className="text-on-surface-variant">{s.items}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Experience ── */}
              <div className="mb-7">
                <SectionHead label="RESEARCH AND EXPERIENCE" />
                <div className="flex flex-col gap-5">
                  {RESUME.experience.map((exp, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-bold text-sm text-on-surface">{exp.title} — {exp.company}</span>
                        <span className="font-mono text-xs text-secondary flex-shrink-0 ml-4">{exp.period}</span>
                      </div>
                      <ul className="flex flex-col gap-1 mt-1">
                        {exp.points.map((pt, j) => (
                          <li key={j} className="flex gap-2 text-xs text-on-surface-variant leading-relaxed">
                            <span className="flex-shrink-0 mt-0.5">•</span> {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Education ── */}
              <div className="mb-7">
                <SectionHead label="EDUCATION" />
                {RESUME.education.map((edu, i) => (
                  <div key={i} className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-sm text-on-surface">{edu.institution}</p>
                      <p className="text-sm text-on-surface-variant mt-0.5">{edu.degree}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="font-mono text-xs text-secondary">{edu.period}</p>
                      <p className="font-mono text-xs text-primary font-semibold mt-0.5">{edu.cgpa}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Projects ── */}
              <div className="mb-7">
                <SectionHead label="PROJECTS" />
                <div className="flex flex-col gap-3">
                  {RESUME.projects.map((p, i) => (
                    <div key={i}>
                      <div className="flex flex-wrap items-baseline gap-x-2 text-sm">
                        <span className="font-bold text-on-surface">{p.name}</span>
                        <span className="text-secondary text-xs">—</span>
                        <a href={`https://${p.url}`} target="_blank" rel="noreferrer" className="font-mono text-xs text-primary hover:underline">{p.url}</a>
                        <span className="text-secondary text-xs">|</span>
                        <span className="text-xs text-secondary">{p.stack}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed mt-0.5">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Certifications & Achievements ── */}
              <div>
                <SectionHead label="CERTIFICATIONS & ACHIEVEMENTS" />
                <div className="flex flex-col gap-2">
                  {RESUME.certifications.map((c, i) => (
                    <div key={i} className="flex flex-wrap items-baseline gap-x-2 text-sm">
                      <span className="font-bold text-on-surface">{c.name}</span>
                      <span className="text-secondary text-xs">—</span>
                      <span className="text-xs text-on-surface-variant">{c.detail}</span>
                      <span className="font-mono text-[10px] text-secondary ml-auto">({c.year})</span>
                    </div>
                  ))}
                  {RESUME.achievements.map((a, i) => (
                    <div key={i} className="text-sm text-on-surface-variant">• {a}</div>
                  ))}
                </div>
              </div>

              {/* Print footer */}
              <div className="hidden print:block text-center text-[10px] text-secondary font-mono mt-10 pt-4 border-t border-surface-container">
                {RESUME.github} · {RESUME.email} · {RESUME.phone}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function SectionHead({ label }: { label: string }) {
  return (
    <div className="mb-3 pb-1.5 border-b border-surface-container-high">
      <h3 className="font-display font-bold text-[11px] text-on-surface uppercase tracking-[0.15em]">{label}</h3>
    </div>
  );
}
