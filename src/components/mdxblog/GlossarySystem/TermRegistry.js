import React, { createContext, useContext, useMemo, useState } from "react";

const TermRegistryContext = createContext(null);

export const TermRegistryProvider = ({ children }) => {
  // Store resolved keys, not raw names
  const [termKeys, setTermKeys] = useState([]);

  const register = (key) => {
    if (!key) return;
    setTermKeys((prev) => (prev.includes(key) ? prev : [...prev, key]));
  };

  const value = useMemo(() => ({ termKeys, register }), [termKeys]);

  return (
    <TermRegistryContext.Provider value={value}>
      {children}
    </TermRegistryContext.Provider>
  );
};

export const useTermRegistry = () => useContext(TermRegistryContext);
