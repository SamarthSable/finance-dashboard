import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Plus, Search, Edit2, Trash2, Check } from "lucide-react"; // Icons add a professional touch

const TransactionTable = ({ onOpenAddModal }) => {
  const { transactions, filter, setFilter, role, setTransactions } =
    useContext(AppContext);
  const [search, setSearch] = useState("");

  // Edit states
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const filtered = transactions
    .filter((t) => (filter === "all" ? true : t.type === filter))
    .filter((t) => t.category.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      setTransactions(transactions.filter((t) => t.id !== id));
    }
  };

  const handleEdit = (t) => {
    setEditId(t.id);
    setEditForm({ ...t });
  };

  const handleSave = () => {
    setTransactions(transactions.map((t) => (t.id === editId ? editForm : t)));
    setEditId(null);
  };

  return (
    <div className="card p-4 mt-4 border-0 transaction-container shadow-lg">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <h5 className="text-white mb-0">Recent Transactions</h5>

        <div className="d-flex gap-2 align-items-center">
          {/* ➕ Add Button: Only for Admin */}
          {role === "admin" && (
            <button
              className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-2"
              onClick={onOpenAddModal}
            >
              <Plus size={16} />{" "}
              <span className="d-none d-sm-inline">Add New</span>
            </button>
          )}

          <div className="position-relative">
            <input
              type="text"
              placeholder="Search category..."
              className="form-control form-control-sm ps-4"
              style={{ width: "180px" }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search
              size={14}
              className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"
            />
          </div>

          <select
            className="form-select form-select-sm"
            style={{ width: "110px" }}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th style={{ width: "15%" }}>Date</th>
              <th style={{ width: "35%" }}>Category</th>
              <th style={{ width: "20%" }}>Amount</th>
              <th style={{ width: "15%" }}>Type</th>
              {role === "admin" && (
                <th style={{ width: "15%" }} className="text-end">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={role === "admin" ? "5" : "4"}
                  className="text-center py-5 text-muted"
                >
                  🚫 No transactions found
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr key={t.id}>
                  {/* DATE CELL */}
                  <td>
                    {editId === t.id ? (
                      <input
                        type="date"
                        className="table-input"
                        value={editForm.date}
                        onChange={(e) =>
                          setEditForm({ ...editForm, date: e.target.value })
                        }
                      />
                    ) : (
                      t.date
                    )}
                  </td>

                  {/* CATEGORY CELL */}
                  <td>
                    {editId === t.id ? (
                      <input
                        className="table-input w-100"
                        value={editForm.category}
                        onChange={(e) =>
                          setEditForm({ ...editForm, category: e.target.value })
                        }
                      />
                    ) : (
                      t.category
                    )}
                  </td>

                  {/* AMOUNT CELL */}
                  <td
                    className={
                      t.type === "income"
                        ? "text-success fw-bold"
                        : "text-white"
                    }
                  >
                    {editId === t.id ? (
                      <input
                        type="number"
                        className="table-input w-75"
                        value={editForm.amount}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            amount: Number(e.target.value),
                          })
                        }
                      />
                    ) : (
                      `₹${t.amount}`
                    )}
                  </td>

                  {/* TYPE BADGE */}
                  <td>
                    <span
                      className={`badge rounded-pill ${t.type === "income" ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"}`}
                    >
                      {t.type.toUpperCase()}
                    </span>
                  </td>

                  {/* ADMIN ACTIONS */}
                  {role === "admin" && (
                    <td className="text-end">
                      {editId === t.id ? (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={handleSave}
                        >
                          <Check size={14} />
                        </button>
                      ) : (
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            className="btn btn-outline-warning btn-sm border-0"
                            onClick={() => handleEdit(t)}
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm border-0"
                            onClick={() => handleDelete(t.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
