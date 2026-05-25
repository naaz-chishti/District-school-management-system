import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Attendance() {

  const [
    attendance,
    setAttendance
  ] = useState([]);

  const getAttendance =
    async () => {
      try {

        const res =
          await API.get(
            "/attendance/all"
          );

        setAttendance(
          res.data
            .attendance || []
        );

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <DashboardLayout>
      <h1>
        Attendance
      </h1>

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>
              Student
            </th>

            <th>
              Status
            </th>

            <th>
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {attendance &&
          attendance.length >
            0 ? (
            attendance.map(
              (item) => (
                <tr
                  key={
                    item._id
                  }
                >
                  <td>
                    {item
                      .studentId
                      ?.name ||
                      "N/A"}
                  </td>

                  <td>
                    {
                      item.status
                    }
                  </td>

                  <td>
                    {new Date(
                      item.date
                    ).toLocaleDateString()}
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td
                colSpan="3"
              >
                No Attendance Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default Attendance;