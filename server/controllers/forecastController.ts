import { Request, Response } from 'express';

export const getForecast = (req: Request, res: Response) => {
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
  
  res.json({ success: true, data });
};
