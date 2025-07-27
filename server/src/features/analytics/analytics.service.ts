// Mock data example — replace with real DB queries later
export const getAnalyticsData = async () => {
  // Example: Fetch and aggregate data from invoices, users, payments, etc.
  
  const mockAnalytics = {
    totalRevenue: 12500,
    invoicesPaid: 18,
    invoicesDue: 7,
    topClient: 'Anna',
    monthlyBreakdown: [
      { month: 'May', revenue: 3000 },
      { month: 'June', revenue: 4800 },
      { month: 'July', revenue: 4700 },
    ],
  };

  return mockAnalytics;
};
