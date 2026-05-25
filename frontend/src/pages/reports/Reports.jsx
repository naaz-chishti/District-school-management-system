import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Reports() {
  const [dashboard,
    setDashboard] =
    useState({});

  const [report,
    setReport] =
    useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchStudentReport();
  }, []);

  const fetchDashboard =
    async () => {
      try {
        const response =
          await API.get(
            "/reports/dashboard"
          );

        console.log(
          "Dashboard:",
          response.data
        );

        setDashboard(
          response.data
            .dashboard || {}
        );
      } catch (
        error
      ) {
        console.log(
          "Dashboard Error:",
          error
        );
      }
    };

  const fetchStudentReport =
    async () => {
      try {
        const response =
          await API.get(
            "/reports/student-performance"
          );

        console.log(
          "Student Report:",
          response.data
        );

        setReport(
          response.data
            .report || []
        );
      } catch (
        error
      ) {
        console.log(
          "Student Report Error:",
          error
        );
      }
    };

  return (
    <DashboardLayout>
      <h1>
        Reports
      </h1>

      <h2>
        Dashboard Report
      </h2>

      <table
        border="1"
        cellPadding="10"
      >
        <tbody>
          <tr>
            <td>
              Total Students
            </td>
            <td>
              {dashboard
                .totalStudents ||
                0}
            </td>
          </tr>

          <tr>
            <td>
              Total Teachers
            </td>
            <td>
              {dashboard
                .totalTeachers ||
                0}
            </td>
          </tr>

          <tr>
            <td>
              Total Attendance
            </td>
            <td>
              {dashboard
                .totalAttendance ||
                0}
            </td>
          </tr>

          <tr>
            <td>
              Total Fees
            </td>
            <td>
              {dashboard
                .totalFees ||
                0}
            </td>
          </tr>

          <tr>
            <td>
              Total Exams
            </td>
            <td>
              {dashboard
                .totalExams ||
                0}
            </td>
          </tr>
        </tbody>
      </table>

      <br />

      <h2>
        Student
        Performance
      </h2>

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>
              Student
              Name
            </th>

            <th>
              Subject
            </th>

            <th>
              Exam Type
            </th>

            <th>
              Total Marks
            </th>

            <th>
              Obtained
              Marks
            </th>

            <th>
              Grade
            </th>

            <th>
              Remarks
            </th>
          </tr>
        </thead>

        <tbody>
          {report.length >
          0 ? (
            report.map(
              (
                item
              ) => (
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
                      item.subject
                    }
                  </td>

                  <td>
                    {
                      item.examType
                    }
                  </td>

                  <td>
                    {
                      item.totalMarks
                    }
                  </td>

                  <td>
                    {
                      item.obtainedMarks
                    }
                  </td>

                  <td>
                    {
                      item.grade
                    }
                  </td>

                  <td>
                    {
                      item.remarks
                    }
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td
                colSpan="7"
              >
                No report
                data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default Reports;