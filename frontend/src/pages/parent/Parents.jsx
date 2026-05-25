import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Parents() {
  const [parents,
    setParents] =
    useState([]);

  const getParents =
    async () => {
      try {
        const res =
          await API.get(
            "/parents/all"
          );

        setParents(
          res.data.parents
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    getParents();
  }, []);

  return (
    <DashboardLayout>
      <h1>Parents</h1>

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>Phone</th>

            <th>
              Occupation
            </th>

            <th>
              Address
            </th>

            <th>
              Children Count
            </th>
          </tr>
        </thead>

        <tbody>
          {parents.map(
            (parent) => (
              <tr
                key={
                  parent._id
                }
              >
                <td>
                  {
                    parent.phone
                  }
                </td>

                <td>
                  {
                    parent.occupation
                  }
                </td>

                <td>
                  {
                    parent.address
                  }
                </td>

                <td>
                  {
                    parent.children
                      ?.length
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

export default Parents;