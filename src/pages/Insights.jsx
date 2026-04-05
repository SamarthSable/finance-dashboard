import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { Lightbulb, TrendingUp, PieChart, Target } from "lucide-react";

const Insights = () => {
  const { transactions } = useContext(AppContext);

  // Calculate key statistics from transactions
  const stats = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((a, b) => a + b.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((a, b) => a + b.amount, 0);

    // Savings rate in percentage
    const savingsRate =
      income > 0 ? (((income - expense) / income) * 100).toFixed(1) : 0;

    // Group expenses by category
    const categoryMap = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
      });

    // Find highest spending category
    const highestCategory =
      Object.keys(categoryMap).length > 0
        ? Object.keys(categoryMap).reduce((a, b) =>
            categoryMap[a] > categoryMap[b] ? a : b,
          )
        : "None";

    return { income, expense, savingsRate, highestCategory };
  }, [transactions]);

  return (
    <div className="container mt-4">
      {/* Section title */}
      <h4 className="mb-4 d-flex align-items-center gap-2 insight-title">
        <Lightbulb size={24} className="icon-warning" />
        Smart Insights
      </h4>

      <div className="row g-3">
        {/* Savings Rate */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 p-3 border-0 shadow-sm">
            <div className="d-flex justify-content-between mb-2">
              <span className="small insight-label">Savings Rate</span>
              <TrendingUp size={16} className="icon-success" />
            </div>

            <h4 className="insight-value">{stats.savingsRate}%</h4>

            {/* Progress bar visualization */}
            <div className="progress mt-2 progress-custom">
              <div
                className="progress-bar bg-success"
                style={{
                  width: `${Math.min(Math.max(stats.savingsRate, 0), 100)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Top Spending Category */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 p-3 border-0 shadow-sm">
            <div className="d-flex justify-content-between mb-2">
              <span className="small insight-label">Top Category</span>
              <PieChart size={16} className="icon-info" />
            </div>

            <h4 className="insight-value">{stats.highestCategory}</h4>
            <p className="extra-small insight-subtext mb-0">
              Highest relative spend
            </p>
          </div>
        </div>

        {/* Static monthly goal */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 p-3 border-0 shadow-sm">
            <div className="d-flex justify-content-between mb-2">
              <span className="small insight-label">Monthly Goal</span>
              <Target size={16} className="icon-warning" />
            </div>

            <h4 className="insight-value">₹50,000</h4>
            <p className="extra-small insight-subtext mb-0">Target Savings</p>
          </div>
        </div>

        {/* Total activity */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 p-3 border-0 shadow-sm">
            <div className="d-flex justify-content-between mb-2">
              <span className="small insight-label">Activity</span>
              <Lightbulb size={16} className="icon-primary" />
            </div>

            <h4 className="insight-value">{transactions.length}</h4>
            <p className="extra-small insight-subtext mb-0">
              Total Transactions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
