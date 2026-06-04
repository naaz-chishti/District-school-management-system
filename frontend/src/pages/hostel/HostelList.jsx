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

function HostelList() {

  const navigate =
    useNavigate();

  const [
    hostels,
    setHostels
  ] = useState([]);

  const [
    filteredHostels,
    setFilteredHostels
  ] = useState([]);

  const getHostels =
    async () => {

      try {

        const res =
          await API.get(
            "/hostel/all"
          );

        const data =
          res.data.hostels || [];

        setHostels(data);
        setFilteredHostels(data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {
    getHostels();
  }, []);

  const handleSearch =
    (value) => {

      const filtered =
        hostels.filter(
          (hostel) =>
            hostel.hostelName
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            hostel.roomNumber
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            hostel.wardenName
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              )
        );

      setFilteredHostels(
        filtered
      );
    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete Hostel?"
        );

      if (!confirmDelete)
        return;

      try {

        await API.delete(
          `/hostel/delete/${id}`
        );

        alert(
          "Hostel Deleted Successfully"
        );

        getHostels();

      } catch (error) {

        console.log(error);
      }
    };

  const columns = [
    {
      key: "hostelName",
      label: "Hostel"
    },
    {
      key: "roomNumber",
      label: "Room"
    },
    {
      key: "roomType",
      label: "Type"
    },
    {
      key: "capacity",
      label: "Capacity"
    },
    {
      key: "wardenName",
      label: "Warden"
    },
    {
      key: "hostelFee",
      label: "Fee",
      render: (hostel) =>
        `₹${hostel.hostelFee}`
    },
    {
      key: "status",
      label: "Status",
      render: (hostel) => (
        <span
          style={{
            background:
              hostel.status === "Available"
                ? "#dcfce7"
                : "#fee2e2",
            color:
              hostel.status === "Available"
                ? "#166534"
                : "#991b1b",
            padding:
              "5px 10px",
            borderRadius:
              "20px",
            fontWeight:
              "bold"
          }}
        >
          {hostel.status}
        </span>
      )
    }
  ];

  return (
    <DashboardLayout>

      <TableHeader
        title="Hostels"
        count={
          filteredHostels.length
        }
        onSearch={
          handleSearch
        }
      />

      <button
        onClick={() =>
          navigate("/hostel")
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
        + Add Hostel
      </button>

      <DataTable
        columns={columns}
        data={filteredHostels}
        renderActions={(hostel) => (
          <>
            <button
              onClick={() =>
                navigate(
                  `/hostel?id=${hostel._id}`
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
                  hostel._id
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

export default HostelList;

