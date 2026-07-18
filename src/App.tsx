import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  Send, CheckCircle, MessageSquareText, Download,
  ExternalLink, Github, Award, ArrowUpRight,
  Zap, Cpu, Globe, Layers, Mail, MapPin, X,
  Star, BookOpen, Code2, Sparkles, ChevronRight,
} from 'lucide-react';
import { PROJECTS, TIMELINE, SKILL_CATEGORIES, CERTIFICATIONS, ACHIEVEMENTS, Project } from './data';
import CaseStudyModal from './components/CaseStudyModal';
import ResumeViewer from './components/ResumeViewer';
import MlPlayground from './components/MlPlayground';

interface Message {
  name: string; email: string; company: string;
  message: string; timestamp: string;
}

const STATS = [
  { label: 'GitHub Projects', value: '20+', icon: Zap, color: '#6c47ff' },
  { label: 'Backend Endpoints', value: '6+', icon: Cpu, color: '#a855f7' },
  { label: 'CGPA', value: '8.83', icon: Award, color: '#06b6d4' },
  { label: 'Technologies', value: '20+', icon: Layers, color: '#f59e0b' },
];

const PHRASES = ['ML Engineer.', 'Full-Stack Dev.', 'AI Researcher.', 'DevOps Engineer.', 'Open Source Builder.'];

// Animated number counter
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 40;
    const dur = 1200;
    const inc = target / steps;
    const t = setInterval(() => {
      start += inc;
      if (start >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(start));
    }, dur / steps);
    return () => clearInterval(t);
  }, [inView, target]);

  return <span ref={ref}>{target < 1 ? target.toFixed(2) : count}{suffix}</span>;
}

