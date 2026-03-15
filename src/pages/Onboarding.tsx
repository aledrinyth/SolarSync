import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { motion } from 'motion/react';
import { ArrowRight, Settings, Zap, MapPin } from 'lucide-react';

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [suburb, setSuburb] = useState('');
  const [capacity, setCapacity] = useState('');
  const [industry, setIndustry] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API fetch and analysis
    setTimeout(() => {
      setLoading(false);
      onComplete();
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-blue-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Welcome to FrigoCast</CardTitle>
            <p className="text-slate-400 mt-2">Turn your cold room into a thermal battery.</p>
          </CardHeader>
          <CardContent>
            {!loading ? (
              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    Victorian Suburb
                  </label>
                  <input 
                    type="text" 
                    required
                    value={suburb}
                    onChange={(e) => setSuburb(e.target.value)}
                    placeholder="e.g., Dandenong South"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-slate-500" />
                    Solar Capacity (kW)
                  </label>
                  <input 
                    type="number" 
                    required
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="e.g., 50"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <Settings className="w-4 h-4 text-slate-500" />
                    Industry
                  </label>
                  <select 
                    required
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="" disabled>Select Industry</option>
                    <option value="seafood">Seafood Distribution</option>
                    <option value="meat">Meat Processing</option>
                    <option value="dairy">Dairy Storage</option>
                    <option value="produce">Fresh Produce</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg px-4 py-3 mt-6 transition-colors flex items-center justify-center gap-2"
                >
                  Initialize System
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 space-y-6">
                <div className="relative w-20 h-20">
                  <svg className="animate-spin w-full h-full text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-white font-medium">Fetching AEMO NEM12 Data...</p>
                  <p className="text-slate-400 text-sm">Overlaying weather forecasts for {suburb || 'Victoria'}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
