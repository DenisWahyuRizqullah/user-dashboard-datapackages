import { useState, useEffect } from "react";
import TopNav from "../components/TopNav";
import {
  getDashboardData,
  calculateTotalRevenue,
  getRecentTransactions,
  formatCurrency,
  formatTransactionDate
} from "../services/dashboardService";
import "./Dashboard.css";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    customers: [],
    transactions: [],
    packages: []
  });

  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getDashboardData();
        setDashboardData(data);

        // Process recent transactions
        const recent = getRecentTransactions(
          data.transactions,
          data.customers,
          data.packages,
          5
        );
        setRecentTransactions(recent);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.message || "Gagal memuat data dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate statistics
  const totalCustomers = dashboardData.customers.length;
  const totalTransactions = dashboardData.transactions.length;
  const totalRevenue = calculateTotalRevenue(
    dashboardData.transactions,
    dashboardData.packages
  );
  const totalPackages = dashboardData.packages.length;

  return (
    <div className="dashboard-container">
      <TopNav />

      <div className="dashboard-content">
        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Memuat data dashboard...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="error-state">
            <p>⚠️ {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="retry-button"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Main Dashboard Content */}
        {!loading && !error && (
          <>
            {/* Statistics Cards Section */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon customers-icon">👥</div>
                <div className="stat-content">
                  <h3>Total Pelanggan</h3>
                  <p className="stat-number">{totalCustomers}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon transactions-icon">📊</div>
                <div className="stat-content">
                  <h3>Total Transaksi</h3>
                  <p className="stat-number">{totalTransactions}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon revenue-icon">💰</div>
                <div className="stat-content">
                  <h3>Total Pendapatan</h3>
                  <p className="stat-number revenue">
                    {formatCurrency(totalRevenue)}
                  </p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon packages-icon">📦</div>
                <div className="stat-content">
                  <h3>Total Paket</h3>
                  <p className="stat-number">{totalPackages}</p>
                </div>
              </div>
            </div>

            {/* Recent Transactions Section */}
            <div className="recent-transactions-section">
              <h2>Transaksi Terbaru</h2>

              {recentTransactions.length === 0 ? (
                <div className="empty-state">
                  <p>Tidak ada transaksi terbaru</p>
                </div>
              ) : (
                <div className="transactions-table-wrapper">
                  <table className="transactions-table">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Nama Pelanggan</th>
                        <th>Nama Paket</th>
                        <th>Harga</th>
                        <th>Tanggal Transaksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((transaction, index) => (
                        <tr key={transaction.id} className="transaction-row">
                          <td>{index + 1}</td>
                          <td className="customer-name">
                            {transaction.customerName}
                          </td>
                          <td className="package-name">
                            {transaction.packageName}
                          </td>
                          <td className="price">
                            {formatCurrency(transaction.packagePrice)}
                          </td>
                          <td className="date">
                            {formatTransactionDate(transaction.transactionDate)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
