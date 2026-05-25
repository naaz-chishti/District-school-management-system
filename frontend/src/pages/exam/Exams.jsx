import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Exams() {
  const [exams,
    setExams] =
    useState([]);

  const getExams =
    async () => {
      try {
        const res =
          await API.get(
            "/exams/all"
          );

        setExams(
          res.data.exams
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    getExams();
  }, []);

  return (
    <DashboardLayout>
      <h1>
        Exams
      </h1>

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>
              Student Name
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
          {exams.map(
            (exam) => (
              <tr
                key={
                  exam._id
                }
              >
                <td>
                  {
                    exam
                      .studentId
                      ?.name
                  }
                </td>

                <td>
                  {
                    exam.subject
                  }
                </td>

                <td>
                  {
                    exam.examType
                  }
                </td>

                <td>
                  {
                    exam.totalMarks
                  }
                </td>

                <td>
                  {
                    exam.obtainedMarks
                  }
                </td>

                <td>
                  {exam.grade ||
                    "N/A"}
                </td>

                <td>
                  {
                    exam.remarks
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

export default Exams;