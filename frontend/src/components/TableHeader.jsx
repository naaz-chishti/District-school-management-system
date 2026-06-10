import { FaSearch } from "react-icons/fa";

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
        marginBottom: "20px",
        flexWrap: "wrap",
        gap: "15px"
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            color: "#111827"
          }}
        >
          {title}
        </h2>

        <p
          style={{
            margin: "5px 0 0",
            color: "#6B7280",
            fontSize: "14px"
          }}
        >
          Total Records:
          <span
            style={{
              marginLeft: "6px",
              fontWeight: "bold",
              color: "#2563EB"
            }}
          >
            {count}
          </span>
        </p>
      </div>

      <div
        style={{
          position: "relative",
          width: "300px"
        }}
      >
        <FaSearch
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#6B7280",
            fontSize: "14px"
          }}
        />

        <input
          type="text"
          placeholder={`Search ${title}...`}
          onChange={(e) =>
            onSearch(e.target.value)
          }
          style={{
            width: "80%",
            padding: "10px 15px 10px 40px",
            border: "1px solid #D1D5DB",
            borderRadius: "10px",
            outline: "none",
            fontSize: "14px",
            background: "#fff"
          }}
        />
      </div>
    </div>
  );
}

export default TableHeader;