import React, { createContext, useContext, useState } from "react";

const TermRegistryContext = createContext(null);

export const TermRegistryProvider = ({ children }) => {
  const [terms, setTerms] = useState([]);

  const register = (name) => {
    setTerms(prev => prev.includes(name) ? prev : [...prev, name]);
  };

  return (
    <TermRegistryContext.Provider value={{ terms, register }}>
      {children}
    </TermRegistryContext.Provider>
  );
};

export const useTermRegistry = () => useContext(TermRegistryContext);
