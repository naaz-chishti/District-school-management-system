import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Teachers() {
  const [teachers,
    setTeachers] =
    useState([]);

  const getTeachers =
    async () => {
      try {
        const res =
          await API.get(
            "/teachers/all"
          );

        setTeachers(
          res.data.teachers
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <DashboardLayout>
      <h1>Teachers</h1>

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>
              Teacher ID
            </th>

            <th>Name</th>

            <th>Email</th>

            <th>
              Subject
            </th>

            <th>
              Qualification
            </th>

            <th>
              Salary
            </th>

            <th>
              Attendance
            </th>

            <th>
              Leave Balance
            </th>

            <th>
              Performance
            </th>
          </tr>
        </thead>

        <tbody>
          {teachers.map(
            (teacher) => (
              <tr
                key={
                  teacher._id
                }
              >
                <td>
                  {
                    teacher.teacherId
                  }
                </td>

                <td>
                  {
                    teacher.name
                  }
                </td>

                <td>
                  {
                    teacher.email
                  }
                </td>

                <td>
                  {
                    teacher.subject
                  }
                </td>

                <td>
                  {
                    teacher.qualification
                  }
                </td>

                <td>
                  ₹
                  {
                    teacher.salary
                  }
                </td>

                <td>
                  {
                    teacher.attendance
                  }
                </td>

                <td>
                  {
                    teacher.leaveBalance
                  }
                </td>

                <td>
                  {
                    teacher.performanceScore
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default Teachers;