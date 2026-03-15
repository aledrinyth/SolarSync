import React, { useState, useEffect } from 'react';
import { Dashboard } from './pages/Dashboard';
import { Prediction } from './pages/Prediction';
import { Financial } from './pages/Financial';
import { Health } from './pages/Health';
import { Onboarding } from './pages/Onboarding';
import { useSimulation } from './hooks/useSimulation';
import { LayoutDashboard, CloudLightning, TrendingUp, Activity, Settings2 } from 'lucide-react';

export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mlData, setMlData] = useState<any[]>([]);
  const simulation = useSimulation();

  useEffect(() => {
    if (!onboarded) return;

    const fetchForecast = async () => {
      try {
        const response = await fetch('/api/forecast');
        const result = await response.json();
        if (result.success) {
          setMlData(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch forecast data:", error);
      }
    };

    fetchForecast();
    // Poll every minute to keep the data fresh
    const interval = setInterval(fetchForecast, 60000);
    return () => clearInterval(interval);
  }, [onboarded]);

  if (!onboarded) {
    return <Onboarding onComplete={() => setOnboarded(true)} />;
  }

  const tabs = [
    { id: 'dashboard', label: 'Live Shield', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'prediction', label: 'Cloud Pulse', icon: <CloudLightning className="w-5 h-5" /> },
    { id: 'financial', label: 'Financial Optimizer', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'health', label: 'Asset Health', icon: <Activity className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col md:flex-row font-sans selection:bg-blue-500/30">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <CloudLightning className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">FrigoCast</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Cold Chain Optimizer</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-500/10 text-blue-400 font-medium border border-blue-500/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Digital Twin Control (Hackathon Demo) */}
        <div className="p-6 mt-auto border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-slate-300 uppercase tracking-wider">
            <Settings2 className="w-4 h-4 text-amber-400" />
            Digital Twin Demo
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Clear Sky</span>
                <span>Cloud Cover</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={simulation.cloudDensity}
                onChange={(e) => simulation.setCloudDensity(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
            <div className="text-xs text-slate-500 leading-relaxed">
              Move the slider to simulate clouds passing over the solar array. Watch the dashboard react in real-time.
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'dashboard' && <Dashboard simulation={simulation} />}
          {/* To plug in your own ML model, pass the data array to the mlData prop: */}
          {activeTab === 'prediction' && <Prediction mlData={mlData} />}
          {activeTab === 'financial' && <Financial />}
          {activeTab === 'health' && <Health simulation={simulation} />}
        </div>
      </main>
    </div>
  );
}
