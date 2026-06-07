import React, {
  useState
} from "react";

function DataTable({
  columns,
  data,
  renderActions
}) {

  const [
    currentPage,
    setCurrentPage
  ] = useState(1);

  const recordsPerPage = 10;

  const lastIndex =
    currentPage *
    recordsPerPage;

  const firstIndex =
    lastIndex -
    recordsPerPage;

  const currentRecords =
    data.slice(
      firstIndex,
      lastIndex
    );

  const totalPages =
    Math.ceil(
      data.length /
      recordsPerPage
    );

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow:
          "0 4px 10px rgba(0,0,0,0.08)",
        overflowX: "auto"
      }}
    >
     <table
  style={{
    width: "100%",
    minWidth: "900px",
          borderCollapse:
            "collapse"
        }}
      >
        <thead>
          <tr
            style={{
              background:
                "#f3f4f6"
            }}
          >
            {columns.map(
              (column) => (
                <th
                  key={
                    column.key
                  }
                  style={{
                    padding:
                      "12px",
                    textAlign:
                      "left",
                    borderBottom:
                      "1px solid #ddd"
                  }}
                >
                  {
                    column.label
                  }
                </th>
              )
            )}

            {renderActions && (
              <th
                style={{
                  padding:
                    "12px",
                  textAlign:
                    "left",
                  borderBottom:
                    "1px solid #ddd"
                }}
              >
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {currentRecords.map(
            (row) => (
              <tr
                key={
                  row._id
                }
              >
                {columns.map(
                  (
                    column
                  ) => (
                    <td
                      key={
                        column.key
                      }
                      style={{
                        padding:
                          "12px",
                        borderBottom:
                          "1px solid #eee"
                      }}
                    >
                      {column.render
                        ? column.render(
                            row
                          )
                        : row[
                            column.key
                          ]}
                    </td>
                  )
                )}

                {renderActions && (
                  <td
                    style={{
                      padding:
                        "12px",
                      borderBottom:
                        "1px solid #eee"
                    }}
                  >
                    {renderActions(
                      row
                    )}
                  </td>
                )}
              </tr>
            )
          )}
        </tbody>
      </table>

      {/* Pagination */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          marginTop:
            "20px"
        }}
      >
        <div>
          Showing{" "}
          {data.length === 0
            ? 0
            : firstIndex + 1}
          {" - "}
          {Math.min(
            lastIndex,
            data.length
          )}
          {" of "}
          {data.length}
          {" records"}
        </div>

        <div
          style={{
            display: "flex",
            gap: "5px"
          }}
        >
          <button
            disabled={
              currentPage ===
              1
            }
            onClick={() =>
              setCurrentPage(
                currentPage -
                  1
              )
            }
          >
            Previous
          </button>

          {[...Array(
            totalPages
          )].map(
            (_, index) => (
              <button
                key={
                  index
                }
                onClick={() =>
                  setCurrentPage(
                    index +
                      1
                  )
                }
                style={{
                  background:
                    currentPage ===
                    index +
                      1
                      ? "#2563eb"
                      : "#fff",
                  color:
                    currentPage ===
                    index +
                      1
                      ? "#fff"
                      : "#000",
                  border:
                    "1px solid #ddd",
                  padding:
                    "6px 12px",
                  borderRadius:
                    "5px",
                  cursor:
                    "pointer"
                }}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            disabled={
              currentPage ===
              totalPages
            }
            onClick={() =>
              setCurrentPage(
                currentPage +
                  1
              )
            }
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}

export default DataTable;