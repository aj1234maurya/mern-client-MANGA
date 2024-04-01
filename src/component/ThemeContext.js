import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // const [theme, setTheme] = useState("light");
  const [theme, setTheme] = useState(() => {
    // Set the initial theme based on localStorage or a default value
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    // Update localStorage whenever the theme changes
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    // localStorage.setItem("theme")
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
