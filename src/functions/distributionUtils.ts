// Placeholder function. Subject to change.
export const generateSkewedBellCurve = (type: 'median' | 'average' = 'median') => {
  const width = 260;
  const height = 100;
  const points = [];
  
  // Different curves for median vs average
  for (let i = 0; i <= 50; i++) {
    const x = 20 + (i / 50) * width;
    const progress = i / 50;
    
    if (type === 'median') {
      // More skewed curve for median comparison
      const skew = 2.5;
      const t = (progress - 0.25) * 4;
      const bellCurve = Math.exp(-0.5 * t * t);
      const skewedCurve = bellCurve * (1 + skew * t * Math.exp(-t * t / 2));
      const y = 130 - (Math.max(0, skewedCurve) * height * 0.8);
      points.push(`${x},${y}`);
    } else {
      // Less skewed curve for average comparison
      const skew = 1.5;
      const t = (progress - 0.35) * 4;
      const bellCurve = Math.exp(-0.5 * t * t);
      const skewedCurve = bellCurve * (1 + skew * t * Math.exp(-t * t / 2));
      const y = 130 - (Math.max(0, skewedCurve) * height * 0.8);
      points.push(`${x},${y}`);
    }
  }
  
  return `M ${points.join(' L ')} L 280 130 L 20 130 Z`;
};
