function StatCard({
  title,
  value,
  icon
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "0.3s"
      }}
    >
      <div>
        <h3>{title}</h3>

        <h1>{value}</h1>
      </div>

      <div
        style={{
          fontSize: "35px",
          color: "#2563eb"
        }}
      >
        {icon}
      </div>
    </div>
  );
}

export default StatCard;