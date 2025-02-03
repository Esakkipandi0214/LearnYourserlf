import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the type for context values
interface AppContextType {
  user: string | null;
  setUser: (user: string | null) => void;
  isEnglish: boolean;
  toggleLanguage: () => void;
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Context Provider Component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isEnglish, setIsEnglish] = useState<boolean>(true);

  // Load language preference from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("Learn_yourSelf_Lang");
      if (savedLang !== null) {
        setIsEnglish(JSON.parse(savedLang));
      }
    }
  }, []);

  // Function to toggle language
  const toggleLanguage = () => {
    const newLang = !isEnglish;
    setIsEnglish(newLang);
    localStorage.setItem("Learn_yourSelf_Lang", JSON.stringify(newLang));
  };

  return (
    <AppContext.Provider value={{ user, setUser, isEnglish, toggleLanguage }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
