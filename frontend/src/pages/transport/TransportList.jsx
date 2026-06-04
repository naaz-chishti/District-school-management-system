import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import TableHeader from "../../components/TableHeader";
import DataTable from "../../components/DataTable";

function TransportList() {

  const navigate = useNavigate();

  const [transport, setTransport] =
    useState([]);

  const [
    filteredTransport,
    setFilteredTransport
  ] = useState([]);

  const getTransport =
    async () => {

      try {

        const res =
          await API.get(
            "/transports/all"
          );

        const data =
          res.data.transport || [];

        setTransport(data);
        setFilteredTransport(data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {
    getTransport();
  }, []);

  const handleSearch =
    (value) => {

      const filtered =
        transport.filter(
          (item) =>
            item.busNumber
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            item.driverName
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            item.routeName
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              )
        );

      setFilteredTransport(
        filtered
      );
    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete Transport?"
        );

      if (!confirmDelete)
        return;

      try {

        await API.delete(
          `/transports/delete/${id}`
        );

        alert(
          "Transport Deleted Successfully"
        );

        getTransport();

      } catch (error) {

        console.log(error);
      }
    };

  const columns = [
    {
      key: "busNumber",
      label: "Bus Number"
    },
    {
      key: "driverName",
      label: "Driver"
    },
    {
      key: "routeName",
      label: "Route"
    },
    {
      key: "capacity",
      label: "Capacity"
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span
          style={{
            background:
              item.status === "Active"
                ? "#dcfce7"
                : "#fee2e2",
            color:
              item.status === "Active"
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
          {item.status}
        </span>
      )
    }
  ];

  return (
    <DashboardLayout>

      <TableHeader
        title="Transport"
        count={
          filteredTransport.length
        }
        onSearch={
          handleSearch
        }
      />

      <button
        onClick={() =>
          navigate("/transport")
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
        + Add Transport
      </button>

      <DataTable
        columns={columns}
        data={filteredTransport}
        renderActions={(item) => (
          <>
            <button
              onClick={() =>
                navigate(
                  `/transport?id=${item._id}`
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
                  item._id
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

export default TransportList;

