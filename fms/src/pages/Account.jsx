import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const Account = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("No token found. Please login.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch profile.");
          return;
        }

        setProfile(data);
      } catch (err) {
        setError("Something went wrong. Try again later.");
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  // Placeholder demo data
  const storageData = [
    { name: "Used", value: 65 },
    { name: "Free", value: 35 },
  ];

  const fileData = [
    { type: "Images", count: 10 },
    { type: "Docs", count: 7 },
    { type: "Videos", count: 4 },
    { type: "Others", count: 3 },
  ];

  const COLORS = ["#3182CE", "#A0AEC0"];

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!profile) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="w-6xl mx-auto bg-white p-8 rounded-xl shadow mt-10">
      <div className="flex items-center space-x-6 mb-8">
        <FaUserCircle className="text-blue-500 text-7xl" />
        <div>
          <h2 className="text-3xl font-bold">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Storage Usage Pie Chart */}
        <div className="bg-blue-50 rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">Storage Usage</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={storageData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {storageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* File Types Bar Chart */}
        <div className="bg-blue-50 rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">Files by Type</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={fileData}>
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3182CE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Account;
