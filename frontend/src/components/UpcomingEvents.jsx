function UpcomingEvents({
  events = []
}) {

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "15px",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.1)"
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