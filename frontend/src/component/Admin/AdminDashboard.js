import React, { useState } from "react";
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
} from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";

function AdminDashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const data = [
    { name: "Total", value: 150 },
    { name: "Pending", value: 45 },
    { name: "In Progress", value: 60 },
    { name: "Resolved", value: 45 },
  ];

  return (
    <div className="admin-container">
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

      <div className="admin-dashboard-content">
        <div className="admin-card">
          <div className="admin-card-icon total">
            <FaTicketAlt />
          </div>
          <div className="admin-card-info">
            <h3>Total Tickets</h3>
            <p>150</p>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-icon pending">
            <FaHourglassHalf />
          </div>
          <div className="admin-card-info">
            <h3>Pending</h3>
            <p>45</p>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-icon progress">
            <FaTools />
          </div>
          <div className="admin-card-info">
            <h3>In Progress</h3>
            <p>60</p>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-icon resolved">
            <FaCheckCircle />
          </div>
          <div className="admin-card-info">
            <h3>Resolved</h3>
            <p>45</p>
          </div>
        </div>
      </div>

      <div className="admin-chart-section">
        <h3>Ticket Status Overview</h3>
        <div className="chart-container">
          <div className="line-chart-box">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
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
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {data.map((entry, index) => (
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
