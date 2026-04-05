// Reusable card component for dashboard summary
// Dynamically applies gradient based on type

const SummaryCard = ({ title, value, icon, colorClass }) => {
  return (
    <div
      className="card p-4 border-0 shadow-sm summary-card"
      style={{
        "--card-bg": colorClass.includes("primary")
          ? "linear-gradient(145deg, #3b82f6, #2563eb)"
          : colorClass.includes("success")
            ? "linear-gradient(145deg, #22c55e, #16a34a)"
            : "linear-gradient(145deg, #ef4444, #dc2626)",
      }}
    >
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <p className="small mb-1">{title}</p>
          <h3 className="fw-bold mb-0">₹{value.toLocaleString()}</h3>
        </div>

        {/* Icon section */}
        <div className="p-2 rounded-3 bg-white bg-opacity-25">{icon}</div>
      </div>
    </div>
  );
};

export default SummaryCard;
