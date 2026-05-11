import React from 'react';
import { Zap } from 'lucide-react';
import { MAX_STAMINA } from '../constants';

interface StaminaDisplayProps {
  stamina: number;
  nextRecoveryTime?: number;
}

export const StaminaDisplay: React.FC<StaminaDisplayProps> = ({ stamina, nextRecoveryTime }) => {
  const [timeStr, setTimeStr] = React.useState<string>('--:--');

  React.useEffect(() => {
    if (!nextRecoveryTime || stamina >= MAX_STAMINA) {
      setTimeStr('MAX');
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, nextRecoveryTime - now);
      
      if (diff === 0) {
        setTimeStr('UPDATE');
        return;
      }
      
      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeStr(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [nextRecoveryTime, stamina]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-card text-text-main font-bold">
        <Zap className={`w-5 h-5 ${stamina > 0 ? 'text-primary fill-primary' : 'text-gray-400'}`} />
        <span className="text-xl">
          {stamina} <span className="text-sm text-text-muted">/ {MAX_STAMINA}</span>
        </span>
      </div>
      {stamina < MAX_STAMINA && (
        <div className="text-xs text-text-muted mt-1 font-mono">
          次の回復まで {timeStr}
        </div>
      )}
    </div>
  );
};
