function UpcomingEvents({
  events = []
}) {

  return (
    <div
      style={{
  padding: "12px",
  marginBottom: "10px",
  background: "#f8fafc",
  borderRadius: "10px",
  borderLeft:
    "4px solid #2563eb",

  transition:
    "all 0.3s ease",
  cursor: "pointer"
}}
onMouseEnter={(e) => {
  e.currentTarget.style.transform =
    "translateY(-5px)";
  e.currentTarget.style.boxShadow =
    "0 10px 20px rgba(0,0,0,0.15)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform =
    "translateY(0)";
  e.currentTarget.style.boxShadow =
    "none";
}}
    >
      <h3
        style={{
          marginBottom: "20px"
        }}
      >
        📅 Upcoming Events
      </h3>

      {events.length > 0 ? (

        events.map(
          (event) => (
            <div
              key={event._id}
              style={{
                padding: "12px",
                marginBottom: "10px",
                background: "#f8fafc",
                borderRadius: "10px",
                borderLeft:
                  "4px solid #2563eb"
              }}
            >
              <h4
                style={{
                  margin: 0
                }}
              >
                {event.title}
              </h4>

              <p
                style={{
                  color: "#6b7280",
                  margin:
                    "5px 0"
                }}
              >
                {event.description}
              </p>

              <small
                style={{
                  color:
                    "#2563eb",
                  fontWeight:
                    "bold"
                }}
              >
                {new Date(
                  event.startDate
                ).toLocaleDateString()}
              </small>
            </div>
          )
        )

      ) : (

        <p>
          No Upcoming Events
        </p>

      )}
    </div>
  );
}

export default UpcomingEvents;