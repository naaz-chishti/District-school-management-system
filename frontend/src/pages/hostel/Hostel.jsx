import {
  useEffect,
  useState
} from "react";

import {
  useSearchParams,
  useNavigate
} from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import { toast } from "react-toastify";

function Hostel() {

  const navigate =
    useNavigate();

  const [
    searchParams
  ] =
    useSearchParams();

  const hostelId =
    searchParams.get("id");

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
    hostelName: "",
    roomNumber: "",
    roomType: "",
    capacity: "",
    wardenName: "",
    wardenPhone: "",
    hostelFee: "",
    schoolId: ""
  });

  // Get Schools
  const getSchools =
    async () => {

      try {

        const res =
          await API.get(
            "/schools/all"
          );

        setSchools(
          res.data.schools
        );

      } catch (error) {
        console.log(error);
      }
    };

  // Get Single Hostel
  const getSingleHostel =
    async () => {

      try {

        const res =
          await API.get(
            "/hostel/all"
          );

        const hostel =
          res.data.hostels.find(
            (h) =>
              h._id ===
              hostelId
          );

        if (hostel) {

          setEditId(
            hostel._id
          );

          setFormData({
            hostelName:
              hostel.hostelName || "",
            roomNumber:
              hostel.roomNumber || "",
            roomType:
              hostel.roomType || "",
            capacity:
              hostel.capacity || "",
            wardenName:
              hostel.wardenName || "",
            wardenPhone:
              hostel.wardenPhone || "",
            hostelFee:
              hostel.hostelFee || "",
            schoolId:
              hostel.schoolId?._id || ""
          });
        }

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {

    getSchools();

    if (hostelId) {
      getSingleHostel();
    }

  }, [hostelId]);

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

        if (editId) {

          await API.put(
            `/hostel/update/${editId}`,
            formData
          );

          toast.success(
            "Hostel Updated Successfully"
          );

        } else {

          await API.post(
            "/hostel/add",
            formData
          );

          toast.success(
            "Hostel Added Successfully"
          );
        }

        navigate(
          "/hostel-list"
        );

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
            🏠 {editId
              ? "Edit Hostel"
              : "Add Hostel"}
          </h1>

          <p
            style={{
              color: "#6B7280",
              marginTop: "8px"
            }}
          >
            Manage hostel rooms, wardens and accommodation details
          </p>
        </div>

        <form
          onSubmit={
            handleSubmit
          }
        >

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
              name="hostelName"
              placeholder="Hostel Name"
              value={formData.hostelName}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              type="text"
              name="roomNumber"
              placeholder="Room Number"
              value={formData.roomNumber}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">
                Select Room Type
              </option>

              <option value="single">
                Single
              </option>

              <option value="double">
                Double
              </option>

              <option value="shared">
                Shared
              </option>
            </select>

            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              type="text"
              name="wardenName"
              placeholder="Warden Name"
              value={formData.wardenName}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              type="text"
              name="wardenPhone"
              placeholder="Warden Phone"
              value={formData.wardenPhone}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              type="number"
              name="hostelFee"
              placeholder="Hostel Fee"
              value={formData.hostelFee}
              onChange={handleChange}
              required
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

              {schools.map(
                (school) => (
                  <option
                    key={school._id}
                    value={school._id}
                  >
                    {school.schoolName}
                  </option>
                )
              )}
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
              ? "Update Hostel"
              : "Add Hostel"}
          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}

export default Hostel;