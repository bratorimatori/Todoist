import React, { createContext, useContext, useState } from 'react';

export const SelectedProjectsContext = createContext();
export const SelectedProjectsProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState('INBOX');

  return (
    <SelectedProjectsContext.Provider value={{ selectedProject, setSelectedProject }}>
      {children}
    </SelectedProjectsContext.Provider>
  );
};

export const useSelectedProjectValue = () => useContext(SelectedProjectsContext);
