import "./StatCard.css";

function StatCard({
  title,
  value,
  icon,
  color
}) {
  return (
    <div
      className="stat-card"
    >
      <div
        className="stat-icon"
        style={{
          color: color
        }}
      >
        {icon}
      </div>

      <div>
        <h4>{title}</h4>

        <h2
          style={{
            color: color
          }}
        >
          {value}
        </h2>
      </div>
    </div>
  );
}

export default StatCard;