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

 const [formData, setFormData] =
  useState({
    fatherName: "",
    fatherPhone: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
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
  fatherName:
    parent.fatherName || "",

  fatherPhone:
    parent.fatherPhone || "",

  fatherOccupation:
    parent.fatherOccupation || "",

  motherName:
    parent.motherName || "",

  motherOccupation:
    parent.motherOccupation || "",

  address:
    parent.address || ""
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

    const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  border: "1px solid #D1D5DB",
  borderRadius: "10px",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box"
};

  return (
  <DashboardLayout>

    <div
      style={{
        background: "#fff",
        padding: "35px",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        maxWidth: "1100px",
        margin: "0 auto"
      }}
    >
      <div style={{ marginBottom: "30px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "32px",
            color: "#111827"
          }}
        >
          👨‍👩‍👧 Parent Management
        </h1>

        <p
          style={{
            color: "#6B7280",
            marginTop: "8px"
          }}
        >
          Add and manage parent information
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px"
          }}
        >

        <input
  type="text"
  name="fatherName"
  placeholder="Father Name"
  value={formData.fatherName}
  onChange={handleChange}
/>

<input
  type="text"
  name="fatherPhone"
  placeholder="Father Mobile"
  value={formData.fatherPhone}
  onChange={handleChange}
/>

<input
  type="text"
  name="fatherOccupation"
  placeholder="Father Occupation"
  value={formData.fatherOccupation}
  onChange={handleChange}
/>

<input
  type="text"
  name="motherName"
  placeholder="Mother Name"
  value={formData.motherName}
  onChange={handleChange}
/>

<input
  type="text"
  name="motherOccupation"
  placeholder="Mother Occupation"
  value={formData.motherOccupation}
  onChange={handleChange}
/>

        </div>

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px 15px",
            border: "1px solid #D1D5DB",
            borderRadius: "10px",
            marginTop: "20px",
            minHeight: "120px",
            resize: "none",
            boxSizing: "border-box"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: "25px",
            background:
              "linear-gradient(135deg,#2563EB,#3B82F6)",
            color: "#fff",
            border: "none",
            padding: "14px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          {editId
            ? "Update Parent"
            : "Add Parent"}
        </button>

      </form>
    </div>

  </DashboardLayout>
);
}

export default Parents;