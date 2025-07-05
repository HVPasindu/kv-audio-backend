
import Order from "../models/order.js";
import User from "../models/user.js";
import Product from "../models/product.js";

export async function getDashboardData(req, res) {
  try {
    
    const totalOrders = await Order.countDocuments();

    
    const totalUsers = await User.countDocuments();

    
    const totalProducts = await Product.countDocuments();

    
    const totalSales = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    
    const totalSalesAmount = totalSales.length > 0 ? totalSales[0].total : 0;

    
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
