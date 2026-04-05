import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { X } from "lucide-react";

const AddTransaction = ({ show, onClose }) => {
  const { transactions, setTransactions, role } = useContext(AppContext);

  // Form state
  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  // Restrict modal access to admin only
  if (role !== "admin" || !show) return null;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.date || !form.amount || !form.category) {
      alert("Please fill all fields");
      return;
    }

    // Create new transaction object
    const newTransaction = {
      id: Date.now(),
      ...form,
      amount: Number(form.amount),
    };

    // Update global state
    setTransactions([...transactions, newTransaction]);

    // Reset form
    setForm({ date: "", amount: "", category: "", type: "expense" });

    onClose();
  };

  return (
    <div className="custom-modal-overlay p-3">
      <div className="custom-modal-content card p-3 p-md-4 shadow-lg border-0">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3 mb-md-4">
          <h5 className="text-white mb-0 fs-6 fs-md-5">
            ➕ Add New Transaction
          </h5>

          {/* Close button */}
          <button className="btn text-white-50 p-0 border-0" onClick={onClose}>
            <X size={20} className="d-md-none" />
            <X size={24} className="d-none d-md-block" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Date */}
          <div className="mb-2 mb-md-3">
            <label className="text-white-50 small mb-1">Date</label>
            <input
              type="date"
              className="form-control"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>

          {/* Amount */}
          <div className="mb-2 mb-md-3">
            <label className="text-white-50 small mb-1">Amount (₹)</label>
            <input
              type="number"
              placeholder="e.g. 500"
              className="form-control"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>

          {/* Category */}
          <div className="mb-2 mb-md-3">
            <label className="text-white-50 small mb-1">Category</label>
            <input
              type="text"
              placeholder="e.g. Food, Salary"
              className="form-control"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>

          {/* Type */}
          <div className="mb-3 mb-md-4">
            <label className="text-white-50 small mb-1">Type</label>
            <select
              className="form-select"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <button className="btn btn-primary w-100 py-2 fw-bold">
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
