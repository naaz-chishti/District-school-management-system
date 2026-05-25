import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import schoolRoutes from "./routes/schoolRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import parentRoutes from "./routes/parentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import feeRoutes from "./routes/feeRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import timetableRoutes from "./routes/timetableRoutes.js";
import transportRoutes from "./routes/transportRoutes.js";
import hostelRoutes from "./routes/hostelRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import portalRoutes from "./routes/portalRoutes.js";
import payrollRoutes from "./routes/payrollRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import auditRoutes from "./routes/auditRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import {
  protect,
  authorizeRoles
} from "./middleware/authMiddleware.js";

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/transports", transportRoutes);
app.use("/api/hostel", hostelRoutes);
app.use("/api/notifications",notificationRoutes);
app.use("/api/portal", portalRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/audit", auditRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/users", userRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("District School Management API Running...");
});

// Protected Admin Route
app.get(
  "/api/admin-only",
  protect,
  authorizeRoles("district_admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome District Admin"
    });
  }
);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});