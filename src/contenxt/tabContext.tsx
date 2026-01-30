import { createContext, ReactNode, useContext, useState } from "react";

type TabContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TabContext = createContext<TabContextType | undefined>(undefined);
const { Provider } = TabContext;

type TabProviderProps = {
  children: ReactNode;
};

export const TabContextProvider = ({ children }: TabProviderProps) => {
  const [activeTab, setActiveTab] = useState("");

  return <Provider value={{ activeTab, setActiveTab }}>{children}</Provider>;
};

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context)
    throw new Error("useTabContext must be used within TabContextProvider");
  return context;
};
