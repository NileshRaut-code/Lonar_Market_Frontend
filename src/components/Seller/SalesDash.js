import React, { useEffect, useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, ArcElement, Title, Tooltip, Legend, PointElement } from "chart.js"; // Import LineElement for Line chart

import { sellerallorder } from "../../utils/sellerutils"; // Importing your sellerallorder function
import Loading from "../Loader comp/Loading"; // Import your Loading component

// Register necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement, // Register LineElement for Line charts
  ArcElement, // Register ArcElement for Doughnut and Pie charts
  Title,
  Tooltip,
  Legend,
  PointElement
);

const SalesDash = () => {
  const [data, setData] = useState(null); // State to hold the fetched orders data
  const [salesData, setSalesData] = useState(null);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [salesByCategory, setSalesByCategory] = useState([0, 0, 0, 0, 0]); // Mock categories
  const [highestSellingProducts, setHighestSellingProducts] = useState([]); // Highest selling products data
  const [loading, setLoading] = useState(true); // Loading state to handle the loading spinner

  // Fetching the orders data when the component mounts
  useEffect(() => {
    sellerallorder(setData)
      .then(() => setLoading(false)) // Set loading to false once data is fetched
      .catch((error) => {
        setLoading(false); // Handle error and stop loading
        console.error("Error fetching orders:", error);
      });
  }, []); // Empty dependency array to run only once when the component mounts

  // Prepare the data when orders are fetched
  useEffect(() => {
    if (data && data.length > 0) {
      let totalSales = 0;
      let pending = 0;
      let delivered = 0;
      let salesPerMonth = Array(12).fill(0); // Sales per month (0-based)
      const productSales = {}; // To store sales for each product

      // Loop through orders and calculate required metrics
      data.forEach((order) => {
        totalSales += order.total_cost;
        const month = new Date(order.createdAt).getMonth(); // 0-based month
        salesPerMonth[month] += order.total_cost;

        if (order.status === "ORDERED BUT PENDING TO DISPATCH") {
          pending += 1;
        }

        if (order.status === "DELIVERED") {
          delivered += 1;
        }

        // Aggregate product sales
        if (order.productDetails) {
          // Handle cases where products are directly in order.productDetails (as in your sample data)
          const productName = order.productDetails.title;
          const productPrice = order.price;
          const productQuantity = order.quantity;

          if (!productSales[productName]) {
            productSales[productName] = 0;
          }

          productSales[productName] += productPrice * productQuantity;
        }
      });

      // Set the sales data for the line chart
      setSalesData({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Sales",
            data: salesPerMonth,
            borderColor: "rgb(34, 197, 94)",
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            tension: 0.1,
          },
        ],
      });

      // Set pending and delivered orders count
      setPendingOrders(pending);
      setDeliveredOrders(delivered);

      // Sales by Category (mocked categories)
      const categorySales = [0, 0, 0, 0, 0]; // 5 categories: Electronics, Furniture, Groceries, Clothing, Others
      data.forEach((order) => {
        categorySales[0] += order.total_cost; // Example: All orders categorized as Electronics for now
      });
      setSalesByCategory(categorySales);

      // Prepare the data for the highest-selling products chart
      const sortedProducts = Object.entries(productSales)
        .sort((a, b) => b[1] - a[1]) // Sort products by sales amount (descending)
        .slice(0, 5); // Take top 5 products
      setHighestSellingProducts(sortedProducts);
    }
  }, [data]);

  // If loading, show the Loading component
  if (loading) {
    return <Loading />; // This will show the Loading spinner
  }

  const doughnutOptions = {
    responsive: true,  // Ensures the chart is responsive
    plugins: {
      tooltip: {
        enabled: true,  // Enable tooltips
      },
      legend: {
        position: "top", // Position of the legend (you can change to "bottom", "left", etc.)
      },
    },
    elements: {
      arc: {
        borderWidth: 1, // Border width for each segment
      },
    },
    cutout: "70%", // Adjust the cutout (hole size) – reduce it to make the hole smaller
    radius: "80%", // Adjust the radius to make the whole chart smaller or bigger
  };
  // Data for the bar chart (Pending vs Delivered Orders)
  const orderData = {
    labels: ["Pending", "Delivered"],
    datasets: [
      {
        label: "Orders",
        data: [pendingOrders, deliveredOrders],
        backgroundColor: ["rgba(252, 165, 165)", "rgba(34, 197, 94)"],
        borderColor: ["rgba(252, 165, 165)", "rgba(34, 197, 94)"],
        borderWidth: 1,
      },
    ],
  };

  // Data for the Doughnut chart (Sales by Category)
  const salesDistributionData = {
    labels: ["Electronics", "Furniture", "Groceries", "Clothing", "Others"],
    datasets: [
      {
        label: "Sales by Category",
        data: salesByCategory,
        backgroundColor: [
          "rgba(59, 130, 246)", // Blue
          "rgba(245, 158, 11)", // Yellow
          "rgba(34, 197, 94)",  // Green
          "rgba(255, 99, 132)", // Red
          "rgba(255, 159, 64)", // Orange
        ],
      },
    ],
  };

  // Data for the Bar chart (Highest Selling Products)
  const highestSellingProductsData = {
    labels: highestSellingProducts.map(([productName]) => 
        productName.length > 10 ? productName.substring(0, 10) + '...' : productName
      ),
    datasets: [
      {
        label: "Product Sales",
        data: highestSellingProducts.map(([, totalSales]) => totalSales),
        backgroundColor: "rgba(59, 130, 246)",
        borderColor: "rgba(59, 130, 246)",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: true, // Disable aspect ratio so it fills the container
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: false,
        max: Math.max(...highestSellingProducts.map(([, sales]) => sales)) * 1.5, // Make sure the chart is scaled well
      },
    },
  };

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold text-gray-800">Sales Dashboard</h1>
        <div className="text-gray-600 text-xl">Welcome, Seller</div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Total Sales</h2>
            <p className="text-3xl font-bold text-green-600">
              ₹ {data.reduce((acc, order) => acc + order.total_cost, 0)}
            </p>
          </div>
          <div className="text-green-600 text-4xl">💰</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Pending Orders</h2>
            <p className="text-3xl font-bold text-yellow-600">{pendingOrders}</p>
          </div>
          <div className="text-yellow-600 text-4xl">⏳</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Delivered Orders</h2>
            <p className="text-3xl font-bold text-green-600">{deliveredOrders}</p>
          </div>
          <div className="text-green-600 text-4xl">✔️</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Line Chart: Sales Trend */}
        {salesData && salesData.labels && salesData.datasets && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Sales Trend</h2>
            <Line data={salesData} />
          </div>
        )}

        {/* Bar Chart: Pending vs Delivered Orders */}
        {orderData && orderData.labels && orderData.datasets && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Pending vs Delivered Orders</h2>
            <Bar data={orderData} />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Bar Chart: Highest Selling Products */}
         {highestSellingProductsData && highestSellingProductsData.labels && highestSellingProductsData.datasets && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">some charts</h2>
            <div className="flex-1">        
            </div>
          </div>
        )} 
         {highestSellingProductsData && highestSellingProductsData.labels && highestSellingProductsData.datasets && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Highest Selling Products</h2>
            <div className="flex-1">          <Bar data={highestSellingProductsData} options={barChartOptions} />
            </div>
          </div>
        )} 
        {highestSellingProductsData && highestSellingProductsData.labels && highestSellingProductsData.datasets && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">some charts</h2>
            <div className="flex-1">        
            </div>
          </div>
        )} 
        

      
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Doughnut Chart: Sales by Category */}
          {highestSellingProductsData && highestSellingProductsData.labels && highestSellingProductsData.datasets && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">some charts</h2>
            <div className="flex-1">        
            </div>
          </div>
        )} 
        {highestSellingProductsData && highestSellingProductsData.labels && highestSellingProductsData.datasets && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">some charts</h2>
            <div className="flex-1">        
            </div>
          </div>
        )} 
        {salesDistributionData && salesDistributionData.labels && salesDistributionData.datasets && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Sales Distribution by Category</h2>
            <Doughnut data={salesDistributionData} options={doughnutOptions}/>
          </div>
        )}

      
      </div>
      
    </div>
  );
};

export default SalesDash;
