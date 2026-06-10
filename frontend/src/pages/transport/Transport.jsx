import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useSearchParams
} from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import { toast } from "react-toastify";

function Transport() {

  const navigate =
    useNavigate();

  const [
    searchParams
  ] =
    useSearchParams();

  const transportId =
    searchParams.get(
      "id"
    );

  const [
    schools,
    setSchools
  ] = useState([]);

  const [
    editId,
    setEditId
  ] = useState(null);

  const [
    formData,
    setFormData
  ] = useState({
    busNumber: "",
    vehicleNumber: "",
    driverName: "",
    driverPhone: "",
    routeName: "",
    capacity: "",
    schoolId: "",
    status: "active"
  });

  // Get Schools
  const getSchools = async () => {
  try {
    const res = await API.get("/schools/all");
    console.log(res.data);

    setSchools(
      res.data.schools || []
    );

  } catch (error) {
    console.log(error);
    setSchools([]);
  }
};

  // Get Single Transport
  const getSingleTransport = async () => {

  try {

    const res =
      await API.get(
        "/transport/all"
      );

    console.log(res.data);

    const transport =
      res.data.transport?.find(
        (item) =>
          item._id ===
          transportId
      );

    if (transport) {

      setEditId(
        transport._id
      );

      setFormData({
        busNumber:
          transport.busNumber || "",

        vehicleNumber:
          transport.vehicleNumber || "",

        driverName:
          transport.driverName || "",

        driverPhone:
          transport.driverPhone || "",

        routeName:
          transport.routeName || "",

        capacity:
          transport.capacity || "",

        schoolId:
          transport.schoolId?._id || "",

        status:
          transport.status || "active"
      });
    }

  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {

    getSchools();

    if (
      transportId
    ) {
      getSingleTransport();
    }

  }, [transportId]);

  // Input Change
  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value
      });
    };

  // Submit Form
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        if (
          editId
        ) {

          // Update
          await API.put(
            `/transport/update/${editId}`,
            formData
          );

          alert(
            "Transport Updated Successfully"
          );

        } else {

          // Add
          await API.post(
            "/transport/add",
            formData
          );

          alert(
            "Transport Added Successfully"
          );
        }

        navigate(
          "/transport-list"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          error.response?.data
            ?.message ||
          "Something went wrong"
        );
      }
    };

    const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  border: "1px solid #D1D5DB",
  borderRadius: "10px",
  fontSize: "14px",
  outline: "none",
  background: "#fff",
  boxSizing: "border-box"
};

  return (
  <DashboardLayout>

    <div
      style={{
        background: "#fff",
        padding: "35px",
        borderRadius: "20px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)",
        maxWidth: "1100px",
        margin: "0 auto"
      }}
    >

      <div
        style={{
          marginBottom: "30px"
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#111827",
            fontSize: "32px"
          }}
        >
          🚌 {editId
            ? "Edit Transport"
            : "Add Transport"}
        </h1>

        <p
          style={{
            color: "#6B7280",
            marginTop: "8px"
          }}
        >
          Manage school buses, routes and drivers
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "20px"
          }}
        >

          <input
            type="text"
            name="busNumber"
            placeholder="Bus Number"
            value={formData.busNumber}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="vehicleNumber"
            placeholder="Vehicle Number"
            value={formData.vehicleNumber}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="driverName"
            placeholder="Driver Name"
            value={formData.driverName}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="driverPhone"
            placeholder="Driver Phone"
            value={formData.driverPhone}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="routeName"
            placeholder="Route Name"
            value={formData.routeName}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="number"
            name="capacity"
            placeholder="Bus Capacity"
            value={formData.capacity}
            onChange={handleChange}
            style={inputStyle}
          />

          <select
  name="schoolId"
  value={formData.schoolId}
  onChange={handleChange}
  required
  style={inputStyle}
>
  <option value="">
    Select School
  </option>

  {schools &&
    schools.map((school) => (
      <option
        key={school._id}
        value={school._id}
      >
        {school.schoolName}
      </option>
    ))}
</select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>
          </select>

        </div>

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
            cursor: "pointer",
            boxShadow:
              "0 6px 15px rgba(37,99,235,0.3)"
          }}
        >
          {editId
            ? "Update Transport"
            : "Add Transport"}
        </button>

      </form>

    </div>

  </DashboardLayout>
);
}

export default Transport;