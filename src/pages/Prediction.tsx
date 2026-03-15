import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Cloud, Zap, AlertCircle, Sun } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateData = () => {
  const data = [];
  const now = new Date();
  for (let i = -60; i <= 60; i += 5) {
    const time = new Date(now.getTime() + i * 60000);
    const isFuture = i > 0;
    
    // Simulate a cloud surge in the future
    let cloudDensity = 20 + Math.sin(i / 10) * 10;
    if (i > 15 && i < 45) {
      cloudDensity += 50; // Cloud surge
    }
    
    let gridPrice = 5;
    if (cloudDensity > 60) gridPrice = 35;
    else if (cloudDensity > 40) gridPrice = 15;

    // Simulate solar intensity (inversely proportional to cloud density + some noise)
    let solarIntensity = Math.max(0, 100 - cloudDensity * 0.8 + (Math.random() * 5 - 2.5));

    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      cloudDensity: Math.max(0, Math.min(100, cloudDensity)),
      gridPrice,
      solarIntensity: Math.min(100, solarIntensity),
      isFuture
    });
  }
  return data;
};

const defaultData = generateData();

interface PredictionProps {
  // Pass your own ML model data here. It should match the structure of defaultData.
  mlData?: any[]; 
}

export function Prediction({ mlData }: PredictionProps) {
  const data = mlData && mlData.length > 0 ? mlData : defaultData;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Cloud Pulse</h1>
        <p className="text-slate-400">Sunlight Prediction Engine</p>
      </div>

      <Card className="border-indigo-500/30 bg-indigo-950/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-500/20 rounded-full">
              <AlertCircle className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Action Prompt</h3>
              <p className="text-lg text-indigo-200">
                Predicted sun surge at 1:15 PM. 
                <span className="block mt-1 font-semibold text-white">
                  Recommended Action: Drop fridge set-point to -25°C now to bank 5kWh of free energy.
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-slate-400" />
            Cloud Density vs Energy Price
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCloud" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#94a3b8" 
                  tick={{fill: '#94a3b8'}} 
                  tickMargin={10}
                />
                <YAxis 
                  yAxisId="left" 
                  stroke="#94a3b8" 
                  tick={{fill: '#94a3b8'}} 
                  domain={[0, 100]}
                  label={{ value: 'Cloud Density %', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  stroke="#f43f5e" 
                  tick={{fill: '#f43f5e'}}
                  domain={[0, 50]}
                  label={{ value: 'Grid Price (c/kWh)', angle: 90, position: 'insideRight', fill: '#f43f5e' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="cloudDensity" 
                  stroke="#94a3b8" 
                  fillOpacity={1} 
                  fill="url(#colorCloud)" 
                  name="Cloud Density %"
                />
                <Area 
                  yAxisId="right"
                  type="stepAfter" 
                  dataKey="gridPrice" 
                  stroke="#f43f5e" 
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                  name="Grid Price (c/kWh)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-4 text-sm text-slate-500 font-mono">
            <span>-60 MINS (HISTORICAL)</span>
            <span>NOW</span>
            <span>+60 MINS (PREDICTED)</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-400" />
            Solar Intensity Forecast (ML Model Ready)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#94a3b8" 
                  tick={{fill: '#94a3b8'}} 
                  tickMargin={10}
                />
                <YAxis 
                  stroke="#fbbf24" 
                  tick={{fill: '#fbbf24'}} 
                  domain={[0, 100]}
                  label={{ value: 'Solar Intensity %', angle: -90, position: 'insideLeft', fill: '#fbbf24' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="solarIntensity" 
                  stroke="#fbbf24" 
                  fillOpacity={1} 
                  fill="url(#colorSolar)" 
                  name="Solar Intensity %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-4 text-sm text-slate-500 font-mono">
            <span>-60 MINS (HISTORICAL)</span>
            <span>NOW</span>
            <span>+60 MINS (PREDICTED)</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
