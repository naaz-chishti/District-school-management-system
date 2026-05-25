import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Settings() {
  const [settings,
    setSettings] =
    useState(null);

  useEffect(() => {
    const getSettings =
      async () => {
        try {
          const res =
            await API.get(
              "/settings/all"
            );

          console.log(
            res.data
          );

          const data =
            res.data
              .settings;

          setSettings(
            Array.isArray(
              data
            )
              ? data[0]
              : data
          );
        } catch (
          error
        ) {
          console.log(
            error
          );
        }
      };

    getSettings();
  }, []);

  return (
    <DashboardLayout>
      <h1>
        Settings
      </h1>

      {settings && (
        <table
          border="1"
          cellPadding="10"
        >
          <tbody>
            <tr>
              <td>
                School Name
              </td>
              <td>
                {
                  settings.schoolName
                }
              </td>
            </tr>

            <tr>
              <td>
                School Email
              </td>
              <td>
                {
                  settings.schoolEmail
                }
              </td>
            </tr>

            <tr>
              <td>
                School Phone
              </td>
              <td>
                {
                  settings.schoolPhone
                }
              </td>
            </tr>

            <tr>
              <td>
                Academic Year
              </td>
              <td>
                {
                  settings.academicYear
                }
              </td>
            </tr>

            <tr>
              <td>
                Timezone
              </td>
              <td>
                {
                  settings.timezone
                }
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </DashboardLayout>
  );
}

export default Settings;