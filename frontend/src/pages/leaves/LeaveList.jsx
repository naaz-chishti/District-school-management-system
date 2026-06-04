import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import TableHeader from "../../components/TableHeader";
import DataTable from "../../components/DataTable";

function LeaveList() {
  const navigate = useNavigate();

  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  const getLeaves = async () => {
    try {
      const res = await API.get("/leaves/all");

      const data = res.data.leaves || [];

      setLeaves(data);
      setFilteredLeaves(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLeaves();
  }, []);

  const handleSearch = (value) => {
    const filtered = leaves.filter(
      (item) =>
        item.userId?.name
          ?.toLowerCase()
          .includes(value.toLowerCase()) ||
        item.leaveType
          ?.toLowerCase()
          .includes(value.toLowerCase()) ||
        item.status
          ?.toLowerCase()
          .includes(value.toLowerCase())
    );

    setFilteredLeaves(filtered);
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm("Delete Leave?");

    if (!confirmDelete) return;

    try {
      await API.delete(
        `/leaves/delete/${id}`
      );

      alert("Deleted Successfully");

      getLeaves();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    leaveId,
    status
  ) => {
    try {
      await API.put(
        "/leaves/status",
        {
          leaveId,
          status
        }
      );

      getLeaves();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      key: "user",
      label: "User",
      render: (item) =>
        item.userId?.name || "N/A"
    },
    {
      key: "leaveType",
      label: "Type"
    },
    {
      key: "reason",
      label: "Reason"
    },
    {
      key: "startDate",
      label: "Start Date",
      render: (item) =>
        new Date(
          item.startDate
        ).toLocaleDateString()
    },
    {
      key: "endDate",
      label: "End Date",
      render: (item) =>
        new Date(
          item.endDate
        ).toLocaleDateString()
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span
          style={{
            background:
              item.status === "approved"
                ? "#dcfce7"
                : item.status ===
                  "rejected"
                ? "#fee2e2"
                : "#fef3c7",
            color:
              item.status === "approved"
                ? "#166534"
                : item.status ===
                  "rejected"
                ? "#991b1b"
                : "#92400e",
            padding: "5px 10px",
            borderRadius: "20px",
            fontWeight: "bold"
          }}
        >
          {item.status}
        </span>
      )
    }
  ];

  return (
    <DashboardLayout>
      <TableHeader
        title="Leave Requests"
        count={filteredLeaves.length}
        onSearch={handleSearch}
      />

      <button
        onClick={() =>
          navigate("/leaves")
        }
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "10px 15px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        + Add Leave
      </button>

      <DataTable
        columns={columns}
        data={filteredLeaves}
        renderActions={(item) => (
          <>
            <button
              onClick={() =>
                navigate(
                  `/leaves?id=${item._id}`
                )
              }
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                marginRight: "8px",
                cursor: "pointer"
              }}
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDelete(item._id)
              }
              style={{
                background: "#dc2626",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                marginRight: "8px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>

            <button
              onClick={() =>
                updateStatus(
                  item._id,
                  "approved"
                )
              }
              style={{
                background: "#16a34a",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                marginRight: "8px",
                cursor: "pointer"
              }}
            >
              Approve
            </button>

            <button
              onClick={() =>
                updateStatus(
                  item._id,
                  "rejected"
                )
              }
              style={{
                background: "#f59e0b",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Reject
            </button>
          </>
        )}
      />
    </DashboardLayout>
  );
}

export default LeaveList;