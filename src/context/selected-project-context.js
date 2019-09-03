import React, { createContext, useContext, useState } from 'react';

export const SelectedProjectsContext = createContext();
export const SelectedProjectsProvider = ({ children }) => {
  const { selectedProjects, setSelectedProjects } = useState('INBOX');

  return (
    <SelectedProjectsContext.Provider value={{ selectedProjects, setSelectedProjects }}>
      {children}
    </SelectedProjectsContext.Provider>
  );
};

export const useSelectedProjectValue = () => useContext(SelectedProjectsContext);
