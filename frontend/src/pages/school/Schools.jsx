import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Schools() {
  const [schools,
    setSchools] =
    useState([]);

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

  useEffect(() => {
    getSchools();
  }, []);

  return (
    <DashboardLayout>
      <h1>Schools</h1>

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>
              School Name
            </th>

            <th>
              School Code
            </th>

            <th>
              District
            </th>

            <th>
              Principal
            </th>

            <th>Email</th>

            <th>Phone</th>

            <th>
              Address
            </th>

            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {schools.map(
            (school) => (
              <tr
                key={
                  school._id
                }
              >
                <td>
                  {
                    school.schoolName
                  }
                </td>

                <td>
                  {
                    school.schoolCode
                  }
                </td>

                <td>
                  {
                    school.district
                  }
                </td>

                <td>
                  {
                    school.principalName
                  }
                </td>

                <td>
                  {
                    school.email
                  }
                </td>

                <td>
                  {
                    school.phone
                  }
                </td>

                <td>
                  {
                    school.address
                  }
                </td>

                <td>
                  {
                    school.status
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

export default Schools;