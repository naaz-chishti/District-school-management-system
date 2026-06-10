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

        const res = await API.get(
  "/students/all"
);

const data =
  res.data.students || [];

        setParents(data);
        setFilteredParents(data);

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    getParents();
  }, []);

  const handleSearch = (value) => {

  const search =
    value.toLowerCase();

  const filtered =
    parents.filter(
      (parent) =>
        parent.fatherName
          ?.toLowerCase()
          .includes(search) ||

        parent.fatherPhone
          ?.toLowerCase()
          .includes(search) ||

        parent.fatherOccupation
          ?.toLowerCase()
          .includes(search) ||

        parent.motherName
          ?.toLowerCase()
          .includes(search) ||

        parent.motherOccupation
          ?.toLowerCase()
          .includes(search) ||

        parent.name
          ?.toLowerCase()
          .includes(search) ||

        parent.class
          ?.toLowerCase()
          .includes(search) ||

        parent.address
          ?.toLowerCase()
          .includes(search)
    );

  setFilteredParents(
    filtered
  );
};

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete Student & Parent Details?"
        );

      if (!confirmDelete)
        return;

      try {

        await API.delete(
          `/parents/delete/${id}`
        );

        alert(
          "Student Deleted Successfully"
        );

        getParents();

      } catch (error) {
        console.log(error);
      }
    };

  const columns = [
  {
    key: "fatherName",
    label: "Father Name"
  },
  {
    key: "fatherPhone",
    label: "Father Mobile"
  },
  {
    key: "fatherOccupation",
    label: "Father Occupation"
  },
  {
    key: "motherName",
    label: "Mother Name"
  },
  {
    key: "motherOccupation",
    label: "Mother Occupation"
  },
  {
    key: "name",
    label: "Student Name"
  },
  {
    key: "class",
    label: "Class"
  },
  {
    key: "address",
    label: "Address"
  }
];

  return (
    <DashboardLayout>

      <TableHeader
        title="Parent Directory"
        count={
          filteredParents.length
        }
        onSearch={
          handleSearch
        }
      />

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
  `/students?id=${parent._id}`
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

