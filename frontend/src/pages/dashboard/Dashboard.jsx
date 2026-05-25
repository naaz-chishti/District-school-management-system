import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Dashboard() {

  const [data,
    setData] =
    useState({});

  const [role,
    setRole] =
    useState("");

  const getDashboard =
    async () => {
      try {

        const res =
          await API.get(
            "/dashboard"
          );

        setData(
          res.data.dashboard
        );

        setRole(
          res.data.role
        );

      } catch (error) {
        console.log(
          error
        );
      }
    };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <DashboardLayout>

      <h1>
        Dashboard
      </h1>

      <h3>
        Role: {role}
      </h3>

      <div
        style={{
          display:
            "flex",
          gap: "20px",
          flexWrap:
            "wrap",
          marginTop:
            "20px"
        }}
      >

        {Object.entries(
          data
        ).map(
          ([key, value]) => (

            <div
              key={key}
              style={{
                background:
                  "white",
                padding:
                  "20px",
                width:
                  "220px",
                borderRadius:
                  "10px",
                boxShadow:
                  "0 0 10px rgba(0,0,0,0.1)",
                textAlign:
                  "center"
              }}
            >

              <h3
                style={{
                  textTransform:
                    "capitalize"
                }}
              >
                {key}
              </h3>

              <h1>
                {value}
              </h1>

            </div>
          )
        )}

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;