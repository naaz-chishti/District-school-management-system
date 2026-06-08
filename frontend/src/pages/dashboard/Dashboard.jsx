import { useEffect, useState } from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

import StatCard from "../../components/StatCard";
import RecentActivities from "../../components/RecentActivities";
import QuickActions from "../../components/QuickActions";
import UpcomingEvents from "../../components/UpcomingEvents";
import WelcomeBanner from "../../components/WelcomeBanner";
import { toast } from "react-toastify";


import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSchool,
  FaMoneyBill
} from "react-icons/fa";

function Dashboard() {

  const [data, setData] =
    useState({});

  const [role, setRole] =
    useState("");

  const getDashboard =
    async () => {

      try {

        const res =
          await API.get(
            "/dashboard"
          );

        setData({
          ...res.data.dashboard,
          recentActivities:
            res.data.recentActivities || []
        });

        setRole(
          res.data.role || ""
        );

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
          "Something went wrong"
        );
        console.log(error);
      }
    };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <DashboardLayout>

      <WelcomeBanner
        data={data}
      />

      <div
        style={{
          marginBottom: "25px"
        }}
      >
        <h1
          style={{
            marginBottom: "5px"
          }}
        >
          Welcome Back 👋
        </h1>

        <p
          style={{
            color: "#6b7280",
            fontSize: "15px"
          }}
        >
          Manage your School ERP from one place.
        </p>

        <h3
          style={{
            color: "#2563eb",
            marginTop: "10px"
          }}
        >
          Role : {role}
        </h3>
      </div>

      {/* Stats */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px"
        }}
      >

        <StatCard
          title="Students"
          value={
            data.totalStudents || 0
          }
          icon={
            <FaUserGraduate />
          }
          color="#2563eb"
        />

        <StatCard
          title="Teachers"
          value={
            data.totalTeachers || 0
          }
          icon={
            <FaChalkboardTeacher />
          }
          color="#16a34a"
        />

        <StatCard
          title="Schools"
          value={
            data.totalSchools || 0
          }
          icon={
            <FaSchool />
          }
          color="#9333ea"
        />

        <StatCard
          title="Fees Collection"
          value={
            data.totalFeesCollected || 0
          }
          icon={
            <FaMoneyBill />
          }
          color="#ea580c"
        />

        <StatCard
          title="Parents"
          value={
            data.totalParents || 0
          }
          icon={
            <FaUserGraduate />
          }
          color="#dc2626"
        />

        <StatCard
          title="Events"
          value={
            data.totalEvents || 0
          }
          icon={
            <FaSchool />
          }
          color="#7c3aed"
        />

        <StatCard
          title="Leaves"
          value={
            data.totalLeaves || 0
          }
          icon={
            <FaChalkboardTeacher />
          }
          color="#059669"
        />

        <StatCard
          title="Notifications"
          value={
            data.totalNotifications || 0
          }
          icon={
            <FaMoneyBill />
          }
          color="#ea580c"
        />

      </div>

      {/* Activities + Events */}

      <div
  style={{
    display: "grid",
    gridTemplateColumns:
      window.innerWidth < 768
        ? "1fr"
        : "2fr 1fr",
    gap: "20px",
    marginTop: "30px"
  }}
>
  <RecentActivities
    activities={
      data.recentActivities || []
    }
  />

  <UpcomingEvents
    events={
      data.upcomingEvents || []
    }
  />
</div>

      

      {/* Quick Actions */}

      <div
        style={{
          marginTop: "30px"
        }}
      >
        <QuickActions />
      </div>

    </DashboardLayout>
  );
}

export default Dashboard;