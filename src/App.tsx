import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  CheckCircle, 
  MessageSquareText, 
  Download, 
  ExternalLink,
  Github,
  Award,
  ArrowUpRight,
  Zap,
  Cpu,
  Globe,
  Layers,
  Mail,
  MapPin,
  ChevronDown
} from 'lucide-react';

import { PROJECTS, TIMELINE, SKILL_CATEGORIES, Project } from './data';
import CaseStudyModal from './components/CaseStudyModal';
import ResumeViewer from './components/ResumeViewer';
import MlPlayground from './components/MlPlayground';

interface Message {
  name: string;
  email: string;
  company: string;
  message: string;
  timestamp: string;
}

// Hero stats data
const HERO_STATS = [
  { label: 'Projects Shipped', value: '12+', icon: Zap },
  { label: 'ML Models Deployed', value: '6', icon: Cpu },
  { label: 'CGPA', value: '8.83', icon: Award },
  { label: 'Tech Stack', value: '25+', icon: Layers },
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [showInquiries, setShowInquiries] = useState(false);

  const [highlightedTech, setHighlightedTech] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>('all');

  // Scroll-spy for nav
  const [activeSection, setActiveSection] = useState<string>('');
  const [navScrolled, setNavScrolled] = useState(false);

  // Typewriter state
  const [typewriterText, setTypewriterText] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const typewriterPhrases = [
    'ML Engineer.',
    'Full-Stack Dev.',
    'AI Researcher.',
    'VIT Chennai \'27.',
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Refs for section reveal
  const sectionsRef = useRef<NodeListOf<Element> | null>(null);

  // Load existing inquiries from local storage
  useEffect(() => {
    const stored = localStorage.getItem('anshuman_inquiries');
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    } else {
      const seedMessages: Message[] = [
        {
          name: 'Sarah Jenkins',
          email: 'sarah@helix-solutions.io',
          company: 'Helix Solutions',
          message: 'Excellent portfolio! Your CarePredictAI system could really benefit our clinical analytics pipeline. Let\'s set up a call to discuss collaboration opportunities.',
          timestamp: 'June 26, 2026, 10:42 AM'
        },
        {
          name: 'Professor David K.',
          email: 'd.kaufman@vit.edu',
          company: 'AI Research Lab',
          message: 'Your research on CascadeIQ using Temporal Graph Networks looks very promising. Keep me updated on the IEEE Access paper status.',
          timestamp: 'June 28, 2026, 2:15 PM'
        }
      ];
      localStorage.setItem('anshuman_inquiries', JSON.stringify(seedMessages));
      setMessages(seedMessages);
    }
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentPhrase = typewriterPhrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (typewriterIndex < currentPhrase.length) {
        timeout = setTimeout(() => {
          setTypewriterText(currentPhrase.slice(0, typewriterIndex + 1));
          setTypewriterIndex(i => i + 1);
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (typewriterIndex > 0) {
        timeout = setTimeout(() => {
          setTypewriterText(currentPhrase.slice(0, typewriterIndex - 1));
          setTypewriterIndex(i => i - 1);
        }, 45);
      } else {
        setIsDeleting(false);
        setPhraseIndex(i => (i + 1) % typewriterPhrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [typewriterIndex, isDeleting, phraseIndex]);

  // Scroll-spy & nav scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 30);
      const sections = ['work', 'lab', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection('');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section reveal on scroll
  useEffect(() => {
    const reveals = document.querySelectorAll('.section-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08 }
    );
    reveals.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const newMessage: Message = {
      name,
      email,
      company: company || 'Independent Researcher',
      message,
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    localStorage.setItem('anshuman_inquiries', JSON.stringify(updated));
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setIsSubmitSuccess(true);
    setTimeout(() => setIsSubmitSuccess(false), 4000);
  };

  const filteredProjects = PROJECTS.filter((proj) => {
    if (!selectedCategory || selectedCategory === 'all') return true;
    return proj.category === selectedCategory;
  });

  const categoryIcon = (id: string) => {
    if (id === 'ml') return <Cpu className="w-3 h-3" />;
    if (id === 'fullstack') return <Globe className="w-3 h-3" />;
    if (id === 'devops') return <Layers className="w-3 h-3" />;
    return null;
  };

  return (
    <div className="font-sans min-h-screen bg-white text-on-surface antialiased flex flex-col">
      {/* Animated accent top line */}
      <div className="w-full h-[3px] accent-line flex-shrink-0" />

      {/* ===== HEADER ===== */}
      <header
        className={`sticky top-0 w-full z-40 transition-all duration-300 ${
          navScrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-sm border-b border-surface-container'
            : 'bg-white/60 backdrop-blur-md border-b border-surface-container/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-18 py-4">
          {/* Brand */}
          <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <span className="font-mono text-white text-xs font-bold">AM</span>
            </div>
            <span className="font-serif text-xl tracking-tight font-medium">Anshuman</span>
          </div>

          {/* Nav */}
          <nav className="hidden sm:flex items-center gap-8">
            {[
              { label: 'Selected Work', href: '#work', id: 'work' },
              { label: 'AI Lab', href: '#lab', id: 'lab' },
              { label: 'Contact', href: '#contact', id: 'contact' },
            ].map(link => (
              <a
                key={link.id}
                href={link.href}
                className={`font-mono text-[11px] tracking-widest uppercase font-semibold transition-all duration-200 pb-0.5 ${
                  activeSection === link.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setIsResumeOpen(true)}
              className="btn-primary-glow inline-flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-lg text-[11px] font-mono font-semibold"
              id="nav-resume-btn"
            >
              <Download className="w-3 h-3" /> Resume
            </button>
          </nav>
        </div>
      </header>

      {/* ===== MAIN ===== */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 flex-1 w-full">

        {/* ── SECTION 1: HERO ── */}
        <section className="hero-mesh py-20 md:py-32 flex flex-col md:flex-row md:items-center md:justify-between gap-12 editorial-divider relative overflow-hidden">
          
          {/* Decorative background blobs */}
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

          <div className="flex flex-col gap-6 max-w-2xl relative z-10">
            {/* Status badge */}
            <div className="animate-fade-slide-up inline-flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-medium">
              <span className="pulse-dot w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Open to Opportunities · Internships & Full-time
            </div>

            <div className="animate-fade-slide-up delay-100">
              <h1 className="font-serif text-5xl md:text-7xl text-on-surface mb-3 font-normal leading-tight">
                <span className="italic">Anshuman</span>
                <br />
                <span className="gradient-text font-normal not-italic text-4xl md:text-5xl">Mishra</span>
              </h1>
              <div className="flex items-center gap-2 mt-3">
                <span className="font-mono text-base md:text-lg text-secondary font-normal">
                  {typewriterText}
                </span>
                <span className="inline-block w-0.5 h-5 bg-primary animate-[typewriterBlink_1s_ease-in-out_infinite]" />
              </div>
            </div>

            <p className="animate-fade-slide-up delay-200 font-sans text-base text-on-surface-variant leading-relaxed max-w-xl">
              I build AI-powered products end to end — from training the model to shipping the API to designing the interface. Currently building post-engagement prediction algorithms at <strong className="text-on-surface font-semibold">Deuglo</strong> and researching virality forecasting using <strong className="text-on-surface font-semibold">Temporal Graph Networks</strong>.
            </p>

            {/* CTAs */}
            <div className="animate-fade-slide-up delay-300 flex flex-wrap items-center gap-3 mt-2">
              <a
                href="#work"
                className="btn-primary-glow inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg text-xs font-mono font-semibold gap-2"
                id="hero-view-work-btn"
              >
                View Selected Work <ArrowUpRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsResumeOpen(true)}
                className="inline-flex items-center justify-center border border-on-surface/20 text-on-surface bg-white px-6 py-3 rounded-lg text-xs font-mono font-medium gap-2 transition-all hover:border-primary hover:text-primary hover:-translate-y-0.5 active:translate-y-0"
                id="hero-resume-btn"
              >
                Download Resume <Download className="w-3.5 h-3.5 text-primary" />
              </button>
            </div>

            {/* Social quick links */}
            <div className="animate-fade-slide-up delay-400 flex items-center gap-4 text-xs font-mono text-secondary">
              <a href="https://github.com/anshumanvatsa" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Github className="w-3.5 h-3.5" /> @anshumanvatsa
              </a>
              <span className="text-surface-dim">·</span>
              <a href="mailto:atulvatsamishra@gmail.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Mail className="w-3.5 h-3.5" /> Email
              </a>
              <span className="text-surface-dim">·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Chennai, India
              </span>
            </div>
          </div>

          {/* Avatar */}
          <div className="hidden md:flex flex-col items-center gap-6 relative z-10">
            <div className="float-anim w-40 h-40 rounded-full bg-gradient-to-br from-[#1c1b1b] to-[#2d2b2b] border-2 border-primary flex items-center justify-center select-none shadow-2xl relative">
              <span className="font-serif text-5xl text-white tracking-widest font-normal ml-1">AM</span>
              {/* Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 scale-110" />
              <div className="absolute inset-0 rounded-full border border-primary/15 scale-125" />
            </div>
          </div>
        </section>

        {/* ── HERO STATS BAR ── */}
        <section className="py-8 editorial-divider">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {HERO_STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`section-reveal flex flex-col items-center md:items-start gap-1 p-4 rounded-xl border border-surface-container hover:border-primary/30 transition-all card-lift bg-white`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-center gap-2 text-secondary mb-1">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="font-mono text-[10px] uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <span className="stats-number font-serif text-3xl font-normal">{stat.value}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── SECTION 2: SELECTED WORK ── */}
        <section className="py-20" id="work">
          <div className="section-reveal mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div>
              <h2 className="font-serif text-4xl text-on-surface font-normal">Selected Work</h2>
              <p className="font-mono text-xs text-secondary uppercase tracking-widest mt-2">2023 — PRESENT</p>
            </div>

            {/* Category filter tabs */}
            <div className="flex flex-wrap gap-1.5 bg-surface-container-low p-1 rounded-xl border border-surface-container">
              {[
                { label: 'All', id: 'all', count: PROJECTS.length },
                { label: 'ML / AI', id: 'ml', count: PROJECTS.filter(p => p.category === 'ml').length },
                { label: 'Full-Stack', id: 'fullstack', count: PROJECTS.filter(p => p.category === 'fullstack').length },
                { label: 'DevOps', id: 'devops', count: PROJECTS.filter(p => p.category === 'devops').length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                    selectedCategory === tab.id
                      ? 'bg-white text-primary shadow-sm border border-primary/10'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  {categoryIcon(tab.id)}
                  {tab.label}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                    selectedCategory === tab.id ? 'bg-primary/10 text-primary' : 'bg-surface-container text-secondary'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Project list */}
          <div className="flex flex-col border-t border-surface-container" id="projects-feed">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const isHighlighted = highlightedTech
                  ? project.fullTags.some((tag) => tag.toLowerCase().includes(highlightedTech.toLowerCase()))
                  : false;

                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.07, duration: 0.35 }}
                    onClick={() => setSelectedProject(project)}
                    className={`project-row group editorial-divider py-10 cursor-pointer ${
                      isHighlighted ? 'bg-primary/5 border-l-4 border-l-primary pl-4' : 'hover:bg-surface-container-low/50 pl-0'
                    }`}
                    id={`project-card-${project.id}`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
                      <div className="md:col-span-1 font-mono text-secondary text-sm font-bold">
                        {project.number}
                      </div>

                      <div className="md:col-span-4 flex flex-col gap-2">
                        <h3 className="font-serif text-3xl text-on-surface group-hover:text-primary transition-colors flex items-center gap-2">
                          {project.title}
                          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-primary" />
                        </h3>
                        {/* Category badge */}
                        <span className="w-fit text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/8 text-primary border border-primary/15 uppercase tracking-wider font-semibold">
                          {project.category === 'ml' ? 'ML / AI' : project.category === 'fullstack' ? 'Full-Stack' : project.category === 'devops' ? 'DevOps' : project.category}
                        </span>
                        {/* Mobile tags */}
                        <div className="flex flex-wrap gap-1.5 md:hidden mt-1">
                          {project.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 bg-surface-container rounded text-[10px] font-mono text-secondary">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-5 font-sans text-sm text-on-surface-variant leading-relaxed">
                        {project.shortDesc}
                        {/* Metrics row */}
                        <div className="hidden md:flex items-center gap-4 mt-4">
                          {project.metrics.slice(0, 2).map((m) => (
                            <div key={m.label} className="flex flex-col">
                              <span className="font-mono text-[10px] text-secondary uppercase tracking-wider">{m.label}</span>
                              <span className="font-mono text-sm text-primary font-semibold">{m.value}</span>
                            </div>
                          ))}
                        </div>
                        {/* Desktop full tags */}
                        <div className="hidden md:flex flex-wrap gap-1.5 mt-4">
                          {project.fullTags.map((tag) => {
                            const isSkillFocused = highlightedTech && tag.toLowerCase().includes(highlightedTech.toLowerCase());
                            return (
                              <span
                                key={tag}
                                className={`px-2 py-1 rounded text-[10px] font-mono transition-all border ${
                                  isSkillFocused
                                    ? 'bg-primary text-white border-primary scale-105'
                                    : 'bg-surface-container-low text-secondary border-surface-container hover:border-primary/30'
                                }`}
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <div className="md:col-span-2 flex flex-row md:flex-col md:items-end gap-3 mt-4 md:mt-0">
                        <span className="text-xs font-mono text-primary font-semibold border-b border-primary pb-0.5 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          Case Study <span className="font-serif italic">→</span>
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* ── SECTION 3: ML LAB ── */}
        <section className="py-20 editorial-divider section-reveal" id="lab">
          <MlPlayground />
        </section>

        {/* ── SECTION 4: ACTIVE RESEARCH ── */}
        <section className="py-20 editorial-divider section-reveal">
          <div className="mb-12">
            <h2 className="font-serif text-4xl text-on-surface font-normal">Active Research & Deployments</h2>
            <p className="font-mono text-xs text-secondary uppercase tracking-widest mt-2">In Progress</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {/* Track 1 */}
            <div className="card-lift pl-6 border-l-2 border-primary-container relative bg-white rounded-xl p-6 shadow-sm border border-surface-container">
              <div className="absolute top-6 -left-[5px] w-2.5 h-2.5 rounded-full bg-primary-container border-2 border-white" />
              <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 border border-primary-container text-[9px] font-mono text-primary uppercase tracking-widest rounded-full bg-primary/5 font-semibold">
                <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                ACTIVE DEPLOYMENT
              </div>
              <h3 className="font-sans font-bold text-lg text-on-surface mb-2">
                Post Engagement Prediction Engine
              </h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-4">
                Building predictive ML algorithms at Deuglo to forecast user interaction metrics, publication velocity thresholds, and audience engagement indexes prior to publish times.
              </p>
              <div className="flex gap-2 font-mono text-xs text-secondary font-medium">
                <span className="px-2 py-0.5 bg-surface-container rounded text-[10px]">XGBoost</span>
                <span className="px-2 py-0.5 bg-surface-container rounded text-[10px]">SHAP</span>
                <span className="px-2 py-0.5 bg-surface-container rounded text-[10px]">FastAPI</span>
              </div>
            </div>

            {/* Track 2 */}
            <div className="card-lift pl-6 border-l-2 border-outline-variant relative bg-white rounded-xl p-6 shadow-sm border border-surface-container">
              <div className="absolute top-6 -left-[5px] w-2.5 h-2.5 rounded-full bg-outline-variant border-2 border-white" />
              <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 border border-outline text-[9px] font-mono text-secondary uppercase tracking-widest rounded-full bg-surface-container-low font-semibold">
                <Award className="w-3 h-3" /> RESEARCH LAB
              </div>
              <h3 className="font-sans font-bold text-lg text-on-surface mb-2">
                CascadeIQ (TGN Modeler)
              </h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-4">
                A social media intelligence network tracking virality pathways. Models information cascade propagation structures across dynamic temporal graphs.
              </p>
              <div className="flex justify-between items-center text-xs font-mono text-secondary">
                <span>Target: IEEE Access</span>
                <span className="flex items-center gap-1 text-primary font-semibold">
                  <Award className="w-3.5 h-3.5" /> Paper Drafted
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: EXPERIENCE + SKILLS ── */}
        <section className="py-20 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 editorial-divider">
          {/* Timeline */}
          <div className="lg:col-span-7 section-reveal">
            <h2 className="font-serif text-3xl text-on-surface mb-10 font-normal">Experience & Education</h2>
            <div className="flex flex-col gap-10 border-l border-surface-container pl-8 relative">
              {TIMELINE.map((item, index) => (
                <div key={item.id} className="relative group">
                  <div className={`absolute -left-[37px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white transition-all duration-300 group-hover:scale-125 ${
                    index === 0 ? 'bg-primary' : 'bg-surface-dim'
                  }`} />
                  <div className="text-xs font-mono text-secondary mb-1">{item.period}</div>
                  <h4 className="font-sans font-bold text-base text-on-surface group-hover:text-primary transition-colors">
                    {item.role}
                  </h4>
                  <p className="font-sans text-sm text-primary font-medium">{item.organization}</p>
                  <ul className="list-disc pl-4 mt-2 font-sans text-xs text-on-surface-variant flex flex-col gap-1 leading-relaxed">
                    {item.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Stack */}
          <div className="lg:col-span-5 section-reveal">
            <div className="bg-white glass-card rounded-2xl p-6 md:p-8 sticky top-24">
              <div className="mb-6">
                <h3 className="font-serif text-2xl text-on-surface">Technical Stack</h3>
                <p className="font-sans text-xs text-secondary mt-1">
                  Hover any category to highlight matching projects above.
                </p>
              </div>

              <div className="flex flex-col divide-y divide-surface-container">
                {SKILL_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    onMouseEnter={() => setHighlightedTech(cat.category)}
                    onMouseLeave={() => setHighlightedTech(null)}
                    className="py-4 hover:bg-surface-container-low/50 px-3 rounded-lg transition-all duration-200 cursor-help group"
                  >
                    <div className="font-mono text-[10px] text-primary uppercase tracking-wider mb-2 font-bold group-hover:text-primary-container transition-colors">
                      {cat.category}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.techs.map(tech => (
                        <span
                          key={tech}
                          className="skill-pill px-2 py-0.5 bg-surface-container text-secondary rounded text-[10px] font-mono border border-transparent hover:border-primary/30 hover:text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 bg-primary/5 border border-primary/10 rounded-xl text-[11px] text-secondary font-sans leading-relaxed">
                <strong className="text-primary">✦ Tip:</strong> Categories cross-reference with project cards — hover to see matching work.
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 6: CONTACT ── */}
        <section className="py-20 section-reveal" id="contact">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Info */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <p className="font-mono text-xs text-primary uppercase tracking-widest mb-3 font-semibold">Get in touch</p>
                <h2 className="font-serif text-5xl md:text-6xl text-on-surface font-normal mb-6 leading-tight">
                  Let's build<br />something<br /><span className="gradient-text italic">great.</span>
                </h2>
                <p className="font-sans text-base text-on-surface-variant leading-relaxed mb-8">
                  Open to full-time roles, internships, and research collaborations exploring the intersection of machine learning and high-scale full-stack infrastructure.
                </p>

                {/* Contact details */}
                <div className="flex flex-col gap-3 font-mono text-xs text-on-surface mb-8">
                  <a href="mailto:atulvatsamishra@gmail.com" className="flex items-center gap-3 group hover:text-primary transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Mail className="w-4 h-4 text-secondary group-hover:text-primary" />
                    </div>
                    atulvatsamishra@gmail.com
                  </a>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-secondary" />
                    </div>
                    Chennai, India (VIT Student)
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-surface-container">
                <a
                  href="https://github.com/anshumanvatsa"
                  target="_blank"
                  rel="noreferrer"
                  className="card-lift flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-container text-xs font-mono text-secondary hover:border-primary hover:text-primary transition-all bg-white"
                >
                  <Github className="w-3.5 h-3.5" /> GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="card-lift flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-container text-xs font-mono text-secondary hover:border-primary hover:text-primary transition-all bg-white"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> LinkedIn
                </a>
                <button
                  onClick={() => setIsResumeOpen(true)}
                  className="card-lift flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-container text-xs font-mono text-secondary hover:border-primary hover:text-primary transition-all bg-white"
                >
                  <Download className="w-3.5 h-3.5" /> Resume
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 glass-card rounded-2xl p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-sans font-bold text-sm text-on-surface uppercase tracking-wider">
                  {showInquiries ? 'Visitor Feedback Log' : 'Direct Message Channel'}
                </h3>
                <button
                  onClick={() => setShowInquiries(!showInquiries)}
                  className="text-xs font-mono text-primary hover:underline inline-flex items-center gap-1.5"
                  id="toggle-inbox-btn"
                >
                  <MessageSquareText className="w-3.5 h-3.5" />
                  {showInquiries ? 'Write a message' : `View logs (${messages.length})`}
                </button>
              </div>

              {showInquiries ? (
                <div className="flex flex-col gap-4 max-h-[380px] overflow-y-auto pr-2">
                  <p className="text-xs text-secondary font-sans italic mb-1">Simulated secure sandbox mailbox. Viewing feedback:</p>
                  {messages.length === 0 ? (
                    <div className="text-center py-10 text-xs text-secondary font-mono">
                      No messages yet. Be the first to write!
                    </div>
                  ) : (
                    messages.map((msg, idx) => (
                      <div key={idx} className="p-4 bg-white rounded-xl border border-surface-container text-xs flex flex-col gap-2 card-lift">
                        <div className="flex justify-between items-baseline">
                          <span className="font-bold text-on-surface">{msg.name}</span>
                          <span className="text-[10px] text-secondary font-mono">{msg.timestamp}</span>
                        </div>
                        <p className="font-mono text-[10px] text-primary">{msg.company} · {msg.email}</p>
                        <p className="text-on-surface-variant font-sans leading-relaxed italic bg-surface p-2.5 rounded-lg text-[11px]">
                          "{msg.message}"
                        </p>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-xs text-secondary mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Dr. Jordan"
                        className="w-full bg-white border border-surface-container rounded-lg p-3 text-xs focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs text-secondary mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. jordan@hospital.org"
                        className="w-full bg-white border border-surface-container rounded-lg p-3 text-xs focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs text-secondary mb-1.5">Organization / Company (Optional)</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Research Institute of Technology"
                      className="w-full bg-white border border-surface-container rounded-lg p-3 text-xs focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs text-secondary mb-1.5">Enquiry Details *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message or project collaboration outline here..."
                      className="w-full bg-white border border-surface-container rounded-lg p-3 text-xs focus:outline-none focus:border-primary resize-none transition-colors"
                    />
                  </div>

                  {isSubmitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex gap-2 items-center text-xs font-sans"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Message saved! Toggle "View logs" above to read.</span>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    className="btn-primary-glow inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white text-xs font-mono font-semibold rounded-xl"
                    id="submit-message-form-btn"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Direct Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-on-surface text-white mt-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="font-mono text-white text-xs font-bold">AM</span>
            </div>
            <div>
              <p className="font-serif text-white text-lg">Anshuman Mishra</p>
              <p className="font-mono text-[10px] text-white/40 uppercase tracking-wider">ML Engineer · VIT Chennai</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs font-mono text-white/50">
            <a href="https://github.com/anshumanvatsa" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <a href="mailto:atulvatsamishra@gmail.com" className="hover:text-white transition-colors flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> Email
            </a>
          </div>
          <p className="text-xs font-mono text-white/40 text-center">
            © 2026 Anshuman Mishra · Built with React + Vite
          </p>
        </div>
      </footer>

      {/* Modals */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <ResumeViewer
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
