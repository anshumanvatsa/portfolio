import { useState, useEffect } from 'react';
import { Play, RotateCcw, AlertCircle, Sparkles, BrainCircuit, Activity, BarChart2 } from 'lucide-react';

type ModelType = 'care' | 'cascade';

export default function MlPlayground() {
  const [model, setModel] = useState<ModelType>('care');
  const [isInferenceRunning, setIsInferenceRunning] = useState(false);
  const [hasInferenceRun, setHasInferenceRun] = useState(false);
  
  // CarePredictAI states
  const [patientAge, setPatientAge] = useState(68);
  const [bpSystolic, setBpSystolic] = useState(135);
  const [missingDataSparsity, setMissingDataSparsity] = useState(30);
  
  // CascadeIQ states
  const [reachFactor, setReachFactor] = useState(45);
  const [networkDensity, setNetworkDensity] = useState(60);
  const [contentCategory, setContentCategory] = useState('tech');

  // Outputs
  const [careOutput, setCareOutput] = useState<{ day: number; risk: number }[]>([]);
  const [cascadeOutput, setCascadeOutput] = useState<{ hour: number; reach: number }[]>([]);
  const [overallMetric, setOverallMetric] = useState({ label: '', value: '' });

  // Generate baseline outputs upon component load or change
  const generateSimulatedData = () => {
    if (model === 'care') {
      const arr = [];
      const bpFactor = Math.max(0, (bpSystolic - 120) / 40);
      const ageFactor = Math.max(0, (patientAge - 40) / 60);
      const sparsityPenalty = (missingDataSparsity / 100) * 0.15;
      
      const baselineRisk = 0.2 + (bpFactor * 0.3) + (ageFactor * 0.4) - sparsityPenalty;
      const cappedBase = Math.min(0.95, Math.max(0.05, baselineRisk));

      for (let day = 0; day <= 90; day += 10) {
        // Patients deterioration starts slow then arcs upwards
        const ratio = day / 90;
        const noise = Math.sin(day / 15) * 0.04;
        const currentRisk = cappedBase + (ratio * ratio * (0.95 - cappedBase)) + noise;
        arr.push({ day, risk: Math.min(0.98, Math.max(0.02, currentRisk)) });
      }
      setCareOutput(arr);
      setOverallMetric({
        label: '90-Day Mortality Deterioration Score',
        value: `${(arr[arr.length - 1].risk * 100).toFixed(1)}%`
      });
    } else {
      const arr = [];
      const densityMultiplier = networkDensity / 50;
      const reachMultiplier = reachFactor / 40;
      let peakMultiplier = 1.0;
      if (contentCategory === 'tech') peakMultiplier = 1.4;
      if (contentCategory === 'business') peakMultiplier = 1.25;
      if (contentCategory === 'art') peakMultiplier = 1.15;

      const basePeak = 1200 * densityMultiplier * reachMultiplier * peakMultiplier;

      for (let hour = 0; hour <= 24; hour += 2) {
        // Cascade peaks around hour 12-14
        const exponent = -Math.pow(hour - 13, 2) / 36;
        const currentReach = basePeak * Math.exp(exponent) + (Math.random() * 50);
        arr.push({ hour, reach: Math.max(0, Math.round(currentReach)) });
      }
      setCascadeOutput(arr);
      const totalCascade = arr.reduce((acc, current) => acc + current.reach, 0);
      setOverallMetric({
        label: 'Predicted 24h Engagement Footprint',
        value: totalCascade.toLocaleString()
      });
    }
  };

  useEffect(() => {
    generateSimulatedData();
  }, [model]);

  const handleInferenceRun = () => {
    setIsInferenceRunning(true);
    setTimeout(() => {
      generateSimulatedData();
      setIsInferenceRunning(false);
      setHasInferenceRun(true);
    }, 1400); // Simulated inference pass
  };

  const handleReset = () => {
    setHasInferenceRun(false);
    generateSimulatedData();
  };

  // Coordinates helper for custom SVG Charts
  const getCareChartPoints = () => {
    if (careOutput.length === 0) return '';
    const width = 500;
    const height = 200;
    return careOutput
      .map((d, i) => {
        const x = (d.day / 90) * width;
        const y = height - d.risk * height;
        return `${x},${y}`;
      })
      .join(' ');
  };

  const getCascadeChartPoints = () => {
    if (cascadeOutput.length === 0) return '';
    const width = 500;
    const height = 200;
    const maxReach = Math.max(...cascadeOutput.map((d) => d.reach), 100);
    return cascadeOutput
      .map((d) => {
        const x = (d.hour / 24) * width;
        const y = height - (d.reach / maxReach) * height;
        return `${x},${y}`;
      })
      .join(' ');
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg border border-surface-container select-none" id="ml-laboratory-widget">
      {/* Selector Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-surface-container pb-4 mb-6 gap-4">
        <div>
          <h3 className="font-serif text-2xl text-on-surface flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-primary" /> AI Inference Lab
          </h3>
          <p className="font-sans text-xs text-secondary mt-1">
            Test live parameter variations on Anshuman's neural modeling engines.
          </p>
        </div>

        <div className="flex gap-1.5 bg-surface p-1 rounded border border-surface-container w-full sm:w-auto">
          <button
            onClick={() => {
              setModel('care');
              setHasInferenceRun(false);
            }}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded text-xs font-mono transition-colors ${
              model === 'care'
                ? 'bg-white text-primary shadow-sm font-semibold'
                : 'text-secondary hover:text-on-surface'
            }`}
            id="select-care-model-tab"
          >
            CarePredictAI (EHR)
          </button>
          <button
            onClick={() => {
              setModel('cascade');
              setHasInferenceRun(false);
            }}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded text-xs font-mono transition-colors ${
              model === 'cascade'
                ? 'bg-white text-primary shadow-sm font-semibold'
                : 'text-secondary hover:text-on-surface'
            }`}
            id="select-cascade-model-tab"
          >
            CascadeIQ (TGN)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Parameters Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-surface p-5 rounded border border-surface-container">
            <h4 className="font-mono text-xs text-secondary uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Inputs &amp; Hyperparameters
            </h4>

            {model === 'care' ? (
              // CarePredictAI Inputs
              <div className="flex flex-col gap-5">
                <div>
                  <div className="flex justify-between font-sans text-xs text-on-surface-variant mb-2">
                    <span className="font-medium">Patient Age (Years)</span>
                    <span className="font-mono text-primary font-bold">{patientAge} yrs</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="100"
                    value={patientAge}
                    onChange={(e) => {
                      setPatientAge(Number(e.target.value));
                      setHasInferenceRun(false);
                    }}
                    className="w-full h-1 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-secondary mt-1">
                    <span>18</span>
                    <span>100</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-sans text-xs text-on-surface-variant mb-2">
                    <span className="font-medium">Systolic Blood Pressure</span>
                    <span className="font-mono text-primary font-bold">{bpSystolic} mmHg</span>
                  </div>
                  <input
                    type="range"
                    min="90"
                    max="200"
                    value={bpSystolic}
                    onChange={(e) => {
                      setBpSystolic(Number(e.target.value));
                      setHasInferenceRun(false);
                    }}
                    className="w-full h-1 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-secondary mt-1">
                    <span>90 mmHg (Hypotension)</span>
                    <span>200 mmHg (Hypertensive)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-sans text-xs text-on-surface-variant mb-2">
                    <span className="font-medium">EHR Missing Sparsity (Imputation Imbalance)</span>
                    <span className="font-mono text-primary font-bold">{missingDataSparsity}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="70"
                    value={missingDataSparsity}
                    onChange={(e) => {
                      setMissingDataSparsity(Number(e.target.value));
                      setHasInferenceRun(false);
                    }}
                    className="w-full h-1 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-secondary mt-1">
                    <span>5% (Fully Documented)</span>
                    <span>70% (Highly Sparse)</span>
                  </div>
                </div>
              </div>
            ) : (
              // CascadeIQ Inputs
              <div className="flex flex-col gap-5">
                <div>
                  <div className="flex justify-between font-sans text-xs text-on-surface-variant mb-2">
                    <span className="font-medium">Content Domain Reach</span>
                    <span className="font-mono text-primary font-bold">{reachFactor * 10} Nodes</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={reachFactor}
                    onChange={(e) => {
                      setReachFactor(Number(e.target.value));
                      setHasInferenceRun(false);
                    }}
                    className="w-full h-1 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-secondary mt-1">
                    <span>100 seeds</span>
                    <span>1,000 seeds</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-sans text-xs text-on-surface-variant mb-2">
                    <span className="font-medium">Social Graph Edge Density</span>
                    <span className="font-mono text-primary font-bold">{(networkDensity / 100).toFixed(2)} Edge/Node</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="90"
                    value={networkDensity}
                    onChange={(e) => {
                      setNetworkDensity(Number(e.target.value));
                      setHasInferenceRun(false);
                    }}
                    className="w-full h-1 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-secondary mt-1">
                    <span>Sparse Nodes</span>
                    <span>Highly Clustered</span>
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-xs text-on-surface-variant mb-2 font-medium">
                    Content Category Filter
                  </label>
                  <select
                    value={contentCategory}
                    onChange={(e) => {
                      setContentCategory(e.target.value);
                      setHasInferenceRun(false);
                    }}
                    className="w-full bg-white border border-surface-container rounded p-2 text-xs font-mono focus:outline-none focus:border-primary"
                  >
                    <option value="tech">Machine Learning &amp; Tech (Highly Viral)</option>
                    <option value="business">Venture Capital &amp; Business (Moderate)</option>
                    <option value="art">Aesthetics &amp; Editorial (Long tail)</option>
                    <option value="general">General Updates (Low)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleInferenceRun}
              disabled={isInferenceRunning}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-xs font-mono rounded transition-colors ${
                isInferenceRunning ? 'opacity-70 cursor-wait' : 'hover:bg-primary-container'
              }`}
              id="trigger-inference-btn"
            >
              {isInferenceRunning ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Computing Neural Weights...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" /> Run Model Inference
                </>
              )}
            </button>

            {hasInferenceRun && (
              <button
                onClick={handleReset}
                className="p-3 border border-outline text-secondary hover:text-on-surface rounded hover:bg-surface-container transition-colors"
                id="reset-inference-btn"
                title="Reset Parameters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Visual outputs Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-[#1c1b1b] text-white p-6 rounded-lg border border-neutral-800 flex flex-col min-h-[340px] relative justify-between">
            {/* Terminal Top rule */}
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                </div>
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest ml-2">
                  model_execution_result_logs
                </span>
              </div>
              <span className="px-2 py-0.5 bg-neutral-800 text-neutral-400 font-mono text-[9px] rounded uppercase font-bold">
                {isInferenceRunning ? 'processing' : hasInferenceRun ? 'inference completed' : 'ready'}
              </span>
            </div>

            {/* Inference Processing Overlay state */}
            {isInferenceRunning ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
                <div className="relative w-16 h-16 mb-4">
                  <div className="absolute inset-0 border-2 border-neutral-800 rounded-full"></div>
                  <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-2 border border-dashed border-neutral-700 rounded-full animate-pulse"></div>
                </div>
                <p className="font-mono text-xs text-primary font-bold">Feed Forward &amp; Back-Imputation Loop</p>
                <p className="font-mono text-[10px] text-neutral-500 mt-1">imputing temporal matrices with bidirectional decay decay_coef=0.15</p>
              </div>
            ) : (
              // Output Visualizers
              <div className="flex-1 flex flex-col justify-between gap-6">
                {/* Visual Chart Container */}
                <div className="relative">
                  <p className="font-mono text-[10px] text-neutral-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    {model === 'care' ? (
                      <>
                        <Activity className="w-3.5 h-3.5 text-red-400" /> Patient Physiological Risk Trajectory (90 Days)
                      </>
                    ) : (
                      <>
                        <BarChart2 className="w-3.5 h-3.5 text-blue-400" /> Information Cascade Propagation Forecast (24h)
                      </>
                    )}
                  </p>

                  {/* SVG Chart */}
                  <div className="w-full bg-[#161515] rounded border border-neutral-800 p-4 relative overflow-hidden">
                    <svg
                      viewBox="0 0 500 200"
                      className="w-full h-44 overflow-visible"
                      preserveAspectRatio="none"
                    >
                      {/* Grid Lines */}
                      <line x1="0" y1="50" x2="500" y2="50" stroke="#262626" strokeDasharray="4 4" strokeWidth="0.5" />
                      <line x1="0" y1="100" x2="500" y2="100" stroke="#262626" strokeDasharray="4 4" strokeWidth="0.5" />
                      <line x1="0" y1="150" x2="500" y2="150" stroke="#262626" strokeDasharray="4 4" strokeWidth="0.5" />
                      
                      {/* Plot path */}
                      {model === 'care' ? (
                        <>
                          <polyline
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="2.5"
                            points={getCareChartPoints()}
                            className="transition-all duration-700"
                          />
                          {/* Circle indicators */}
                          {careOutput.map((d, idx) => {
                            const cx = (d.day / 90) * 500;
                            const cy = 200 - d.risk * 200;
                            return (
                              <g key={idx} className="group/node">
                                <circle
                                  cx={cx}
                                  cy={cy}
                                  r="4"
                                  fill="#1c1b1b"
                                  stroke="#ef4444"
                                  strokeWidth="2.5"
                                  className="cursor-pointer hover:r-6 transition-all"
                                />
                              </g>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          {/* Cascade Area fill */}
                          <polygon
                            fill="url(#cascade-grad)"
                            stroke="none"
                            points={`0,200 ${getCascadeChartPoints()} 500,200`}
                            className="transition-all duration-700"
                          />
                          <polyline
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2.5"
                            points={getCascadeChartPoints()}
                            className="transition-all duration-700"
                          />
                        </>
                      )}

                      {/* Gradient definition */}
                      <defs>
                        <linearGradient id="cascade-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Chart labels overlay */}
                    <div className="flex justify-between font-mono text-[9px] text-neutral-500 mt-2">
                      {model === 'care' ? (
                        <>
                          <span>Day 0 (Baseline)</span>
                          <span>Day 45</span>
                          <span>Day 90 (Observation End)</span>
                        </>
                      ) : (
                        <>
                          <span>Hour 0 (Seeding)</span>
                          <span>Hour 12 (Peak Flow)</span>
                          <span>Hour 24</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Inference Outputs Metrics block */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
                  <div className="bg-[#242323] p-3 rounded border border-neutral-800">
                    <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block">
                      {overallMetric.label}
                    </span>
                    <span className={`font-serif text-2xl font-bold mt-1 block ${
                      model === 'care' ? 'text-red-400' : 'text-blue-400'
                    }`}>
                      {overallMetric.value}
                    </span>
                  </div>

                  <div className="bg-[#242323] p-3 rounded border border-neutral-800 text-xs font-mono text-neutral-300">
                    <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block mb-1">
                      Inference Engine Diagnostics
                    </span>
                    {model === 'care' ? (
                      <div className="flex flex-col gap-0.5 text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Validation metric:</span>
                          <span className="text-neutral-300">ROC-AUC = 0.89</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Imputed entries:</span>
                          <span className="text-neutral-300">{missingDataSparsity * 4} nodes</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-0.5 text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">TGN edge parameters:</span>
                          <span className="text-neutral-300">{(networkDensity * 1.5).toFixed(0)} weighted</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Predicted multiplier:</span>
                          <span className="text-neutral-300">x{(reachFactor / 25).toFixed(2)} propagation</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Warn banner if parameter is high */}
            {!isInferenceRunning && model === 'care' && bpSystolic > 160 && (
              <div className="mt-4 p-2.5 bg-red-950/40 border border-red-900 text-red-300 rounded flex gap-2 items-start text-[11px] font-sans">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Clinical Advisory:</strong> Severe hypertensive threshold detected (&gt;160 mmHg). Model output projects imminent escalation risk.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
