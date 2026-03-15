import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Activity, ShieldCheck, AlertOctagon } from 'lucide-react';
import { motion } from 'motion/react';

export function Health({ simulation }: { simulation: any }) {
  const { compressorStarts, mechanicalSafety, setMechanicalSafety } = simulation;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Asset Health</h1>
        <p className="text-slate-400">Compressor Protection & Maintenance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Compressor Stress Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-rose-400" />
              Compressor Stress Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-48 space-y-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="56" className="stroke-slate-800" strokeWidth="8" fill="none" />
                  <motion.circle 
                    cx="64" cy="64" r="56" 
                    className={compressorStarts > 20 ? 'stroke-rose-500' : 'stroke-emerald-400'} 
                    strokeWidth="8" fill="none" 
                    strokeDasharray="351.86"
                    animate={{ strokeDashoffset: 351.86 - (351.86 * (compressorStarts / 30)) }}
                    transition={{ duration: 0.5 }}
                  />
                </svg>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-white">{compressorStarts}</span>
                  <span className="text-xs text-slate-400 uppercase">Starts Today</span>
                </div>
              </div>
              <p className="text-sm text-slate-400 text-center">
                {compressorStarts > 20 ? 'High stress detected. Short-cycling risk.' : 'Normal operation. Compressor is healthy.'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Protection Logic */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              Protection Logic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col justify-center h-48 space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <div>
                  <h4 className="font-semibold text-white">Mechanical Safety Mode</h4>
                  <p className="text-sm text-slate-400 mt-1">
                    Ensures the app never turns a fridge on/off more than 4 times an hour, regardless of the sun.
                  </p>
                </div>
                <button 
                  onClick={() => setMechanicalSafety(!mechanicalSafety)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${mechanicalSafety ? 'bg-blue-500' : 'bg-slate-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${mechanicalSafety ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              {!mechanicalSafety && (
                <div className="flex items-center gap-3 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-sm">
                  <AlertOctagon className="w-5 h-5 shrink-0" />
                  Warning: Disabling safety mode may void compressor warranty due to short-cycling.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
