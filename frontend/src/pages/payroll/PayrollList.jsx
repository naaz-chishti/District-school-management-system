import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import TableHeader from "../../components/TableHeader";
import DataTable from "../../components/DataTable";

function PayrollList() {
  const navigate = useNavigate();

  const [payrolls, setPayrolls] = useState([]);
  const [filteredPayrolls, setFilteredPayrolls] = useState([]);

  const getPayrolls = async () => {
    try {
      const res = await API.get("/payroll/all");

      const data = res.data.payrolls || [];

      setPayrolls(data);
      setFilteredPayrolls(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPayrolls();
  }, []);

  const handleSearch = (value) => {
    const filtered = payrolls.filter(
      (item) =>
        item.teacherId?.name
          ?.toLowerCase()
          .includes(value.toLowerCase()) ||
        item.month
          ?.toLowerCase()
          .includes(value.toLowerCase()) ||
        item.year
          ?.toString()
          .includes(value)
    );

    setFilteredPayrolls(filtered);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete Payroll?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(
        `/payroll/delete/${id}`
      );

      alert(
        "Payroll Deleted Successfully"
      );

      getPayrolls();
    } catch (error) {

  toast.error(
    error.response?.data?.message ||
    "Something went wrong"
  );

  console.log(error);
}
  };

  const columns = [
    {
      key: "teacher",
      label: "Teacher",
      render: (item) =>
        item.teacherId?.name || "N/A"
    },
    {
      key: "salary",
      label: "Salary",
      render: (item) =>
        `₹${item.netSalary}`
    },
    {
      key: "month",
      label: "Month"
    },
    {
      key: "year",
      label: "Year"
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span
          style={{
            background:
              item.paymentStatus === "Paid"
                ? "#dcfce7"
                : "#fee2e2",
            color:
              item.paymentStatus === "Paid"
                ? "#166534"
                : "#991b1b",
            padding: "5px 10px",
            borderRadius: "20px",
            fontWeight: "bold"
          }}
        >
          {item.paymentStatus}
        </span>
      )
    }
  ];

  return (
    <DashboardLayout>

      <TableHeader
        title="Payrolls"
        count={filteredPayrolls.length}
        onSearch={handleSearch}
      />

      <button
        onClick={() =>
          navigate("/payroll")
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
        + Add Payroll
      </button>

      <DataTable
        columns={columns}
        data={filteredPayrolls}
        renderActions={(item) => (
          <>
            <button
              onClick={() =>
                navigate(
                  `/payroll?id=${item._id}`
                )
              }
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                marginRight: "10px",
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
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </>
        )}
      />

    </DashboardLayout>
  );
}

export default PayrollList;