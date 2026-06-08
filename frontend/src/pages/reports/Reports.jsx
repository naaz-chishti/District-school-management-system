import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Reports() {

  const [dashboard, setDashboard] =
    useState({});

  const [report, setReport] =
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

        setDashboard(
          response.data.dashboard || {}
        );

      } catch (error) {

        console.log(error);
      }
    };

  const fetchStudentReport =
    async () => {
      try {

        const response =
          await API.get(
            "/reports/student-performance"
          );

        setReport(
          response.data.report || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (
    <DashboardLayout>

      <div
        style={{
          padding: "20px"
        }}
      >

        <h1
          style={{
            marginBottom: "25px",
            color: "#1e293b"
          }}
        >
          Reports Dashboard
        </h1>

        {/* SUMMARY CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "35px"
          }}
        >

          <ReportCard
            title="Students"
            value={
              dashboard.totalStudents || 0
            }
          />

          <ReportCard
            title="Teachers"
            value={
              dashboard.totalTeachers || 0
            }
          />

          <ReportCard
            title="Attendance"
            value={
              dashboard.totalAttendance || 0
            }
          />

          <ReportCard
            title="Fees Collected"
            value={`₹${
              dashboard.totalFees || 0
            }`}
          />

          <ReportCard
            title="Exams"
            value={
              dashboard.totalExams || 0
            }
          />

        </div>

        {/* STUDENT PERFORMANCE */}

        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "15px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)"
          }}
        >

          <h2
            style={{
              marginBottom: "20px",
              color: "#1e293b"
            }}
          >
            Student Performance Report
          </h2>

          <div
            style={{
              overflowX: "auto"
            }}
          >

            <table
              style={{
                width: "100%",
                borderCollapse:
                  "collapse"
              }}
            >

              <thead>

                <tr
                  style={{
                    background:
                      "#2563eb",
                    color: "#fff"
                  }}
                >
                  <th style={thStyle}>
                    Student
                  </th>

                  <th style={thStyle}>
                    Subject
                  </th>

                  <th style={thStyle}>
                    Exam Type
                  </th>

                  <th style={thStyle}>
                    Total Marks
                  </th>

                  <th style={thStyle}>
                    Obtained
                  </th>

                  <th style={thStyle}>
                    Grade
                  </th>

                  <th style={thStyle}>
                    Remarks
                  </th>
                </tr>

              </thead>

              <tbody>

                {report.length > 0 ? (

                  report.map(
                    (item) => (

                      <tr
                        key={item._id}
                        style={{
                          borderBottom:
                            "1px solid #e5e7eb"
                        }}
                      >
                        <td style={tdStyle}>
                          {item.studentId
                            ?.name || "N/A"}
                        </td>

                        <td style={tdStyle}>
                          {item.subject}
                        </td>

                        <td style={tdStyle}>
                          {item.examType}
                        </td>

                        <td style={tdStyle}>
                          {item.totalMarks}
                        </td>

                        <td style={tdStyle}>
                          {item.obtainedMarks}
                        </td>

                        <td style={tdStyle}>
                          <span
                            style={{
                              background:
                                "#dcfce7",
                              color:
                                "#166534",
                              padding:
                                "4px 10px",
                              borderRadius:
                                "20px",
                              fontWeight:
                                "600"
                            }}
                          >
                            {item.grade}
                          </span>
                        </td>

                        <td style={tdStyle}>
                          {item.remarks ||
                            "-"}
                        </td>
                      </tr>
                    )
                  )

                ) : (

                  <tr>
                    <td
                      colSpan="7"
                      style={{
                        textAlign:
                          "center",
                        padding:
                          "20px"
                      }}
                    >
                      No Student Report Found
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

/* CARD */

function ReportCard({
  title,
  value
}) {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg,#2563eb,#3b82f6)",
        color: "#fff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow:
          "0 5px 15px rgba(37,99,235,0.3)"
      }}
    >
      <h3
        style={{
          marginBottom: "10px"
        }}
      >
        {title}
      </h3>

      <h1>{value}</h1>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  textAlign: "left"
};

const tdStyle = {
  padding: "12px"
};

export default Reports;