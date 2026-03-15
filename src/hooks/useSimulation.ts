import { useState, useEffect } from 'react';

export function useSimulation() {
  const [cloudDensity, setCloudDensity] = useState(20); // 0-100%
  const [gridPrice, setGridPrice] = useState(5); // cents/kWh
  const [solarOutput, setSolarOutput] = useState(80); // 0-100%
  const [fridgeTemp, setFridgeTemp] = useState(-20); // °C
  const [compressorStarts, setCompressorStarts] = useState(12);
  const [savings, setSavings] = useState(142.50);
  const [mechanicalSafety, setMechanicalSafety] = useState(true);
  
  // Logic:
  // IF (Predicted Sun > 80%) AND (Grid Price > 0) -> THEN (Set Fridge Temp to MIN).
  // IF (Predicted Cloud > 50%) -> THEN (Set Fridge Temp to MAX / Idle).
  
  // We can drive solarOutput inversely from cloudDensity
  useEffect(() => {
    const newSolar = Math.max(0, 100 - cloudDensity * 1.2);
    setSolarOutput(newSolar);
    
    // Grid price spikes when clouds are high (simulated)
    if (cloudDensity > 70) {
      setGridPrice(35); // Peak grid
    } else if (cloudDensity > 40) {
      setGridPrice(15);
    } else {
      setGridPrice(5); // Cheap grid or exporting
    }
  }, [cloudDensity]);
  
  useEffect(() => {
    // The "Secret Sauce" Logic
    let targetTemp = -20;
    if (solarOutput > 80 && gridPrice > 0) {
      targetTemp = -25; // Pre-chill
    } else if (cloudDensity > 50) {
      targetTemp = -18; // Idle / Max temp
    }
    
    // Smooth transition for fridge temp
    const timer = setInterval(() => {
      setFridgeTemp(prev => {
        if (Math.abs(prev - targetTemp) < 0.1) return targetTemp;
        return prev + (targetTemp - prev) * 0.1;
      });
    }, 500);
    
    return () => clearInterval(timer);
  }, [solarOutput, gridPrice, cloudDensity]);
  
  // Status
  let status = 'SAFE';
  if (gridPrice > 20) status = 'PEAK DANGER';
  else if (cloudDensity > 40 && cloudDensity <= 70) status = 'WARNING';
  
  return {
    cloudDensity, setCloudDensity,
    gridPrice,
    solarOutput,
    fridgeTemp,
    compressorStarts,
    savings,
    mechanicalSafety, setMechanicalSafety,
    status
  };
}
