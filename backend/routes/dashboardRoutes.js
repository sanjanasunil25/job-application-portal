const express = require("express");
const router = express.Router();

const Job = require("../models/Job");
const Application = require("../models/Application");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

/*
================================================
ADMIN DASHBOARD STATS
================================================
*/

router.get("/stats", verifyToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const openJobs = await Job.countDocuments({ status: "open" });
    const closedJobs = await Job.countDocuments({ status: "closed" });

    const totalApplications = await Application.countDocuments();
    const pendingApplications = await Application.countDocuments({ status: "pending" });
    const acceptedApplications = await Application.countDocuments({ status: "accepted" });
    const rejectedApplications = await Application.countDocuments({ status: "rejected" });

    res.json({
      jobs: {
        totalJobs,
        openJobs,
        closedJobs
      },
      applications: {
        totalApplications,
        pendingApplications,
        acceptedApplications,
        rejectedApplications
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;