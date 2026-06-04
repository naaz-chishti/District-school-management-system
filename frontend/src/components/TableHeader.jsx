function TableHeader({
  title,
  count,
  onSearch
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}
    >
      <div>
        <h2>{title}</h2>
        <p>Total: {count}</p>
      </div>

      <input
        type="text"
        placeholder="Search..."
        onChange={(e) =>
          onSearch(e.target.value)
        }
        style={{
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "8px"
        }}
      />
    </div>
  );
}

export default TableHeader;