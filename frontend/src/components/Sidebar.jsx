function StatCard({
  title,
  value,
  color
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.1)",
        borderLeft:
          `5px solid ${color}`
      }}
    >
      <h4
        style={{
          color: "#6B7280"
        }}
      >
        {title}
      </h4>

      <h1
        style={{
          marginTop: "10px"
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default StatCard;