import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Layers, Trophy, AlertCircle, ArrowRight, BarChart3 } from 'lucide-react';
import { Project } from '../data';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

// Animated metric counter
function AnimatedMetric({ value }: { value: string }) {
  const [displayed, setDisplayed] = useState('0');
  
  useEffect(() => {
    // Extract numeric part
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ''));
    const suffix = value.replace(/[0-9.]/g, '');
    
    if (isNaN(numeric)) {
      setDisplayed(value);
      return;
    }

    let start = 0;
    const duration = 900;
    const steps = 40;
    const increment = numeric / steps;
    const stepDuration = duration / steps;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= numeric) {
        setDisplayed(value);
        clearInterval(timer);
      } else {
        const rounded = numeric < 1 ? start.toFixed(2) : Math.floor(start).toString();
        setDisplayed(rounded + suffix);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  return <>{displayed}</>;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!project) return null;

  const categoryColor = project.category === 'ml'
    ? 'bg-violet-50 text-violet-700 border-violet-200'
    : project.category === 'fullstack'
      ? 'bg-blue-50 text-blue-700 border-blue-200'
      : 'bg-amber-50 text-amber-700 border-amber-200';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden" id="case-study-overlay">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Panel */}
        <div className="absolute inset-y-0 right-0 max-w-full flex">
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-screen max-w-2xl bg-white h-full shadow-2xl flex flex-col overflow-y-auto"
            id={`case-study-${project.id}`}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-surface-container py-5 px-8 flex justify-between items-center z-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider font-semibold ${categoryColor}`}>
                    {project.category === 'ml' ? 'ML / AI' : project.category === 'fullstack' ? 'Full-Stack' : 'DevOps'}
                  </span>
                  <p className="font-mono text-xs text-secondary font-medium tracking-widest uppercase">
                    Case Study · {project.number}
                  </p>
                </div>
                <h2 className="font-serif text-3xl text-on-surface">{project.title}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 text-secondary hover:text-on-surface rounded-xl hover:bg-surface-container transition-colors"
                id="close-case-study-btn"
                aria-label="Close case study"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 flex-1 flex flex-col gap-8">

              {/* Description */}
              <p className="font-sans text-base text-on-surface-variant leading-relaxed">
                {project.description}
              </p>

              {/* Animated Metrics */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <h4 className="font-mono text-xs text-secondary uppercase tracking-widest font-bold">Performance Metrics</h4>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {project.metrics.map((metric, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.12, type: 'spring', stiffness: 300 }}
                      className="text-center p-4 bg-gradient-to-br from-surface-container-low to-white rounded-xl border border-surface-container hover:border-primary/20 transition-colors"
                    >
                      <p className="font-mono text-[10px] text-secondary uppercase tracking-wider mb-1">
                        {metric.label}
                      </p>
                      <p className="font-serif text-2xl md:text-3xl stats-number font-normal">
                        <AnimatedMetric value={metric.value} />
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="font-serif text-lg text-on-surface mb-3 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" /> Core Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.fullTags.map((tag, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      className="px-3 py-1.5 bg-surface-container-low text-on-surface-variant rounded-lg text-xs font-mono border border-surface-container hover:border-primary/30 hover:text-primary transition-all"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Challenges */}
              <div>
                <h4 className="font-serif text-lg text-on-surface mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" /> Engineering Challenges
                </h4>
                <ul className="flex flex-col gap-3">
                  {project.challenges.map((challenge, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + idx * 0.08 }}
                      className="flex gap-3 items-start text-sm text-on-surface-variant leading-relaxed"
                    >
                      <span className="font-mono text-xs text-amber-500 mt-0.5 font-bold flex-shrink-0">0{idx + 1}.</span>
                      <span>{challenge}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="font-serif text-lg text-on-surface mb-3 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-emerald-500" /> Key Milestones & Outcomes
                </h4>
                <ul className="flex flex-col gap-3">
                  {project.achievements.map((achievement, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.08 }}
                      className="flex gap-3 items-start text-sm text-on-surface-variant leading-relaxed"
                    >
                      <ArrowRight className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Architecture */}
              <div className="bg-on-surface rounded-xl p-5">
                <h4 className="font-mono text-[10px] text-white/50 uppercase tracking-widest mb-3">
                  System Architecture
                </h4>
                <p className="font-mono text-xs text-emerald-400 leading-loose">
                  {project.architecture}
                </p>
              </div>

            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-surface-container p-5 px-8 flex justify-end gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-outline-variant text-secondary hover:text-on-surface hover:border-on-surface rounded-xl text-xs font-mono transition-all"
                >
                  <Github className="w-4 h-4" /> Codebase
                </a>
              )}
              <a
                href={project.liveUrl}
                className="btn-primary-glow inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-mono font-semibold"
              >
                Interactive Demo <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
