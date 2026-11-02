import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

// Custom hook for using theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  // Fail loudly if a component is rendered outside the provider
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Provider component
export const ThemeProvider = ({ children }) => {
  // Lazy initializer: localStorage is read once, on the first render
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Put the theme on <html> so the dark variables reach every component,
  // and remember it for the next visit
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
