import Sidebar from "./Sidebar";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";

function DashboardLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f4f6f9"
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          overflow: "auto"
        }}
      >
        <TopNavbar />

        <div
          style={{
            padding: "25px"
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;