function WelcomeBanner({ data }) {
  return (
    <div
      style={{
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