import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, ArrowDownToLine, Phone, Mail, MapPin, Globe } from 'lucide-react';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  if (!isOpen) return null;

  const triggerPrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 md:p-8" id="resume-viewer-overlay">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-0"
        />

        {/* Paper Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-4xl h-[90vh] md:h-auto md:max-h-[92vh] rounded shadow-2xl flex flex-col overflow-hidden z-10 border border-surface-container"
        >
          {/* Action Header */}
          <div className="bg-surface p-4 border-b border-surface-container flex justify-between items-center print:hidden">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              <span className="font-mono text-xs text-secondary font-medium uppercase tracking-wider">
                Resume Document Previewer
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={triggerPrint}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary text-white rounded font-mono text-xs hover:bg-primary-container transition-colors"
                id="print-resume-btn"
              >
                <Printer className="w-3.5 h-3.5" /> Print / Save PDF
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-secondary hover:text-on-surface rounded-full hover:bg-surface-container transition-colors"
                id="close-resume-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Paper */}
          <div className="p-8 md:p-12 overflow-y-auto bg-white flex-1 select-text print:p-0 print:overflow-visible">
            <div className="max-w-3xl mx-auto print:max-w-full">
              {/* Profile Header */}
              <div className="border-b-2 border-on-surface pb-6 mb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                <div>
                  <h1 className="font-serif text-4xl md:text-5xl text-on-surface tracking-tight font-normal">
                    Anshuman Mishra
                  </h1>
                  <p className="font-mono text-xs text-primary font-semibold tracking-widest uppercase mt-2">
                    Machine Learning Engineer · Full-Stack Developer
                  </p>
                </div>
                
                {/* Contact Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 font-mono text-xs text-secondary">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    <a href="mailto:atulvatsamishra@gmail.com" className="hover:underline">atulvatsamishra@gmail.com</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-primary" />
                    <span>github.com/anshuman-mishra</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>Chennai, India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <span>VIT University student</span>
                  </div>
                </div>
              </div>

              {/* Bio Statement */}
              <div className="mb-6">
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  I build AI-powered systems end-to-end—spanning from training custom deep learning and predictive models, to engineering scalable microservices APIs, and designing pixel-perfect, highly intuitive client dashboards. Highly competent in Python, TypeScript, and robust AWS container workflows.
                </p>
              </div>

              {/* Education Grid */}
              <div className="mb-8">
                <h3 className="font-serif text-lg text-on-surface border-b border-surface-container pb-2 mb-3 font-semibold uppercase tracking-wider text-xs">
                  Education
                </h3>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-sans font-bold text-sm text-on-surface">
                      Vellore Institute of Technology (VIT), Chennai
                    </h4>
                    <p className="font-sans text-xs text-on-surface-variant mt-1">
                      B.Tech in Computer Science and Engineering
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs text-secondary block font-bold">2023 — 2027</span>
                    <span className="font-mono text-xs text-primary block mt-1">CGPA: 8.83 / 10</span>
                  </div>
                </div>
              </div>

              {/* Experience List */}
              <div className="mb-8">
                <h3 className="font-serif text-lg text-on-surface border-b border-surface-container pb-2 mb-4 font-semibold uppercase tracking-wider text-xs">
                  Professional Experience
                </h3>
                <div className="flex flex-col gap-6">
                  {/* Job 1 */}
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <div>
                        <span className="font-sans font-bold text-sm text-on-surface">Machine Learning Intern</span>
                        <span className="text-secondary font-mono text-xs mx-2">·</span>
                        <span className="font-sans text-sm text-on-surface-variant">Deuglo</span>
                      </div>
                      <span className="font-mono text-xs text-secondary">2024 — Present</span>
                    </div>
                    <ul className="list-disc pl-5 font-sans text-xs text-on-surface-variant leading-relaxed flex flex-col gap-1.5 mt-2">
                      <li>Designed and deployed post-engagement prediction algorithms using advanced XGBoost pipelines.</li>
                      <li>Engineered explainable feature loops utilizing SHAP values to represent attention weights for non-technical stakeholders.</li>
                      <li>Integrated backend microservices inside FastAPI frameworks to host PyTorch model endpoints with average inference times &lt; 42ms.</li>
                    </ul>
                  </div>

                  {/* Job 2 */}
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <div>
                        <span className="font-sans font-bold text-sm text-on-surface">Propulsion Research Assistant</span>
                        <span className="text-secondary font-mono text-xs mx-2">·</span>
                        <span className="font-sans text-sm text-on-surface-variant">Special Team-Ignition</span>
                      </div>
                      <span className="font-mono text-xs text-secondary">2023 — 2024</span>
                    </div>
                    <ul className="list-disc pl-5 font-sans text-xs text-on-surface-variant leading-relaxed flex flex-col gap-1.5 mt-2">
                      <li>Modeled advanced combustion thermodynamic simulations and automated variable grid evaluations.</li>
                      <li>Drafted operational stress calculation modules using structural mathematics for experimental physical cells.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Key Projects */}
              <div className="mb-8">
                <h3 className="font-serif text-lg text-on-surface border-b border-surface-container pb-2 mb-4 font-semibold uppercase tracking-wider text-xs">
                  Key Projects
                </h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="font-sans font-bold text-sm text-on-surface">CarePredictAI</span>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed mt-1">
                      Full-stack healthcare risk pipeline predicting clinical patient deterioration using time-series EHR structures. Developed in PyTorch with LSTM autoencoders and a React visualization dashboard. (ROC-AUC: 0.89)
                    </p>
                  </div>
                  <div>
                    <span className="font-sans font-bold text-sm text-on-surface">CloudPilot</span>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed mt-1">
                      DevOps provisioning and Git build pipeline dashboard modeling Vercel deploy pipelines. Integrated with AWS EC2 runners, Docker sandboxing, Jenkins workflows, and live WebSockets telemetry.
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills Matrix */}
              <div>
                <h3 className="font-serif text-lg text-on-surface border-b border-surface-container pb-2 mb-4 font-semibold uppercase tracking-wider text-xs">
                  Technical Skill Matrix
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs text-on-surface-variant">
                  <div>
                    <p className="font-mono text-[10px] text-secondary uppercase tracking-widest mb-1">ML / Deep Learning</p>
                    <p className="text-on-surface">PyTorch, TensorFlow, Scikit-Learn, XGBoost, SHAP, CNNs, Recurrent LSTMs</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-secondary uppercase tracking-widest mb-1">Web Systems &amp; APIs</p>
                    <p className="text-on-surface">React, Next.js, FastAPI, Node.js, Express, Django, REST APIs, WebSockets</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-secondary uppercase tracking-widest mb-1">Infrastructure &amp; Databases</p>
                    <p className="text-on-surface">Docker, Jenkins pipelines, AWS (EC2/S3), PostgreSQL, MongoDB, Redis, Supabase</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-secondary uppercase tracking-widest mb-1">Languages</p>
                    <p className="text-on-surface">Python, TypeScript, JavaScript, C++, SQL, HTML/CSS</p>
                  </div>
                </div>
              </div>

              {/* Print Footer */}
              <div className="hidden print:block text-center text-[10px] text-secondary font-mono mt-12 pt-4 border-t border-surface-container">
                This resume is dynamically generated. View live at: {window.location.origin}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
