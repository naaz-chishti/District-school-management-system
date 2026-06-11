import React, { useState } from "react";

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
        borderRadius: "18px",
        boxShadow:
          "0 10px 25px rgba(0,0,0,0.08)",
        overflow: "hidden"
      }}
    >

      {/* Table */}

      <div
        style={{
          overflowX: "auto"
        }}
      >

        <table
          style={{
            width: "100%",
            minWidth: "1000px",
            borderCollapse:
              "collapse"
          }}
        >

          <thead>

            <tr
              style={{
                background:
                  "linear-gradient(135deg,#2563EB,#3B82F6)",
                color: "#fff"
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
                        "16px",
                      textAlign:
                        "left",
                      fontSize:
                        "14px",
                      fontWeight:
                        "600"
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
                      "16px",
                    textAlign:
                      "center"
                  }}
                >
                  Actions
                </th>

              )}

            </tr>

          </thead>

          <tbody>

            {currentRecords.length >
            0 ? (

              currentRecords.map(
                (
                  row,
                  rowIndex
                ) => (

                  <tr
                    key={
                      row._id
                    }
                    style={{
                      background:
                        rowIndex %
                          2 ===
                        0
                          ? "#fff"
                          : "#F9FAFB",
                      transition:
                        "0.3s"
                    }}
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
                              "14px 16px",
                            borderBottom:
                              "1px solid #E5E7EB",
                            fontSize:
                              "14px",
                            color:
                              "#374151"
                          }}
                        >
                          {column.render
                            ? column.render(
                                row
                              )
                            : row[
                                column
                                  .key
                              ]}
                        </td>

                      )
                    )}

                    {renderActions && (

                      <td
                        style={{
                          padding:
                            "14px",
                          borderBottom:
                            "1px solid #E5E7EB",
                          textAlign:
                            "center"
                        }}
                      >
                        {renderActions(
                          row
                        )}
                      </td>

                    )}

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan={
                    columns.length +
                    1
                  }
                  style={{
                    textAlign:
                      "center",
                    padding:
                      "40px",
                    color:
                      "#6B7280"
                  }}
                >
                  No Records Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          padding:
            "18px 20px",
          borderTop:
            "1px solid #E5E7EB",
          background:
            "#F9FAFB"
        }}
      >

        <div
          style={{
            color:
              "#6B7280",
            fontSize:
              "14px"
          }}
        >
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
            gap: "8px"
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
            style={
              pageBtn
            }
          >
            ←
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
                  ...pageBtn,
                  background:
                    currentPage ===
                    index +
                      1
                      ? "#2563EB"
                      : "#fff",
                  color:
                    currentPage ===
                    index +
                      1
                      ? "#fff"
                      : "#111827"
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
            style={
              pageBtn
            }
          >
            →
          </button>

        </div>

      </div>

    </div>

  );
}

const pageBtn = {
  border:
    "1px solid #D1D5DB",
  background:
    "#fff",
  padding:
    "8px 12px",
  borderRadius:
    "8px",
  cursor:
    "pointer",
  fontWeight:
    "600"
};

export default DataTable;