import { useState, useEffect, useCallback } from 'react';
import { MAX_STAMINA, STAMINA_RECOVERY_MS } from '../constants';

const STAMINA_STORAGE_KEY = 'chh_game_stamina_data';

interface StaminaData {
  currentStamina: number;
  lastUpdate: number;
}

export function useStamina() {
  const [stamina, setStamina] = useState<number>(MAX_STAMINA);
  const [nextRecoveryTime, setNextRecoveryTime] = useState<number>(0);

  // Load and calculate recovered stamina
  const syncStamina = useCallback(() => {
    const saved = localStorage.getItem(STAMINA_STORAGE_KEY);
    const now = Date.now();
    
    if (saved) {
      try {
        const data: StaminaData = JSON.parse(saved);
        if (data.currentStamina >= MAX_STAMINA) {
          setStamina(MAX_STAMINA);
          setNextRecoveryTime(0);
        } else {
          const passedMs = now - data.lastUpdate;
          const recoveredPoints = Math.floor(passedMs / STAMINA_RECOVERY_MS);
          
          if (recoveredPoints > 0) {
            const newStamina = Math.min(MAX_STAMINA, data.currentStamina + recoveredPoints);
            const remainderMs = passedMs % STAMINA_RECOVERY_MS;
            const newLastUpdate = now - remainderMs;
            
            const newData = { currentStamina: newStamina, lastUpdate: newLastUpdate };
            localStorage.setItem(STAMINA_STORAGE_KEY, JSON.stringify(newData));
            setStamina(newStamina);
            setNextRecoveryTime(newStamina >= MAX_STAMINA ? 0 : newLastUpdate + STAMINA_RECOVERY_MS);
          } else {
            setStamina(data.currentStamina);
            setNextRecoveryTime(data.lastUpdate + STAMINA_RECOVERY_MS);
          }
        }
        return;
      } catch (e) {
        console.error("Failed to parse stamina data", e);
      }
    }
    
    // Default initialization
    const initialData: StaminaData = { currentStamina: MAX_STAMINA, lastUpdate: now };
    localStorage.setItem(STAMINA_STORAGE_KEY, JSON.stringify(initialData));
    setStamina(MAX_STAMINA);
    setNextRecoveryTime(0);
  }, []);

  useEffect(() => {
    syncStamina();
    
    // Set up a timer to auto-refresh stamina when nextRecoveryTime is reached
    const intervalId = setInterval(syncStamina, 1000);
    return () => clearInterval(intervalId);
  }, [syncStamina]);

  const consumeStamina = useCallback((): boolean => {
    const saved = localStorage.getItem(STAMINA_STORAGE_KEY);
    if (!saved) return false;
    
    const data: StaminaData = JSON.parse(saved);
    if (data.currentStamina <= 0) return false;
    
    const newData: StaminaData = {
      currentStamina: data.currentStamina - 1,
      // If we are at max stamina, we start the recovery timer from now
      lastUpdate: data.currentStamina === MAX_STAMINA ? Date.now() : data.lastUpdate
    };
    
    localStorage.setItem(STAMINA_STORAGE_KEY, JSON.stringify(newData));
    syncStamina();
    return true;
  }, [syncStamina]);

  return {
    stamina,
    maxStamina: MAX_STAMINA,
    nextRecoveryTime,
    consumeStamina,
    syncStamina
  };
}
