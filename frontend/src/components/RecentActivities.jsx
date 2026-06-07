import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";

function RecentActivities({
  activities = []
}) {

  return (
    <Card
      sx={{
        borderRadius: "20px",
        boxShadow: 4
      }}
    >
      <CardContent>

        <Typography
          variant="h6"
          fontWeight="bold"
          mb={2}
        >
          Recent Activities
        </Typography>

        <List>

          {activities.length > 0 ? (

            activities.map(
              (activity, index) => (

                <div key={index}>

                  <ListItem>

                   <ListItem
  sx={{
    transition: "all 0.3s ease",
    cursor: "pointer",
    borderRadius: "10px",

    "&:hover": {
      backgroundColor: "#EFF6FF",
      transform: "translateX(8px)"
    }
  }}
>
  <ListItemText
    primary={activity}
  />
</ListItem>

                  </ListItem>

                  {index !== activities.length - 1 && (
                    <Divider />
                  )}

                </div>

              )
            )

          ) : (

            <ListItem>

              <ListItemText
                primary="No Recent Activities"
              />

            </ListItem>

          )}

        </List>

      </CardContent>
    </Card>
  );
}

export default RecentActivities;