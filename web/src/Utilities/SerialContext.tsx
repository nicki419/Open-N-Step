import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { SerialManager } from './SerialManager';

type SerialContextType = {
  serialManager: SerialManager;
  serialLog: string[];
  setSerialLog: React.Dispatch<React.SetStateAction<string[]>>;
  serialSupported: boolean;
};

const SerialContext = createContext<SerialContextType | undefined>(undefined);

export const SerialProvider = ({ children }: { children: ReactNode }) => {
  const [serialManager] = useState(() => new SerialManager());
  const [serialLog, setSerialLog] = useState<string[]>(['[INFO] System ready.']);
  const [serialSupported, setSerialSupported] = useState(true);

  // Web Serial Compatibility Check
  useEffect(() => {
    if (!('serial' in navigator)) {
      setSerialSupported(false);
    }
  }, []);

  return (
    <SerialContext.Provider value={{ serialManager, serialLog, setSerialLog, serialSupported }}>
      {children}
    </SerialContext.Provider>
  );
};

export const useSerial = (): SerialContextType => {
  const context = useContext(SerialContext);
  if (!context) {
    throw new Error('useSerial must be used within a SerialProvider');
  }
  return context;
};