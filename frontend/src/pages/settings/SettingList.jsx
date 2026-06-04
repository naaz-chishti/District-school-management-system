import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import TableHeader from "../../components/TableHeader";
import DataTable from "../../components/DataTable";

function SettingList() {
  const navigate = useNavigate();

  const [settings, setSettings] =
    useState([]);

  const [
    filteredSettings,
    setFilteredSettings
  ] = useState([]);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings =
    async () => {
      try {
        const res =
          await API.get(
            "/settings/all"
          );

        const data =
          res.data.settings || [];

        setSettings(data);
        setFilteredSettings(
          data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleSearch =
    (value) => {
      const filtered =
        settings.filter(
          (setting) =>
            setting.schoolName
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||
            setting.schoolEmail
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||
            setting.schoolPhone
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              )
        );

      setFilteredSettings(
        filtered
      );
    };

  const deleteSetting =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete Setting?"
        );

      if (!confirmDelete)
        return;

      try {
        await API.delete(
          `/settings/delete/${id}`
        );

        alert(
          "Deleted Successfully"
        );

        fetchSettings();
      } catch (error) {
        console.log(error);
      }
    };

  const columns = [
    {
      key: "schoolName",
      label: "School Name"
    },
    {
      key: "schoolEmail",
      label: "Email"
    },
    {
      key: "schoolPhone",
      label: "Phone"
    },
    {
      key: "academicYear",
      label: "Academic Year"
    },
    {
      key: "timezone",
      label: "Timezone"
    }
  ];

  return (
    <DashboardLayout>
      <TableHeader
        title="Settings"
        count={
          filteredSettings.length
        }
        onSearch={
          handleSearch
        }
      />

      <button
        onClick={() =>
          navigate(
            "/settings"
          )
        }
        style={{
          background:
            "#2563eb",
          color: "#fff",
          border: "none",
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
        + Add Setting
      </button>

      <DataTable
        columns={columns}
        data={
          filteredSettings
        }
        renderActions={(item) => (
          <button
            onClick={() =>
              deleteSetting(
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

export default SettingList;