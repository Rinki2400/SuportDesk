import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import { getDashboardStats } from "../../api/axios";
import AdminNavbar from "./AdminNavbar";
import AdminCards from "./AdminCards";
import AdminCharts from "./AdminCharts";

function AdminDashboard({ refreshFlag }) {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    closed:0
  });

  useEffect(() => {
  const fetchStats = async () => {
    const data = await getDashboardStats();
    setStats(data);
  };
  fetchStats();
}, [refreshFlag]); 


  const chartData = [
    { name: "Total", value: stats.total },
    { name: "Pending", value: stats.pending },
    { name: "In Progress", value: stats.inProgress },
    { name: "Resolved", value: stats.resolved },
    { name: "Closed", value: stats.closed },
  ];

  return (
    <div className="admin-container">
      <AdminNavbar />
      <AdminCards stats={stats} />
      <AdminCharts chartData={chartData} />
    </div>
  );
}

export default AdminDashboard;
