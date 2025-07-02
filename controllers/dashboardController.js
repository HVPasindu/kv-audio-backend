// backend/controllers/dashboardController.js
import Order from "../models/order.js";
import User from "../models/user.js";
import Product from "../models/product.js";

export async function getDashboardData(req, res) {
  try {
    // Get the total number of orders
    const totalOrders = await Order.countDocuments();

    // Get the total number of users
    const totalUsers = await User.countDocuments();

    // Get the total number of products
    const totalProducts = await Product.countDocuments();

    // Get the total sales (sum of totalAmount in all orders)
    const totalSales = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    // If totalSales is empty, it means no sales yet.
    const totalSalesAmount = totalSales.length > 0 ? totalSales[0].total : 0;

    // Respond with the dashboard data
    res.json({
      totalOrders,
      totalUsers,
      totalProducts,
      totalSales: totalSalesAmount,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
}
