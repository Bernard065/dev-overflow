"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

// Create a Context for the theme with an initial value of undefined.
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// The ThemeProvider component will wrap around any child components that need access to the theme.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize the state `mode` to hold the current theme, either 'light' or 'dark'.
  const [mode, setMode] = useState("");

  // Function to handle the theme change.
  const handleThemeChange = () => {
    // If the theme is stored as 'dark' in localStorage or if there's no theme in localStorage
    // but the user prefers a dark theme based on their system settings, set the theme to dark.
    // Otherwise set the theme to light
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  };

  // useEffect hook runs the `handleThemeChange` function whenever `mode` changes
  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  // The context provider passes down the `mode` and `setMode` to any component that consumes this context
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the ThemeContext in functional components.
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context; // Return the context value which includes `mode` and `setMode`.
}
