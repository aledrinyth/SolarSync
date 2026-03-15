import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Sun, CloudRain, Zap, Battery, AlertTriangle, CheckCircle2, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

export function Dashboard({ simulation }: { simulation: any }) {
  const { solarOutput, fridgeTemp, savings, status, gridPrice } = simulation;

  const statusColors = {
    'SAFE': 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10',
    'WARNING': 'text-amber-400 border-amber-400/20 bg-amber-400/10',
    'PEAK DANGER': 'text-rose-500 border-rose-500/20 bg-rose-500/10',
  };

  const statusIcons = {
    'SAFE': <CheckCircle2 className="w-6 h-6" />,
    'WARNING': <AlertTriangle className="w-6 h-6" />,
    'PEAK DANGER': <Zap className="w-6 h-6" />,
  };

  // Calculate battery fill percentage based on temp (-18 to -25)
  // -18 is 0% (empty thermal battery), -25 is 100% (full thermal battery)
  const thermalBatteryPercent = Math.max(0, Math.min(100, ((-18 - fridgeTemp) / 7) * 100));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Live Shield</h1>
          <p className="text-slate-400">Real-time thermal battery optimization</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${statusColors[status as keyof typeof statusColors]}`}>
          {statusIcons[status as keyof typeof statusIcons]}
          <span className="font-bold tracking-wider">{status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Solar Window */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-400" />
              Solar Window
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" className="stroke-slate-800" strokeWidth="12" fill="none" />
                    <motion.circle 
                      cx="64" cy="64" r="56" 
                      className="stroke-amber-400" 
                      strokeWidth="12" fill="none" 
                      strokeDasharray="351.86"
                      animate={{ strokeDashoffset: 351.86 - (351.86 * solarOutput) / 100 }}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white">{Math.round(solarOutput)}%</span>
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Current</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" className="stroke-slate-800" strokeWidth="12" fill="none" />
                    <motion.circle 
                      cx="64" cy="64" r="56" 
                      className="stroke-indigo-400" 
                      strokeWidth="12" fill="none" 
                      strokeDasharray="351.86"
                      animate={{ strokeDashoffset: 351.86 - (351.86 * Math.max(0, solarOutput - 20)) / 100 }}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white">{Math.round(Math.max(0, solarOutput - 20))}%</span>
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Predicted (1h)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Savings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              Money Saved Today
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-40">
            <motion.div 
              key={savings}
              initial={{ scale: 1.1, color: '#34d399' }}
              animate={{ scale: 1, color: '#f8fafc' }}
              className="text-5xl font-mono font-bold tracking-tighter"
            >
              ${savings.toFixed(2)}
            </motion.div>
            <div className="mt-4 text-sm text-slate-400 flex items-center gap-2">
              <span>Grid Price:</span>
              <span className={`font-mono font-bold ${gridPrice > 20 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {gridPrice}c/kWh
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Thermal Battery */}
        <Card className="col-span-1 md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Battery className="w-5 h-5 text-blue-400" />
              Thermal Battery Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 w-full">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-300">Cold Room Temperature</span>
                  <span className="text-sm font-mono font-bold text-blue-400">{fridgeTemp.toFixed(1)}°C</span>
                </div>
                <div className="h-16 bg-slate-800 rounded-xl overflow-hidden relative border border-slate-700">
                  <motion.div 
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-blue-600 to-cyan-400"
                    animate={{ width: `${thermalBatteryPercent}%` }}
                    transition={{ duration: 0.5 }}
                  />
                  {/* Grid lines for visual effect */}
                  <div className="absolute inset-0 flex justify-between px-4">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="w-px h-full bg-white/10" />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-slate-500">
                  <span>-18°C (Empty)</span>
                  <span>-25°C (Full)</span>
                </div>
              </div>
              
              <div className="w-full md:w-64 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <h4 className="text-sm font-medium text-slate-400 mb-2">Energy Stored</h4>
                <div className="text-3xl font-bold text-white">
                  {(thermalBatteryPercent * 0.05).toFixed(1)} <span className="text-lg text-slate-500">kWh</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Equivalent to {(thermalBatteryPercent * 0.05 * gridPrice / 100).toFixed(2)} AUD in peak grid avoidance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
