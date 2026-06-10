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
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "35px",
            borderRadius: "20px",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.08)"
          }}
        >
          {/* Header */}

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              marginBottom:
                "30px",
              borderBottom:
                "2px solid #e5e7eb",
              paddingBottom:
                "20px"
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  color:
                    "#111827"
                }}
              >
                🎓 Student Profile
              </h1>

              <p
                style={{
                  color:
                    "#6b7280",
                  marginTop:
                    "5px"
                }}
              >
                Complete Student Information
              </p>
            </div>

            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius:
                  "50%",
                background:
                  "#eff6ff",
                display:
                  "flex",
                justifyContent:
                  "center",
                alignItems:
                  "center",
                fontSize:
                  "40px"
              }}
            >
              👨‍🎓
            </div>
          </div>

          {/* Student Information */}

          <SectionTitle
            title="Student Information"
            bg="#eff6ff"
            color="#2563eb"
          />

          <div
            style={gridStyle}
          >
            <Info
              label="Student ID"
              value={
                student.studentId
              }
            />

            <Info
              label="Name"
              value={
                student.name
              }
            />

            <Info
              label="Email"
              value={
                student.email
              }
            />

            <Info
              label="Gender"
              value={
                student.gender
              }
            />

            <Info
              label="Date Of Birth"
              value={
                student.dob
                  ? new Date(
                      student.dob
                    ).toLocaleDateString()
                  : "N/A"
              }
            />

            <Info
              label="Class"
              value={
                student.class
              }
            />

            <Info
              label="Section"
              value={
                student.section
              }
            />

            <Info
              label="Roll Number"
              value={
                student.rollNumber
              }
            />

            <Info
              label="School"
              value={
                student
                  .schoolId
                  ?.schoolName
              }
            />
          </div>

          {/* Father */}

          <SectionTitle
            title="Father Information"
            bg="#f0fdf4"
            color="#16a34a"
          />

          <div
            style={gridStyle}
          >
            <Info
              label="Father Name"
              value={
                student.fatherName
              }
            />

            <Info
              label="Father Mobile"
              value={
                student.fatherPhone
              }
            />

            <Info
              label="Father Occupation"
              value={
                student.fatherOccupation
              }
            />
          </div>

          {/* Mother */}

          <SectionTitle
            title="Mother Information"
            bg="#f0fdf4"
            color="#16a34a"
          />

          <div
            style={gridStyle}
          >
            <Info
              label="Mother Name"
              value={
                student.motherName
              }
            />

            <Info
              label="Mother Occupation"
              value={
                student.motherOccupation
              }
            />
          </div>

          {/* Address */}

          <SectionTitle
            title="Address Information"
            bg="#f5f3ff"
            color="#7c3aed"
          />

          <div
            style={{
              marginTop:
                "15px",
              background:
                "#fafafa",
              padding:
                "20px",
              borderRadius:
                "10px",
              border:
                "1px solid #e5e7eb"
            }}
          >
            {student.address ||
              "N/A"}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns:
    "1fr 1fr",
  gap: "15px",
  marginTop: "20px"
};

function SectionTitle({
  title,
  bg,
  color
}) {
  return (
    <h3
      style={{
        background: bg,
        color: color,
        padding: "12px",
        borderRadius:
          "10px",
        marginTop: "30px"
      }}
    >
      {title}
    </h3>
  );
}

function Info({
  label,
  value
}) {
  return (
    <div
      style={{
        background:
          "#f9fafb",
        padding: "15px",
        borderRadius:
          "10px",
        border:
          "1px solid #e5e7eb"
      }}
    >
      <div
        style={{
          color:
            "#6b7280",
          fontSize:
            "13px"
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontWeight:
            "600",
          marginTop:
            "5px"
        }}
      >
        {value || "N/A"}
      </div>
    </div>
  );
}

export default StudentView;