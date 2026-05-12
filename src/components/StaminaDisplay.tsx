import React from 'react';
import { Clock } from 'lucide-react';
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
    <div className="bg-[#fff9e6] border-2 border-orange-200 rounded-2xl p-2 shadow-sm flex flex-col min-w-[160px]">
      <div className="text-[10px] font-bold text-text-brown mb-1 leading-none text-left pl-1">
        スタミナ
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {[...Array(MAX_STAMINA)].map((_, i) => (
            <div key={i} className={`text-sm ${i < stamina ? 'text-primary' : 'text-orange-200 opacity-50'}`}>
              ❤️
            </div>
          ))}
        </div>
        <div className="text-primary font-bold text-sm ml-2 font-pop">
          {stamina}/{MAX_STAMINA}
        </div>
      </div>
      {stamina < MAX_STAMINA && (
        <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-text-brown">
          <Clock size={10} className="stroke-[3px]" />
          <span>{timeStr}で1回復</span>
        </div>
      )}
    </div>
  );
};
