import Sidebar from "./Sidebar";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";

function DashboardLayout({
  children
}) {
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
          display: "flex",
          flexDirection: "column"
        }}
      >
        <TopNavbar />

        <div
          style={{
            flex: 1,
            padding: "25px",
            overflow: "auto"
          }}
        >
          {children}
        </div>

        <Footer />

      </div>

    </div>
  );
}

export default DashboardLayout;