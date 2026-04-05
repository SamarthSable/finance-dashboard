import { useContext, useState } from "react";
import { AppProvider, AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import TransactionTable from "./components/TransactionTable";
import Insights from "./pages/Insights";
import AddTransaction from "./components/AddTransaction";

// Main layout component
const MainApp = () => {
  // Access global state from context
  const { role, setRole, theme, setTheme } = useContext(AppContext);

  // Controls add transaction modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {/* Header Section */}
      <div className="container mt-4 d-flex justify-content-between align-items-center">
        {/* Left side - title */}
        <div>
          <h2>💰 Finance Dashboard</h2>
          <p className="small">Track your income & expenses</p>
        </div>

        {/* Right side - controls */}
        <div className="d-flex align-items-center gap-2">
          {/* Role selector (viewer/admin) */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-select w-auto"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>

          {/* Theme toggle button */}
          <button
            className="theme-toggle-btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title="Toggle Theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      {/* Main sections */}
      <Dashboard />
      <TransactionTable onOpenAddModal={() => setIsModalOpen(true)} />

      {/* Add transaction modal */}
      <AddTransaction
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Insights />

      {/* Footer */}
      <footer className="app-footer mt-5">
        <div className="container d-flex justify-content-between align-items-center flex-wrap gap-2">
          <p className="mb-0 small">
            © {new Date().getFullYear()} Finance Dashboard
          </p>

          <div className="footer-links d-flex gap-3">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Wrap app with context provider
export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
