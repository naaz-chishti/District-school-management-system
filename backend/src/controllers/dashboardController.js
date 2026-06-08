import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import Parent from "../models/Parent.js";
import School from "../models/School.js";
import Fee from "../models/Fee.js";
import Event from "../models/Event.js";
import Leave from "../models/Leave.js";
import Notification from "../models/Notification.js";
import AuditLog from "../models/AuditLog.js";

export const getDashboard =
  async (req, res) => {

    try {

      const totalStudents =
        await Student.countDocuments();

      const totalTeachers =
        await Teacher.countDocuments();

      const totalParents =
        await Parent.countDocuments();

      const totalSchools =
        await School.countDocuments();

      const totalEvents =
        await Event.countDocuments();

      const totalLeaves =
        await Leave.countDocuments();

      const totalNotifications =
        await Notification.countDocuments();

      // Fee Statistics

      const fees =
        await Fee.find();

      const totalFeesCollected =
        fees.reduce(
          (total, fee) =>
            total +
            Number(
              fee.paidAmount || 0
            ),
          0
        );

      const totalPendingFees =
        fees.reduce(
          (total, fee) =>
            total +
            Number(
              fee.remainingAmount || 0
            ),
          0
        );

      // Recent Activities

      const recentActivities =
        await AuditLog.find()
          .sort({
            createdAt: -1
          })
          .limit(5)
          .populate(
            "userId",
            "name"
          );

      const formattedActivities =
        recentActivities.map(
          (item) => {

            const userName =
              item.userId?.name ||
              "System";

            return `${userName} ${item.action} ${item.module}`;
          }
        );

      // Upcoming Events

      const upcomingEvents =
        await Event.find({
          startDate: {
            $gte: new Date()
          }
        })
          .sort({
            startDate: 1
          })
          .limit(5);

      res.status(200).json({
        success: true,

        role:
          req.user?.role || "",

        dashboard: {

          totalStudents,
          totalTeachers,
          totalParents,
          totalSchools,

          totalEvents,
          totalLeaves,
          totalNotifications,

          totalFeesCollected,
          totalPendingFees,

          upcomingEvents
        },

        recentActivities:
          formattedActivities
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };