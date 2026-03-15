import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { TrendingDown, Shield, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const peakData = [
  { day: 'Mon', peak: 45, shaved: 15 },
  { day: 'Tue', peak: 42, shaved: 12 },
  { day: 'Wed', peak: 50, shaved: 20 },
  { day: 'Thu', peak: 38, shaved: 8 },
  { day: 'Fri', peak: 48, shaved: 18 },
  { day: 'Sat', peak: 30, shaved: 5 },
  { day: 'Sun', peak: 28, shaved: 4 },
];

export function Financial() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Financial Optimizer</h1>
        <p className="text-slate-400">The ROI of Thermal Storage</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sun Tax Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-emerald-400" />
              "Sun Tax" Avoided
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-40">
              <div className="text-5xl font-mono font-bold text-emerald-400 tracking-tighter">
                $342.50
              </div>
              <p className="text-sm text-slate-400 mt-4 text-center">
                Export fees avoided this month by storing solar energy as coldness instead of exporting to the grid.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Net Zero Export Goal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              Net Zero Export Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col justify-center h-40 space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-4xl font-bold text-white">82%</span>
                <span className="text-sm text-slate-400 mb-1">Self-Consumption</span>
              </div>
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[82%]" />
              </div>
              <p className="text-xs text-slate-500">
                Target: 100% internal usage of generated solar power.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Peak Demand Shield */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-400" />
              Peak Demand Shield
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peakData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="day" stroke="#94a3b8" tick={{fill: '#94a3b8'}} />
                  <YAxis stroke="#94a3b8" tick={{fill: '#94a3b8'}} label={{ value: 'kW Demand', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Bar dataKey="peak" stackId="a" fill="#1e293b" name="Actual Peak (kW)" />
                  <Bar dataKey="shaved" stackId="a" fill="#818cf8" name="Shaved Peak (kW)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-slate-400 mt-4 text-center">
              By turning off the compressor right before a cloud hit, FrigoCast shaved your highest power spike, avoiding demand charges.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
