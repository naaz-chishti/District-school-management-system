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

  // Get Single Transport
  const getSingleTransport =
    async () => {

      try {

        const res =
          await API.get(
            "/transports/all"
          );

        const transport =
          res.data.transport.find(
            (item) =>
              item._id ===
              transportId
          );

        if (
          transport
        ) {

          setEditId(
            transport._id
          );

          setFormData({
            busNumber:
              transport.busNumber ||
              "",

            vehicleNumber:
              transport.vehicleNumber ||
              "",

            driverName:
              transport.driverName ||
              "",

            driverPhone:
              transport.driverPhone ||
              "",

            routeName:
              transport.routeName ||
              "",

            capacity:
              transport.capacity ||
              "",

            schoolId:
              transport.schoolId
                ?._id || "",

            status:
              transport.status ||
              "active"
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
            `/transports/update/${editId}`,
            formData
          );

          alert(
            "Transport Updated Successfully"
          );

        } else {

          // Add
          await API.post(
            "/transports/add",
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

  return (
    <DashboardLayout>

      <h1>
        {editId
          ? "Edit Transport"
          : "Add Transport"}
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

        <input
          type="text"
          name="busNumber"
          placeholder="Bus Number"
          value={
            formData.busNumber
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
          name="vehicleNumber"
          placeholder="Vehicle Number"
          value={
            formData.vehicleNumber
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
          name="driverName"
          placeholder="Driver Name"
          value={
            formData.driverName
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
          name="driverPhone"
          placeholder="Driver Phone"
          value={
            formData.driverPhone
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
          name="routeName"
          placeholder="Route Name"
          value={
            formData.routeName
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
          name="capacity"
          placeholder="Capacity"
          value={
            formData.capacity
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        {/* School Dropdown */}
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

        {/* Status */}
        <select
          name="status"
          value={
            formData.status
          }
          onChange={
            handleChange
          }
        >
          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>
        </select>

        <br />
        <br />

        <button
          type="submit"
        >
          {editId
            ? "Update Transport"
            : "Add Transport"}
        </button>

      </form>

    </DashboardLayout>
  );
}

export default Transport;