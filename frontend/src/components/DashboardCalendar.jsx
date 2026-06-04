import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function DashboardCalendar() {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "15px",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.1)"
      }}
    >
      <h3>
        📅 Calendar
      </h3>

      <Calendar />
    </div>
  );
}

export default DashboardCalendar;