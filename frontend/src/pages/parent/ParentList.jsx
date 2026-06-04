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

function ParentList() {

  const navigate =
    useNavigate();

  const [
    parents,
    setParents
  ] = useState([]);

  const [
    filteredParents,
    setFilteredParents
  ] = useState([]);

  const getParents =
    async () => {

      try {

        const res =
          await API.get(
            "/parents/all"
          );

        const data =
          res.data.parents || [];

        setParents(data);
        setFilteredParents(data);

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    getParents();
  }, []);

  const handleSearch =
    (value) => {

      const filtered =
        parents.filter(
          (parent) =>
            parent.phone
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            parent.occupation
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            parent.address
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              )
        );

      setFilteredParents(
        filtered
      );
    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete Parent?"
        );

      if (!confirmDelete)
        return;

      try {

        await API.delete(
          `/parents/delete/${id}`
        );

        alert(
          "Parent Deleted Successfully"
        );

        getParents();

      } catch (error) {
        console.log(error);
      }
    };

  const columns = [
    {
      key: "phone",
      label: "Phone"
    },
    {
      key: "occupation",
      label: "Occupation"
    },
    {
      key: "address",
      label: "Address"
    },
    {
      key: "children",
      label: "Children",
      render: (parent) =>
        parent.children
          ?.length || 0
    }
  ];

  return (
    <DashboardLayout>

      <TableHeader
        title="Parents"
        count={
          filteredParents.length
        }
        onSearch={
          handleSearch
        }
      />

      <button
        onClick={() =>
          navigate(
            "/parents"
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
        + Add Parent
      </button>

      <DataTable
        columns={columns}
        data={
          filteredParents
        }
        renderActions={
          (parent) => (
            <>
              <button
                onClick={() =>
                  navigate(
                    `/parents?id=${parent._id}`
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
                    parent._id
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

export default ParentList;

