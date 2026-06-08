import {
  useEffect,
  useState
} from "react";
import {
  useNavigate
} from "react-router-dom";

import {
  useSearchParams
} from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import { toast } from "react-toastify";

function Parents() {

  const [
    searchParams
  ] =
    useSearchParams();
    
    const navigate =
  useNavigate();
  
  const parentId =
    searchParams.get(
      "id"
    );

  const [
    editId,
    setEditId
  ] =
    useState(null);

  const [
    formData,
    setFormData
  ] = useState({
    phone: "",
    occupation: "",
    address: ""
  });

  const getSingleParent =
    async () => {

      try {

        const res =
          await API.get(
            "/parents/all"
          );

        const parent =
          res.data.parents.find(
            (p) =>
              p._id ===
              parentId
          );

        if (
          parent
        ) {

          setEditId(
            parent._id
          );

          setFormData({
            phone:
              parent.phone ||
              "",
            occupation:
              parent.occupation ||
              "",
            address:
              parent.address ||
              ""
          });
        }

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {

    if (
      parentId
    ) {
      getSingleParent();
    }

  }, []);

  const handleChange =
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value
      });
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        if (
          editId
        ) {

          await API.put(
            `/parents/update/${editId}`,
            formData
          );

          alert(
            "Parent Updated Successfully"
          );

          navigate(
            "/parent-list"
          )

        } else {

          await API.post(
            "/parents/add",
            formData
          );

          alert(
            "Parent Added Successfully"
          );
        }

        setFormData({
          phone: "",
          occupation:
            "",
          address:
            ""
        });

      } catch (error) {

  toast.error(
    error.response?.data?.message ||
    "Something went wrong"
  );

  console.log(error);
}
    };

  return (
    <DashboardLayout>

      <h1>
        Parents
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        style={{
          background:
            "white",
          padding:
            "30px",
          borderRadius:
            "15px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.1)"
        }}
      >

        <h2>
          {
            editId
              ? "Edit Parent"
              : "Add Parent"
          }
        </h2>

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={
            formData.phone
          }
          onChange={
            handleChange
          }
          required
          style={{
            width:
              "100%",
            padding:
              "12px",
            marginTop:
              "15px"
          }}
        />

        <input
          type="text"
          name="occupation"
          placeholder="Occupation"
          value={
            formData.occupation
          }
          onChange={
            handleChange
          }
          style={{
            width:
              "100%",
            padding:
              "12px",
            marginTop:
              "15px"
          }}
        />

        <textarea
          name="address"
          placeholder="Address"
          value={
            formData.address
          }
          onChange={
            handleChange
          }
          style={{
            width:
              "100%",
            padding:
              "12px",
            marginTop:
              "15px",
            minHeight:
              "100px"
          }}
        />

        <button
          type="submit"
          style={{
            width:
              "100%",
            background:
              "#2563eb",
            color:
              "white",
            padding:
              "14px",
            border:
              "none",
            borderRadius:
              "10px",
            marginTop:
              "20px",
            cursor:
              "pointer"
          }}
        >
          {
            editId
              ? "Update Parent"
              : "Add Parent"
          }
        </button>

      </form>

    </DashboardLayout>
  );
}

export default Parents;