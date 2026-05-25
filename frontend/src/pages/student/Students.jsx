import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Students() {
  const [students,
    setStudents] =
    useState([]);

  const getStudents =
    async () => {
      try {
        const res =
          await API.get(
            "/students/all"
          );

        setStudents(
          res.data.students
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <DashboardLayout>
      <h1>Students</h1>

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>
              Student ID
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Class</th>
            <th>Section</th>
            <th>
              Roll No
            </th>
            <th>
              Gender
            </th>
            <th>
              Address
            </th>
          </tr>
        </thead>

        <tbody>
          {students.map(
            (student) => (
              <tr
                key={
                  student._id
                }
              >
                <td>
                  {
                    student.studentId
                  }
                </td>

                <td>
                  {
                    student.name
                  }
                </td>

                <td>
                  {
                    student.email
                  }
                </td>

                <td>
                  {
                    student.class
                  }
                </td>

                <td>
                  {
                    student.section
                  }
                </td>

                <td>
                  {
                    student.rollNumber
                  }
                </td>

                <td>
                  {
                    student.gender
                  }
                </td>

                <td>
                  {
                    student.address
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

export default Students;