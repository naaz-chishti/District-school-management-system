import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack
} from "@mui/material";

import {
  useNavigate
} from "react-router-dom";

function QuickActions() {

  const navigate =
    useNavigate();

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
          Quick Actions
        </Typography>

        <Stack spacing={2}>

          <Button
            variant="contained"
            onClick={() =>
              navigate("/students")
            }
          >
            Add Student
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={() =>
              navigate("/teachers")
            }
          >
            Add Teacher
          </Button>

          <Button
            variant="contained"
            color="warning"
            onClick={() =>
              navigate("/fees")
            }
          >
            Add Fee
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              navigate("/exams")
            }
          >
            Create Exam
          </Button>

        </Stack>

      </CardContent>
    </Card>
  );
}

export default QuickActions;