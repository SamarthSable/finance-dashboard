import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext.jsx";
import SummaryCard from "../components/SummaryCard";
import { LineChartComponent, PieChartComponent } from "../components/Charts";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

const Dashboard = () => {
  const { transactions } = useContext(AppContext);

  // Calculate total income
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  // Calculate total expense
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  // Current balance
  const balance = income - expense;

  // Prepare line chart data (running balance over time)
  const lineData = useMemo(() => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );

    return sorted.reduce((acc, t) => {
      const prevBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0;

      const newBalance =
        t.type === "income" ? prevBalance + t.amount : prevBalance - t.amount;

      acc.push({
        date: t.date,
        balance: newBalance,
      });

      return acc;
    }, []);
  }, [transactions]);

  // Prepare pie chart data (expenses by category)
  const pieData = useMemo(() => {
    const expenseTransactions = transactions.filter(
      (t) => t.type === "expense",
    );

    const grouped = expenseTransactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#a855f7"];

    return Object.keys(grouped).map((category, index) => ({
      name: category,
      value: grouped[category],
      color: COLORS[index % COLORS.length],
    }));
  }, [transactions]);

  return (
    <div className="container mt-4">
      {/* Summary cards */}
      <div className="row g-3">
        <div className="col-md-4">
          <SummaryCard
            title="Total Balance"
            value={balance}
            icon={<Wallet size={24} color="white" />}
            colorClass="bg-primary text-white"
          />
        </div>

        <div className="col-md-4">
          <SummaryCard
            title="Total Income"
            value={income}
            icon={<TrendingUp size={24} color="white" />}
            colorClass="bg-success text-white"
          />
        </div>

        <div className="col-md-4">
          <SummaryCard
            title="Total Expense"
            value={expense}
            icon={<TrendingDown size={24} color="white" />}
            colorClass="bg-danger text-white"
          />
        </div>
      </div>

      {/* Charts section */}
      <div className="row mt-4 g-3 d-flex align-items-stretch">
        {/* Line chart */}
        <div className="col-md-6">
          <div className="card p-3 h-100">
            <h6 className="mb-3">📈 Balance Trend</h6>
            <div className="line-chart-wrapper">
              <LineChartComponent data={lineData} />
            </div>
          </div>
        </div>

        {/* Pie chart */}
        <div className="col-md-6">
          <div className="card p-3 h-100">
            <h6 className="mb-3">📊 Spending Breakdown</h6>

            <div className="chart-wrapper">
              <div className="chart-container">
                <PieChartComponent data={pieData} />
              </div>

              {/* Side list for categories */}
              <div className="side-list">
                {pieData.map((item, index) => (
                  <div key={index} className="list-item">
                    <div className="d-flex align-items-center gap-2">
                      <span
                        className="color-dot"
                        style={{ background: item.color }}
                      ></span>
                      <span>{item.name}</span>
                    </div>
                    <strong>₹{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
