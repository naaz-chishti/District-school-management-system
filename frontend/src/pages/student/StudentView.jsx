import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function StudentView() {

  const { id } = useParams();

  const [student, setStudent] =
    useState(null);

  const getStudent =
    async () => {

      try {

        const res =
          await API.get(
            `/students/${id}`
          );

        setStudent(
          res.data.student
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {
    getStudent();
  }, []);

  if (!student)
    return (
      <DashboardLayout>
        <h2>Loading...</h2>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>

      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.08)"
        }}
      >

        <h2
          style={{
            color: "#2563eb",
            marginBottom: "20px"
          }}
        >
          Student Details
        </h2>

        <table
          style={{
            width: "100%"
          }}
        >
          <tbody>

            <tr>
              <td><b>Student ID</b></td>
              <td>{student.studentId}</td>
            </tr>

            <tr>
              <td><b>Name</b></td>
              <td>{student.name}</td>
            </tr>

            <tr>
              <td><b>Email</b></td>
              <td>{student.email}</td>
            </tr>

            <tr>
              <td><b>Phone</b></td>
              <td>{student.phone}</td>
            </tr>

            <tr>
              <td><b>Class</b></td>
              <td>{student.class}</td>
            </tr>

            <tr>
              <td><b>Section</b></td>
              <td>{student.section}</td>
            </tr>

            <tr>
              <td><b>School</b></td>
              <td>
                {student.schoolId?.schoolName}
              </td>
            </tr>

            <tr>
              <td><b>Address</b></td>
              <td>{student.address}</td>
            </tr>

            <tr>
              <td><b>Status</b></td>
              <td>{student.status}</td>
            </tr>

          </tbody>
        </table>

      </div>

    </DashboardLayout>
  );
}

export default StudentView;