// Stagger container variants
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 24 } },
};

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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSection, setActiveSection] = useState('');
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Typewriter
  const [typed, setTyped] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('anshuman_inquiries');
    if (stored) {
      try { setMessages(JSON.parse(stored)); }
      catch { /* ignore */ }
    } else {
      const seed: Message[] = [
        { name: 'Sarah Jenkins', email: 'sarah@helix.io', company: 'Helix Solutions', message: "Your CarePredictAI system looks incredible. Let's set up a call!", timestamp: 'Jun 26, 2026, 10:42 AM' },
        { name: 'Prof. David K.', email: 'd.k@vit.edu', company: 'AI Research Lab', message: 'The CascadeIQ TGN research is fascinating. Keep me posted on the IEEE submission.', timestamp: 'Jun 28, 2026, 2:15 PM' },
      ];
      localStorage.setItem('anshuman_inquiries', JSON.stringify(seed));
      setMessages(seed);
    }
  }, []);

  // Typewriter effect
  useEffect(() => {
    const phrase = PHRASES[phraseIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting) {
      if (charIdx < phrase.length) {
        t = setTimeout(() => { setTyped(phrase.slice(0, charIdx + 1)); setCharIdx(i => i + 1); }, 75);
      } else {
        t = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (charIdx > 0) {
        t = setTimeout(() => { setTyped(phrase.slice(0, charIdx - 1)); setCharIdx(i => i - 1); }, 40);
      } else {
        setDeleting(false);
        setPhraseIdx(i => (i + 1) % PHRASES.length);
      }
    }
    return () => clearTimeout(t);
  }, [typed, charIdx, deleting, phraseIdx]);

  // Scroll spy
  useEffect(() => {
    const onScroll = () => {
      setNavScrolled(window.scrollY > 40);
      ['work', 'lab', 'about', 'contact'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 100 && bottom >= 100) setActiveSection(id);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    const msg: Message = {
      name, email, company: company || 'Independent',
      message, timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }),
    };
    const updated = [msg, ...messages];
    setMessages(updated);
    localStorage.setItem('anshuman_inquiries', JSON.stringify(updated));
    setName(''); setEmail(''); setCompany(''); setMessage('');
    setIsSubmitSuccess(true);
    setTimeout(() => setIsSubmitSuccess(false), 4500);
  };

  const filtered = PROJECTS.filter(p => selectedCategory === 'all' || p.category === selectedCategory);

  const catCounts = {
    all: PROJECTS.length,
    ml: PROJECTS.filter(p => p.category === 'ml').length,
    fullstack: PROJECTS.filter(p => p.category === 'fullstack').length,
    devops: PROJECTS.filter(p => p.category === 'devops').length,
  };

  const statusBadge = (s: string) => {
    if (s === 'live') return <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 uppercase tracking-wider">Live</span>;
    if (s === 'research') return <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200 uppercase tracking-wider">Research</span>;
    return <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200 uppercase tracking-wider">Open Source</span>;
  };

  return (
    <div className="font-sans min-h-screen bg-white text-on-surface antialiased flex flex-col">
      {/* Top accent */}
      <div className="h-[3px] accent-line flex-shrink-0 w-full" />

      {/* ═══ NAV ═══ */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${navScrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-surface-container' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex justify-between items-center h-16">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-md shadow-primary/20">
              <span className="font-display text-white text-[11px] font-bold">A</span>
            </div>
            <span className="font-display font-semibold text-on-surface text-[15px] tracking-tight">Anshuman</span>
          </motion.button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {[{ label: 'Work', id: 'work' }, { label: 'AI Lab', id: 'lab' }, { label: 'About', id: 'about' }, { label: 'Contact', id: 'contact' }].map(link => (
              <a key={link.id} href={`#${link.id}`}
                className={`font-display text-xs font-medium tracking-wide transition-all duration-200 ${activeSection === link.id ? 'text-primary' : 'text-secondary hover:text-on-surface'}`}>
                {link.label}
              </a>
            ))}
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
              onClick={() => setIsResumeOpen(true)}
              className="btn-glow flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-lg font-display text-xs font-semibold"
              id="nav-resume-btn"
            >
              <Download className="w-3.5 h-3.5" /> Resume
            </motion.button>
          </nav>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <div className={`w-5 h-0.5 bg-on-surface transition-all mb-1 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 bg-on-surface transition-all mb-1 ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-on-surface transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-white border-b border-surface-container px-5 pb-4 flex flex-col gap-3">
              {[{ label: 'Work', id: 'work' }, { label: 'AI Lab', id: 'lab' }, { label: 'About', id: 'about' }, { label: 'Contact', id: 'contact' }].map(l => (
                <a key={l.id} href={`#${l.id}`} onClick={() => setMenuOpen(false)}
                  className="font-display text-sm text-on-surface font-medium py-1.5 border-b border-surface-container last:border-0">{l.label}</a>
              ))}
              <button onClick={() => { setIsResumeOpen(true); setMenuOpen(false); }}
                className="btn-glow bg-primary text-white py-2.5 rounded-lg font-display text-sm font-semibold">
                Download Resume
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-7xl mx-auto px-5 md:px-10 flex-1 w-full">

        {/* ═══ HERO ═══ */}
        <section className="hero-mesh py-20 md:py-36 flex flex-col md:flex-row md:items-center md:justify-between gap-14 divider relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/10 to-accent/5 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-purple-400/5 blur-3xl" />

          <div className="flex flex-col gap-7 max-w-2xl relative z-10">
            {/* Status pill */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="w-fit flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-medium">
              <span className="pulse-dot w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Open to Opportunities · Internships & Full-time
            </motion.div>

            {/* Name */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
              <h1 className="font-display font-bold text-5xl md:text-[72px] leading-[1.05] tracking-tight mb-1">
                {'Anshuman.'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    className="gradient-text inline-block"
                    initial={{ opacity: 0, y: 20, rotateX: -40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.25 + i * 0.045, type: 'spring', stiffness: 280, damping: 18 }}
                  >{char === '.' ? char : char}</motion.span>
                ))}
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              className="flex items-center gap-2 h-7">
              <span className="font-display text-xl md:text-2xl text-secondary font-normal">{typed}</span>
              <span className="cursor-blink inline-block w-[2px] h-6 bg-primary" />
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="font-sans text-base md:text-[17px] text-on-surface-variant leading-relaxed max-w-xl">
              Final-year CS student at VIT Chennai, currently an <strong className="text-on-surface font-semibold">ML Intern at Deuglo</strong> building AI-driven product features. Experienced across machine learning, full-stack development, and cloud deployment through{' '}
              <strong className="text-on-surface font-semibold">20+ projects on GitHub</strong>.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-3 mt-1">
              <motion.a href="#work" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                className="btn-glow inline-flex items-center gap-2 bg-primary text-white px-6 py-3.5 rounded-xl font-display font-semibold text-sm"
                id="hero-work-btn">
                View My Work <ArrowUpRight className="w-4 h-4" />
              </motion.a>
              <motion.button onClick={() => setIsResumeOpen(true)} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 border border-on-surface/15 text-on-surface bg-white px-6 py-3.5 rounded-xl font-display font-semibold text-sm transition-all hover:border-primary/50 hover:text-primary"
                id="hero-resume-btn">
                <Download className="w-4 h-4 text-primary" /> Resume
              </motion.button>
            </motion.div>

            {/* Social links */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
              className="flex flex-wrap gap-5 font-mono text-xs text-secondary">
              <a href="https://github.com/anshumanvatsa" target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Github className="w-3.5 h-3.5" /> github.com/anshumanvatsa
              </a>
              <span>·</span>
              <a href="https://linkedin.com/in/anshuman-vatsa-mishra" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> linkedin.com/in/anshuman-vatsa-mishra
              </a>
              <span>·</span>
              <a href="mailto:atulvatsamishra@gmail.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Mail className="w-3.5 h-3.5" /> atulvatsamishra@gmail.com
              </a>
              <span>·</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Chennai, IN</span>
            </motion.div>
          </div>

          {/* Avatar */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 150 }}
            className="hidden md:flex items-center justify-center relative">
            <div className="float-anim relative">
              <div className="glow-ring w-44 h-44 rounded-full bg-gradient-to-br from-[#0f0e17] to-[#1e1b30] border border-primary/40 flex items-center justify-center shadow-2xl shadow-primary/20">
                <span className="font-display font-bold text-6xl text-white tracking-wider">A</span>
              </div>
              {/* Orbit rings */}
              <svg className="absolute inset-0 w-full h-full orbit-1" viewBox="0 0 176 176">
                <ellipse cx="88" cy="88" rx="82" ry="42" fill="none" stroke="rgba(108,71,255,0.2)" strokeWidth="1.5" strokeDasharray="6 4" />
              </svg>
              <svg className="absolute inset-0 w-full h-full orbit-2" viewBox="0 0 176 176">
                <ellipse cx="88" cy="88" rx="72" ry="32" fill="none" stroke="rgba(168,85,247,0.15)" strokeWidth="1" transform="rotate(45 88 88)" />
              </svg>
            </div>
          </motion.div>
        </section>

        {/* ═══ STATS BAR ═══ */}
        <section className="py-8 divider">
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} variants={item}
                  className="lift flex flex-col gap-1.5 p-5 rounded-2xl border border-surface-container bg-white hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                      <Icon className="w-4 h-4" style={{ color: stat.color }} />
                    </div>
                    <span className="font-mono text-[10px] text-secondary uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <span className="font-display font-bold text-3xl stat-num">{stat.value}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* ═══ SELECTED WORK ═══ */}
        <section className="py-20" id="work">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div>
              <p className="font-mono text-xs text-primary font-semibold uppercase tracking-widest mb-2">Portfolio</p>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-on-surface">Selected Work</h2>
              <p className="font-mono text-xs text-secondary uppercase tracking-wider mt-2">2023 — Present · 20+ Projects</p>
            </div>
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-surface-container rounded-xl border border-surface-container-high">
              {[
                { label: 'All', id: 'all' },
                { label: 'ML / AI', id: 'ml' },
                { label: 'Full-Stack', id: 'fullstack' },
                { label: 'DevOps', id: 'devops' },
              ].map(tab => (
                <button key={tab.id} onClick={() => setSelectedCategory(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-display text-xs font-medium transition-all duration-200 ${selectedCategory === tab.id ? 'bg-white text-primary shadow-sm border border-primary/10' : 'text-secondary hover:text-on-surface'}`}>
                  {tab.label}
                  <span className={`min-w-[18px] text-center text-[10px] font-bold px-1.5 py-0.5 rounded-full ${selectedCategory === tab.id ? 'bg-primary/10 text-primary' : 'bg-surface-container-high text-secondary'}`}>
                    {catCounts[tab.id as keyof typeof catCounts]}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Project list */}
          <div className="flex flex-col border-t border-surface-container">
            <AnimatePresence mode="popLayout">
              {filtered.map((proj, idx) => {
                const isHighlighted = highlightedTech
                  ? proj.fullTags.some(t => t.toLowerCase().includes(highlightedTech.toLowerCase()))
                  : false;
                return (
                  <motion.article key={proj.id} layout
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }} transition={{ delay: idx * 0.06 }}
                    onClick={() => setSelectedProject(proj)}
                    className={`proj-card group py-9 border-b border-surface-container cursor-pointer px-4 rounded-xl my-1 ${isHighlighted ? 'highlighted' : ''}`}
                    id={`project-${proj.id}`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                      {/* Number */}
                      <div className="md:col-span-1 font-mono text-secondary/60 text-sm font-semibold pt-1">{proj.number}</div>

                      {/* Title + badges */}
                      <div className="md:col-span-4">
                        <div className="flex items-start gap-2 flex-wrap mb-2">
                          <h3 className="font-display font-bold text-2xl md:text-3xl text-on-surface group-hover:text-primary transition-colors duration-200 flex items-center gap-2">
                            {proj.title}
                            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-primary flex-shrink-0" />
                          </h3>
                        </div>
                        <p className="font-sans text-xs text-secondary mb-2">{proj.subtitle}</p>
                        <div className="flex flex-wrap gap-1.5 items-center">
                          {statusBadge(proj.status)}
                          <span className="font-mono text-[10px] text-secondary">· {proj.year}</span>
                        </div>
                        {/* Mobile tags */}
                        <div className="flex flex-wrap gap-1.5 mt-3 md:hidden">
                          {proj.tags.map(t => (
                            <span key={t} className="tag-pill px-2 py-0.5 bg-surface-container text-secondary rounded-md text-[10px] font-mono border border-surface-container-high">{t}</span>
                          ))}
                        </div>
                      </div>

                      {/* Preview image (if any) */}
                      {proj.previewImage && (
                        <div className="md:col-span-12 -mx-1 -mt-1 mb-3 rounded-xl overflow-hidden border border-surface-container-high bg-[#0a0a12] aspect-[21/9]">
                          <img
                            src={`${import.meta.env.BASE_URL}${proj.previewImage.slice(1)}`}
                            alt={`${proj.title} preview`}
                            className="w-full h-full object-cover object-center"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        </div>
                      )}
                      {/* Description + metrics + tags */}
                      <div className="md:col-span-5">
                        <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-4">{proj.shortDesc}</p>
                        {/* Metrics */}
                        <div className="hidden md:flex items-center gap-6 mb-4">
                          {proj.metrics.slice(0, 3).map(m => (
                            <div key={m.label} className="flex flex-col gap-0.5">
                              <span className="font-mono text-[10px] text-secondary/70 uppercase tracking-wider">{m.label}</span>
                              <span className="font-display font-bold text-sm text-primary">{m.value}</span>
                            </div>
                          ))}
                        </div>
                        {/* Tags desktop */}
                        <div className="hidden md:flex flex-wrap gap-1.5">
                          {proj.fullTags.map(t => {
                            const active = highlightedTech && t.toLowerCase().includes(highlightedTech.toLowerCase());
                            return (
                              <span key={t} className={`tag-pill px-2 py-0.5 rounded-md text-[10px] font-mono border transition-all ${active ? 'active' : 'bg-surface-container text-secondary border-surface-container-high'}`}>{t}</span>
                            );
                          })}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="md:col-span-2 flex md:justify-end pt-1">
                        <span className="inline-flex items-center gap-1 text-xs font-display font-semibold text-primary border-b-2 border-primary pb-0.5 group-hover:gap-2 transition-all">
                          Case Study <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* ═══ ML LAB ═══ */}
        <section className="py-20 border-t border-surface-container reveal" id="lab">
          <MlPlayground />
        </section>

        {/* ═══ ACTIVE RESEARCH ═══ */}
        <section className="py-20 border-t border-surface-container reveal">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-12">
            <p className="font-mono text-xs text-primary font-semibold uppercase tracking-widest mb-2">Status</p>
            <h2 className="font-display font-bold text-4xl text-on-surface">Active Research & Deployments</h2>
          </motion.div>
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={item} className="lift p-7 rounded-2xl bg-gradient-to-br from-violet-50 to-white border border-violet-100 relative overflow-hidden">
              <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-primary/5 blur-xl" />
              <div className="mb-4 flex items-center gap-2">
                <span className="pulse-dot w-2 h-2 rounded-full bg-primary inline-block" />
                <span className="font-mono text-[10px] text-primary uppercase tracking-widest font-semibold">Active · May 2026 – Present</span>
              </div>
              <h3 className="font-display font-bold text-xl text-on-surface mb-2">Post-Performance Prediction Model — Deuglo</h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-5">
                Built a post-performance prediction model for DG-Social via data enrichment, labeling, and trend-based forecasting. Shipped AI content tools (captions, hashtags, cross-platform adaptation) across 6 new backend endpoints.
              </p>
              <div className="flex gap-2">
                {['PyTorch', 'XGBoost', 'FastAPI', 'DG-Social'].map(t => (
                  <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-lg bg-violet-100/60 text-violet-700 border border-violet-200/60">{t}</span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={item} className="lift p-7 rounded-2xl bg-gradient-to-br from-surface-container-low to-white border border-surface-container relative overflow-hidden">
              <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-amber-400/5 blur-xl" />
              <div className="mb-4 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-mono text-[10px] text-secondary uppercase tracking-widest font-semibold">Mar 2024 – Mar 2026</span>
              </div>
              <h3 className="font-display font-bold text-xl text-on-surface mb-2">Propulsion Engineer — Special Team-Ignition</h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-5">
                Validated CFD models against experimental data for nozzle flow and combustion accuracy. Used OpenRocket/OpenMotor for motor design, trajectory, and thrust optimization.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {['OpenRocket', 'OpenMotor', 'CFD', 'ANSYS'].map(t => (
                    <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-lg bg-surface-container text-secondary border border-surface-container-high">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ ACHIEVEMENTS ═══ */}
        <section className="py-16 border-t border-surface-container reveal">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-xs text-primary font-semibold uppercase tracking-widest mb-2">Recognition</p>
            <h2 className="font-display font-bold text-3xl text-on-surface">Highlights & Achievements</h2>
          </motion.div>
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACHIEVEMENTS.map(a => (
              <motion.div key={a.id} variants={item}
                className="lift p-5 rounded-2xl border border-surface-container bg-white hover:border-primary/20 group">
                <div className="text-2xl mb-3">{a.icon}</div>
                <h4 className="font-display font-semibold text-sm text-on-surface mb-1 group-hover:text-primary transition-colors">{a.title}</h4>
                <p className="font-sans text-xs text-secondary leading-relaxed mb-2">{a.body}</p>
                <span className="font-mono text-[10px] text-secondary/60">{a.year}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ═══ EXPERIENCE + SKILLS ═══ */}
        <section className="py-20 grid grid-cols-1 lg:grid-cols-12 gap-14 border-t border-surface-container reveal" id="about">
          {/* Timeline */}
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="font-mono text-xs text-primary font-semibold uppercase tracking-widest mb-2">Background</p>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-on-surface mb-10">Experience & Education</h2>
            </motion.div>
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="flex flex-col gap-8 border-l-2 border-surface-container pl-8 relative">
              {TIMELINE.map((t, i) => (
                <motion.div key={t.id} variants={item} className="relative group">
                  <div className={`absolute -left-[37px] top-1.5 w-3 h-3 rounded-full border-2 border-white transition-all group-hover:scale-125 ${i === 0 ? 'bg-primary shadow-md shadow-primary/30' : 'bg-surface-dim'}`} />
                  <div className="font-mono text-[10px] text-secondary uppercase tracking-wider mb-1">{t.period}</div>
                  <h4 className="font-display font-bold text-base text-on-surface group-hover:text-primary transition-colors">{t.role}</h4>
                  <p className="font-sans text-sm text-primary font-medium mb-2">{t.organization}</p>
                  <ul className="flex flex-col gap-1.5">
                    {t.details.map((d, di) => (
                      <li key={di} className="flex gap-2 text-xs text-on-surface-variant leading-relaxed font-sans">
                        <ChevronRight className="w-3.5 h-3.5 text-primary/40 mt-0.5 flex-shrink-0" /> {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            {/* Certifications */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="mt-12">
              <h3 className="font-display font-semibold text-lg text-on-surface mb-5 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" /> Certifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CERTIFICATIONS.map(c => (
                  <div key={c.id} className="lift flex items-start gap-3 p-4 rounded-xl border border-surface-container bg-white hover:border-primary/20">
                    <span className="text-xl flex-shrink-0">{c.badge}</span>
                    <div>
                      <p className="font-display font-semibold text-xs text-on-surface">{c.name}</p>
                      <p className="font-sans text-[11px] text-secondary mt-0.5">{c.issuer}</p>
                      <span className="font-mono text-[10px] text-secondary/60">{c.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Skills panel */}
          <div className="lg:col-span-5">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="glass rounded-2xl p-6 md:p-8 border border-surface-container sticky top-24">
              <div className="mb-6">
                <h3 className="font-display font-bold text-2xl text-on-surface">Technical Stack</h3>
                <p className="font-sans text-xs text-secondary mt-1">Hover a category to cross-reference projects above.</p>
              </div>
              <div className="flex flex-col gap-1">
                {SKILL_CATEGORIES.map(cat => (
                  <div key={cat.id}
                    onMouseEnter={() => setHighlightedTech(cat.category)}
                    onMouseLeave={() => setHighlightedTech(null)}
                    className="skill-row px-3 py-3.5 cursor-help group">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">{cat.icon}</span>
                      <span className="font-mono text-[10px] text-primary uppercase tracking-widest font-bold group-hover:text-primary-container transition-colors">{cat.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.techs.map(tech => (
                        <span key={tech} className="tag-pill px-2 py-0.5 bg-surface-container text-secondary rounded-md text-[10px] font-mono border border-surface-container-high">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-3.5 bg-primary/5 border border-primary/10 rounded-xl text-xs text-secondary font-sans leading-relaxed">
                <strong className="text-primary">✦ Pro tip:</strong> Skills cross-reference the project cards — hover to highlight matching work.
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section className="py-20 border-t border-surface-container reveal" id="contact">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left */}
            <div className="lg:col-span-5">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="font-mono text-xs text-primary font-semibold uppercase tracking-widest mb-3">Get in touch</p>
                <h2 className="font-display font-bold text-5xl md:text-6xl text-on-surface leading-tight mb-6">
                  Let's build<br />something<br /><span className="gradient-text">great.</span>
                </h2>
                <p className="font-sans text-base text-on-surface-variant leading-relaxed mb-8">
                  Open to full-time roles, internships, and research collaborations at the intersection of machine learning and high-scale infrastructure.
                </p>
                <div className="flex flex-col gap-4 mb-8">
                  <a href="mailto:atulvatsamishra@gmail.com"
                    className="flex items-center gap-3 group text-sm font-sans hover:text-primary transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Mail className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-secondary uppercase tracking-wider">Email</p>
                      <p className="font-mono text-xs text-on-surface">atulvatsamishra@gmail.com</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 text-sm font-sans">
                    <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-secondary uppercase tracking-wider">Location</p>
                      <p className="font-mono text-xs text-on-surface">Chennai, India · VIT Student</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-4 border-t border-surface-container">
                  {[
                    { label: 'GitHub', href: 'https://github.com/anshumanvatsa', icon: <Github className="w-4 h-4" /> },
                    { label: 'LinkedIn', href: 'https://linkedin.com/in/anshuman-vatsa-mishra', icon: <ExternalLink className="w-4 h-4" /> },
                  ].map(s => (
                    <motion.a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                      whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-container text-xs font-display font-medium text-secondary hover:text-primary hover:border-primary/30 bg-white transition-all">
                      {s.icon} {s.label}
                    </motion.a>
                  ))}
                  <motion.button whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }}
                    onClick={() => setIsResumeOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-container text-xs font-display font-medium text-secondary hover:text-primary hover:border-primary/30 bg-white transition-all">
                    <Download className="w-4 h-4" /> Resume
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Form card */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="lg:col-span-7 glass rounded-2xl p-7 md:p-9 border border-surface-container">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display font-bold text-sm text-on-surface uppercase tracking-wider">
                  Send a Direct Message
                </h3>
              </div>

              <AnimatePresence mode="wait">
                {showInquiries ? (
                  <motion.div key="logs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-1">
                    <p className="text-xs text-secondary font-sans italic">Simulated secure mailbox:</p>
                    {messages.map((m, i) => (
                      <div key={i} className="p-4 bg-white rounded-xl border border-surface-container text-xs lift flex flex-col gap-2">
                        <div className="flex justify-between items-baseline">
                          <span className="font-display font-bold text-on-surface">{m.name}</span>
                          <span className="font-mono text-[10px] text-secondary">{m.timestamp}</span>
                        </div>
                        <p className="font-mono text-[10px] text-primary">{m.company} · {m.email}</p>
                        <p className="text-on-surface-variant font-sans leading-relaxed italic bg-surface p-3 rounded-lg text-[11px]">"{m.message}"</p>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onSubmit={handleSend} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-sans text-xs text-secondary mb-1.5 font-medium">Name *</label>
                        <input type="text" required value={name} onChange={e => setName(e.target.value)}
                          placeholder="Dr. Jordan Smith"
                          className="field w-full bg-white border border-surface-container rounded-xl px-4 py-3 text-sm font-sans" />
                      </div>
                      <div>
                        <label className="block font-sans text-xs text-secondary mb-1.5 font-medium">Email *</label>
                        <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                          placeholder="jordan@org.com"
                          className="field w-full bg-white border border-surface-container rounded-xl px-4 py-3 text-sm font-sans" />
                      </div>
                    </div>
                    <div>
                      <label className="block font-sans text-xs text-secondary mb-1.5 font-medium">Organization (Optional)</label>
                      <input type="text" value={company} onChange={e => setCompany(e.target.value)}
                        placeholder="Research Institute of Technology"
                        className="field w-full bg-white border border-surface-container rounded-xl px-4 py-3 text-sm font-sans" />
                    </div>
                    <div>
                      <label className="block font-sans text-xs text-secondary mb-1.5 font-medium">Message *</label>
                      <textarea required rows={4} value={message} onChange={e => setMessage(e.target.value)}
                        placeholder="Tell me about your project, collaboration idea, or opportunity..."
                        className="field w-full bg-white border border-surface-container rounded-xl px-4 py-3 text-sm font-sans resize-none" />
                    </div>
                    <AnimatePresence>
                      {isSubmitSuccess && (
                        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className="flex items-center gap-2.5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-sans">
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          Message sent! I'll get back to you soon.
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="btn-glow flex items-center justify-center gap-2 py-3.5 bg-primary text-white rounded-xl font-display font-semibold text-sm"
                      id="submit-btn">
                      <Send className="w-4 h-4" /> Send Message
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[#09090b] text-white mt-auto">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="font-display font-bold text-white text-xs">A</span>
            </div>
            <div>
              <p className="font-display font-semibold text-white text-base">Anshuman</p>
              <p className="font-mono text-[10px] text-white/40 uppercase tracking-wider">ML Engineer · VIT Chennai '27</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs font-mono text-white/40">
            <a href="https://github.com/anshumanvatsa" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <a href="mailto:atulvatsamishra@gmail.com" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> Email
            </a>
          </div>
          <p className="text-xs font-mono text-white/30 text-center">© 2026 Anshuman · Built with React + Vite</p>
        </div>
      </footer>

      {/* Modals */}
      <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <ResumeViewer isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}
