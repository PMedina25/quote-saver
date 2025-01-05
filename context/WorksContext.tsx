import { Work } from "@/models/Work";
import { ReactNode, createContext, useState } from "react";

interface WorksContextType {
  works: Work[];
  addWork: (work: Work) => void;
  addWorks: (works: Work[]) => void;
  removeWork: (id: number) => void;
  clearWorks: () => void;
}

const defaultValue: WorksContextType = {
  works: [],
  addWork: () => {},
  addWorks: () => {},
  removeWork: () => {},
  clearWorks: () => {},
};

export const WorksContext = createContext<WorksContextType>(defaultValue);

export const WorksProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [works, setWorks] = useState<Work[]>([]);

  const addWork = (work: Work) => {
    setWorks((prevWorks) => [...prevWorks, work]);
  };

  const addWorks = (works: Work[]) => {
    setWorks((prevWorks) => [...prevWorks, ...works]);
  };

  const removeWork = (id: number) => {
    setWorks((works) => works.filter((work) => work.id !== id));
  };

  const clearWorks = () => {
    setWorks([]);
  };

  return (
    <WorksContext.Provider
      value={{ works, addWork, addWorks, removeWork, clearWorks }}
    >
      {children}
    </WorksContext.Provider>
  );
};
