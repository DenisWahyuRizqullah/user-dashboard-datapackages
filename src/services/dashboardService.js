import api from "./api";

/**
 * Fetch all dashboard data in parallel
 * @returns {Promise} Object with customers, transactions, and packages
 */
export const getDashboardData = async () => {
  try {
    const [customersRes, transactionsRes, packagesRes] = await Promise.all([
      api.get("/customers"),
      api.get("/transactions"),
      api.get("/packages")
    ]);

    return {
      customers: customersRes.data,
      transactions: transactionsRes.data,
      packages: packagesRes.data
    };
  } catch (error) {
    throw new Error(`Failed to fetch dashboard data: ${error.message}`);
  }
};

/**
 * Calculate total revenue by matching transactions with package prices
 * @param {Array} transactions - List of transactions with packageId
 * @param {Array} packages - List of packages with prices
 * @returns {number} Total revenue sum
 */
export const calculateTotalRevenue = (transactions = [], packages = []) => {
  if (!transactions.length || !packages.length) {
    return 0;
  }

  // Create a package map for O(1) lookup: { packageId: price }
  const packageMap = packages.reduce((acc, pkg) => {
    acc[pkg.id] = pkg.price || 0;
    return acc;
  }, {});

  // Sum up revenue by matching transaction packageId with package price
  return transactions.reduce((total, transaction) => {
    const packagePrice = packageMap[transaction.packageId] || 0;
    return total + packagePrice;
  }, 0);
};

/**
 * Get recent transactions with enriched data (customer and package info)
 * @param {Array} transactions - List of transactions
 * @param {Array} customers - List of customers
 * @param {Array} packages - List of packages
 * @param {number} limit - Number of recent transactions to return
 * @returns {Array} Enriched transaction list sorted by date (newest first)
 */
export const getRecentTransactions = (
  transactions = [],
  customers = [],
  packages = [],
  limit = 5
) => {
  // Create lookup maps for quick access
  const customerMap = customers.reduce((acc, customer) => {
    acc[customer.id] = customer;
    return acc;
  }, {});

  const packageMap = packages.reduce((acc, pkg) => {
    acc[pkg.id] = pkg;
    return acc;
  }, {});

  // Enrich transactions with customer and package data
  const enrichedTransactions = transactions.map((transaction) => ({
    ...transaction,
    customerName: customerMap[transaction.customerId]?.name || "Unknown",
    packageName: packageMap[transaction.packageId]?.name || "Unknown",
    packagePrice: packageMap[transaction.packageId]?.price || 0,
    transactionDate: transaction.transactionDate || transaction.date || transaction.createdAt || new Date().toISOString()
  }));

  // Sort by date (newest first) and return limited results
  return enrichedTransactions
    .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate))
    .slice(0, limit);
};

/**
 * Format currency for display
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: IDR)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = "IDR") => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Format transaction date for display
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatTransactionDate = (date) => {
  if (!date) return "-";
  try {
    return new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  } catch {
    return "-";
  }
};
