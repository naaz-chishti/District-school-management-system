import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "../components/TopNavbar";

function DashboardLayout({ children }) {
  
 const [mobile, setMobile] =
  useState(window.innerWidth < 768);

const [sidebarOpen,
  setSidebarOpen] =
  useState(false);

  useEffect(() => {

    const handleResize = () => {
      setMobile(
        window.innerWidth < 768
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );

  }, []);

 return (
  <div
    style={{
      display: "flex",
      minHeight: "100vh",
      background: "#f4f6f9"
    }}
  >
    <Sidebar
      isMobile={mobile}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    />

    <div
      style={{
        flex: 1,
        overflow: "auto",
        background: "#f4f6f9"
      }}
    >
      <TopNavbar
        isMobile={mobile}
        setSidebarOpen={setSidebarOpen}
      />

      <div
        style={{
          padding:
            mobile
              ? "15px"
              : "25px",
          color: "#111827"
        }}
      >
        {children}
      </div>
    </div>
  </div>
);
}

export default DashboardLayout;