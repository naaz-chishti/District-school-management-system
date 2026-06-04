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

function Hostel() {

  const navigate =
    useNavigate();

  const [
    searchParams
  ] =
    useSearchParams();

  const hostelId =
    searchParams.get(
      "id"
    );

  const [
    schools,
    setSchools
  ] = useState([]);

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

        if (
          hostel
        ) {

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

    if (
      hostelId
    ) {
      getSingleHostel();
    }

  }, []);

  // Handle Change
  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value
      });
    };

  // Submit
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        // Add Hostel
        await API.post(
          "/hostel/add",
          formData
        );

        alert(
          "Hostel Added Successfully"
        );

        navigate(
          "/hostel-list"
        );

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <DashboardLayout>

      <h1>
        Hostel
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
            "15px"
        }}
      >

        <h2>
          Add Hostel
        </h2>

        <input
          type="text"
          name="hostelName"
          placeholder="Hostel Name"
          value={
            formData.hostelName
          }
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <input
          type="text"
          name="roomNumber"
          placeholder="Room Number"
          value={
            formData.roomNumber
          }
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <select
          name="roomType"
          value={
            formData.roomType
          }
          onChange={
            handleChange
          }
          required
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

        <br />
        <br />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={
            formData.capacity
          }
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <input
          type="text"
          name="wardenName"
          placeholder="Warden Name"
          value={
            formData.wardenName
          }
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <input
          type="text"
          name="wardenPhone"
          placeholder="Warden Phone"
          value={
            formData.wardenPhone
          }
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <input
          type="number"
          name="hostelFee"
          placeholder="Hostel Fee"
          value={
            formData.hostelFee
          }
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <select
          name="schoolId"
          value={
            formData.schoolId
          }
          onChange={
            handleChange
          }
          required
        >
          <option value="">
            Select School
          </option>

          {schools.map(
            (
              school
            ) => (
              <option
                key={
                  school._id
                }
                value={
                  school._id
                }
              >
                {
                  school.schoolName
                }
              </option>
            )
          )}
        </select>

        <br />
        <br />

        <button
          type="submit"
        >
          Add Hostel
        </button>

      </form>

    </DashboardLayout>
  );
}

export default Hostel;