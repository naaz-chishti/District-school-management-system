import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import TableHeader from "../../components/TableHeader";
import DataTable from "../../components/DataTable";

function FeeList() {

  const navigate =
    useNavigate();

  const [
    fees,
    setFees
  ] = useState([]);

  const [
    filteredFees,
    setFilteredFees
  ] = useState([]);

  const getFees =
    async () => {

      try {

        const res =
          await API.get(
            "/fees/all"
          );

        const data =
          res.data.fees || [];

        setFees(data);
        setFilteredFees(data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {
    getFees();
  }, []);

  const handleSearch =
    (value) => {

      const filtered =
        fees.filter(
          (fee) =>
            fee.studentId?.name
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            fee.schoolId?.schoolName
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            fee.paymentStatus
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              )
        );

      setFilteredFees(
        filtered
      );
    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete Fee Record?"
        );

      if (!confirmDelete)
        return;

      try {

        await API.delete(
          `/fees/delete/${id}`
        );

        alert(
          "Fee Deleted Successfully"
        );

        getFees();

      } catch (error) {

        console.log(error);
      }
    };

  const columns = [
    {
      key: "student",
      label: "Student",
      render: (fee) =>
        fee.studentId?.name || "N/A"
    },
    {
      key: "school",
      label: "School",
      render: (fee) =>
        fee.schoolId?.schoolName || "N/A"
    },
    {
      key: "totalFee",
      label: "Total Fee",
      render: (fee) =>
        `₹${fee.totalFee}`
    },
    {
      key: "paidAmount",
      label: "Paid",
      render: (fee) =>
        `₹${fee.paidAmount}`
    },
    {
      key: "remainingAmount",
      label: "Remaining",
      render: (fee) =>
        `₹${fee.remainingAmount}`
    },
    {
      key: "paymentStatus",
      label: "Status",
      render: (fee) => (
        <span
          style={{
            background:
              fee.paymentStatus === "Paid"
                ? "#dcfce7"
                : fee.paymentStatus === "Partial"
                ? "#fef3c7"
                : "#fee2e2",

            color:
              fee.paymentStatus === "Paid"
                ? "#166534"
                : fee.paymentStatus === "Partial"
                ? "#92400e"
                : "#991b1b",

            padding:
              "5px 10px",

            borderRadius:
              "20px",

            fontSize:
              "12px",

            fontWeight:
              "bold"
          }}
        >
          {fee.paymentStatus}
        </span>
      )
    },
    {
      key: "paymentMethod",
      label: "Method"
    }
  ];

  return (
    <DashboardLayout>

      <TableHeader
        title="Fees"
        count={
          filteredFees.length
        }
        onSearch={
          handleSearch
        }
      />

      <button
        onClick={() =>
          navigate(
            "/fees"
          )
        }
        style={{
          background:
            "#2563eb",
          color:
            "#fff",
          border:
            "none",
          padding:
            "10px 15px",
          borderRadius:
            "8px",
          cursor:
            "pointer",
          marginBottom:
            "20px"
        }}
      >
        + Add Fee
      </button>

      <DataTable
        columns={columns}
        data={
          filteredFees
        }
        renderActions={(fee) => (
          <>
            <button
              onClick={() =>
                navigate(
                  `/fees?id=${fee._id}`
                )
              }
              style={{
                background:
                  "#2563eb",
                color:
                  "#fff",
                border:
                  "none",
                padding:
                  "6px 12px",
                borderRadius:
                  "6px",
                marginRight:
                  "10px",
                cursor:
                  "pointer"
              }}
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDelete(
                  fee._id
                )
              }
              style={{
                background:
                  "#dc2626",
                color:
                  "#fff",
                border:
                  "none",
                padding:
                  "6px 12px",
                borderRadius:
                  "6px",
                cursor:
                  "pointer"
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

export default FeeList;

