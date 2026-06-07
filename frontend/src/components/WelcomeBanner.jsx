function WelcomeBanner({ data }) {
  return (
   <div
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "scale(1.01)";
    e.currentTarget.style.boxShadow =
      "0px 10px 25px rgba(0,0,0,0.2)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "scale(1)";
    e.currentTarget.style.boxShadow =
      "none";
  }}
  style={{
        transition: "all 0.3s ease",
        cursor: "pointer",
        background:
          "linear-gradient(135deg,#2563eb,#1d4ed8)",
        color: "#fff",
        padding: "25px",
        borderRadius: "15px",
        marginBottom: "20px"
      }}
    >
      <h2>
        Welcome to School ERP 🚀
      </h2>

      <p>
        Manage students, teachers, attendance,
        fees, exams and school activities
        from one place.
      </p>
    </div>
  );
}

export default WelcomeBanner;