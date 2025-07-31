import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import {
  FaTicketAlt,
  FaHourglassHalf,
  FaTools,
  FaCheckCircle,
  FaChevronDown,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { getDashboardStats } from "../../api/axios";

function AdminDashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error.message);
      }
    };

    fetchStats();
  }, []);

  const chartData = [
    { name: "Total", value: stats.total },
    { name: "Pending", value: stats.pending },
    { name: "In Progress", value: stats.inProgress },
    { name: "Resolved", value: stats.resolved },
  ];

  return (
    <div className="admin-container">
      {/* Navbar */}
      <div className="admin-navbar">
        <div className="admin-left">
          <h2 className="admin-title">Admin Dashboard</h2>
        </div>

        <div
          className="admin-wrapper"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="admin-info">
            <span className="admin-role">Admin</span>
          </div>
          <FaChevronDown className="admin-arrow" />
        </div>

        {dropdownOpen && (
          <div className="admin-menu">
            <div className="admin-item">Profile</div>
            <div className="admin-item">Settings</div>
            <div className="admin-item">Logout</div>
          </div>
        )}
      </div>

      {/* Cards */}
      <div className="admin-dashboard-content">
        <div className="admin-card">
          <div className="admin-card-icon total">
            <FaTicketAlt />
          </div>
          <div className="admin-card-info">
            <h3>Total Tickets</h3>
            <p>{stats.total}</p>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-icon pending">
            <FaHourglassHalf />
          </div>
          <div className="admin-card-info">
            <h3>Pending</h3>
            <p>{stats.pending}</p>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-icon progress">
            <FaTools />
          </div>
          <div className="admin-card-info">
            <h3>In Progress</h3>
            <p>{stats.inProgress}</p>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-icon resolved">
            <FaCheckCircle />
          </div>
          <div className="admin-card-info">
            <h3>Resolved</h3>
            <p>{stats.resolved}</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="admin-chart-section">
        <h3>Ticket Status Overview</h3>
        <div className="chart-container">
          <div className="line-chart-box">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="pie-chart-box">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ["#8884d8", "#ffc658", "#82ca9d", "#ff7f50"][index % 4]
                      }
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
