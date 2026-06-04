import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import DataTable from "../../components/DataTable";
import TableHeader from "../../components/TableHeader";

function SchoolList() {

  const navigate =
    useNavigate();

  const [
    schools,
    setSchools
  ] = useState([]);

  const [
    filteredSchools,
    setFilteredSchools
  ] = useState([]);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools =
    async () => {

      try {

        const res =
          await API.get(
            "/schools/all"
          );

        const data =
          res.data.schools || [];

        setSchools(data);
        setFilteredSchools(data);

      } catch (error) {
        console.log(error);
      }
    };

  const handleSearch =
    (value) => {

      const filtered =
        schools.filter(
          (school) =>
            school.schoolName
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            school.schoolCode
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            school.district
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            school.principalName
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              )
        );

      setFilteredSchools(
        filtered
      );
    };

  const deleteSchool =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete School?"
        );

      if (!confirmDelete)
        return;

      try {

        await API.delete(
          `/schools/delete/${id}`
        );

        alert(
          "School Deleted Successfully"
        );

        fetchSchools();

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
      key: "schoolCode",
      label: "Code"
    },
    {
      key: "district",
      label: "District"
    },
    {
      key: "principalName",
      label: "Principal"
    },
    {
      key: "status",
      label: "Status",
      render: (school) => (
        <span
          style={{
            background:
              school.status === "Active"
                ? "#dcfce7"
                : "#fee2e2",
            color:
              school.status === "Active"
                ? "#166534"
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
          {school.status}
        </span>
      )
    }
  ];

  return (
    <DashboardLayout>

      <TableHeader
        title="Schools"
        count={
          filteredSchools.length
        }
        onSearch={
          handleSearch
        }
      />

      <button
        onClick={() =>
          navigate(
            "/schools"
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
        + Add School
      </button>

      <DataTable
        columns={columns}
        data={
          filteredSchools
        }
        renderActions={
          (school) => (
            <>
              <button
                onClick={() =>
                  navigate(
                    `/schools?id=${school._id}`
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
                  deleteSchool(
                    school._id
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
          )
        }
      />

    </DashboardLayout>
  );
}

export default SchoolList;

