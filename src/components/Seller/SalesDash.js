import React, { useEffect, useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, ArcElement, Title, Tooltip, Legend, PointElement } from "chart.js";

import { sellerallorder } from "../../utils/sellerutils";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, ArcElement, Title, Tooltip, Legend, PointElement);

const StatCard = ({ icon, title, value, colorClass }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
    <div className={`p-3 rounded-full ${colorClass}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
    <div className="h-80">{children}</div>
  </div>
);

const DashboardSkeleton = () => (
  <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen animate-pulse">
    <div className="h-8 w-1/3 bg-gray-200 rounded mb-8"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md h-96"></div>
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md h-96"></div>
    </div>
  </div>
);

const SalesDash = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [salesByMonth, setSalesByMonth] = useState(null);
  const [orderStatusData, setOrderStatusData] = useState(null);

  useEffect(() => {
    sellerallorder(setOrders)
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      let revenue = 0;
      let pending = 0;
      let delivered = 0;
      const monthlySales = Array(12).fill(0);

      orders.forEach((order) => {
        revenue += order.total_cost;
        const month = new Date(order.createdAt).getMonth();
        monthlySales[month] += order.total_cost;

        if (order.status === "ORDERED BUT PENDING TO DISPATCH") pending++;
        if (order.status === "DELIVERED") delivered++;
      });

      setTotalRevenue(revenue);
      setTotalOrders(orders.length);
      setPendingOrders(pending);
      setDeliveredOrders(delivered);

      setSalesByMonth({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Sales",
          data: monthlySales,
          borderColor: "#4f46e5",
          backgroundColor: "rgba(79, 70, 229, 0.1)",
          fill: true,
          tension: 0.4,
        }],
      });
      
      setOrderStatusData({
        labels: ["Pending", "Delivered", "Other"],
        datasets: [{
          label: "Order Status",
          data: [pending, delivered, orders.length - pending - delivered],
          backgroundColor: ["#f59e0b", "#10b981", "#6b7280"],
          hoverOffset: 4,
        }],
      });
    }
  }, [orders]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true }, x: { grid: { display: false } } },
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">Sales Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Revenue" 
          value={`₹${totalRevenue.toLocaleString('en-IN')}`}
          colorClass="bg-green-100 text-green-600"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>}
        />
        <StatCard 
          title="Total Orders" 
          value={totalOrders}
          colorClass="bg-blue-100 text-blue-600"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
        />
        <StatCard 
          title="Pending Orders" 
          value={pendingOrders}
          colorClass="bg-yellow-100 text-yellow-600"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard 
          title="Delivered Orders" 
          value={deliveredOrders}
          colorClass="bg-indigo-100 text-indigo-600"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1zM3 11h10" /></svg>}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <ChartCard title="Sales Over Time">
            {salesByMonth && <Line data={salesByMonth} options={chartOptions} />}
          </ChartCard>
        </div>
        <div className="lg:col-span-2">
          <ChartCard title="Order Status Distribution">
            {orderStatusData && <Doughnut data={orderStatusData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } } }} />}
          </ChartCard>
        </div>
      </div>
      
    </div>
  );
};

export default SalesDash;
