"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

// Create a context with an initial value of `undefined`
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Themeprovider component to manage and provide the theme state
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // State to hold the current theme mode
  const [mode, setMode] = useState("");

  // Function to toggle between dark an light modes
  const handleThemeChange = () => {
    if (mode === "dark") {
      setMode("light"); // Switch to light mode
      document.documentElement.classList.add("light"); // Add light class to the root HTML element
    } else {
      setMode("dark"); // Switch to dark mode
      document.documentElement.classList.add("dark"); // Add dark class to the root HTML element
    }
  };

  // useEffect hook to run handleThemeChange whenever the mode changes
  useEffect(() => {
    handleThemeChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // Provide the current mode and setMode function to children components
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to access the theme context
export function useTheme() {
  const context = useContext(ThemeContext); // Retrieve the current context value

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context; // Return the context value(mode and setMode)
}
