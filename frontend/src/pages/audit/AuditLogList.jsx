import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import TableHeader from "../../components/TableHeader";
import DataTable from "../../components/DataTable";

function AuditLogList() {

  const [
    logs,
    setLogs
  ] = useState([]);

  const [
    filteredLogs,
    setFilteredLogs
  ] = useState([]);

  const fetchLogs =
    async () => {

      try {

        const response =
          await API.get(
            "/audit/all"
          );

        const data =
          response.data.logs || [];

        setLogs(data);
        setFilteredLogs(data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSearch =
    (value) => {

      const filtered =
        logs.filter(
          (item) =>
            item.userId?.name
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            item.userId?.role
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            item.action
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            item.module
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              )
        );

      setFilteredLogs(
        filtered
      );
    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete Audit Log?"
        );

      if (!confirmDelete)
        return;

      try {

        await API.delete(
          `/audit/delete/${id}`
        );

        alert(
          "Deleted Successfully"
        );

        fetchLogs();

      } catch (error) {

        console.log(error);
      }
    };

  const columns = [
    {
      key: "user",
      label: "User",
      render: (item) =>
        item.userId?.name ||
        "N/A"
    },
    {
      key: "role",
      label: "Role",
      render: (item) =>
        item.userId?.role ||
        "N/A"
    },
    {
      key: "action",
      label: "Action"
    },
    {
      key: "module",
      label: "Module"
    },
    {
      key: "details",
      label: "Details"
    },
    {
      key: "createdAt",
      label: "Date",
      render: (item) =>
        new Date(
          item.createdAt
        ).toLocaleDateString()
    }
  ];

  return (
    <DashboardLayout>

      <TableHeader
        title="Audit Logs"
        count={
          filteredLogs.length
        }
        onSearch={
          handleSearch
        }
      />

      <DataTable
        columns={columns}
        data={filteredLogs}
        renderActions={(item) => (
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
        )}
      />

    </DashboardLayout>
  );
}

export default AuditLogList;