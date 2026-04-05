import { createContext, useState, useEffect } from "react";
import { transactionsData } from "../data/data";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Load transactions from localStorage (fallback to default data)
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("my_finance_data");
    return saved ? JSON.parse(saved) : transactionsData;
  });

  // User role (viewer/admin)
  const [role, setRole] = useState("viewer");

  // Filter state (income/expense/all)
  const [filter, setFilter] = useState("all");

  // Theme (dark/light)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("my_finance_data", JSON.stringify(transactions));
  }, [transactions]);

  // Apply theme to body + persist it
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        role,
        setRole,
        filter,
        setFilter,
        theme,
        setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
