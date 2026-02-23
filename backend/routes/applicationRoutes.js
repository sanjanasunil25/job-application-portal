const express = require("express");
const router = express.Router();

const Application = require("../models/Application");
const Job = require("../models/Job");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

/*
================================================
1️⃣ USER APPLY FOR JOB
POST /applications/apply/:jobId
================================================
*/
router.post(
  "/apply/:jobId",
  verifyToken,
  authorizeRoles("user"),
  async (req, res) => {
    try {
      const job = await Job.findById(req.params.jobId);

      if (!job || job.status !== "open") {
        return res.status(400).json({ message: "Job not available" });
      }

      const alreadyApplied = await Application.findOne({
        job: req.params.jobId,
        applicant: req.user.id,
      });

      if (alreadyApplied) {
        return res.status(400).json({ message: "You already applied for this job" });
      }

      const application = await Application.create({
        job: req.params.jobId,
        applicant: req.user.id,
        resume: req.body.resume || "",
        status: "pending",
      });

      res.status(201).json({
        success: true,
        message: "Application submitted successfully",
        application,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

/*
================================================
2️⃣ USER VIEW OWN APPLICATIONS
GET /applications/my-applications
================================================
*/
router.get(
  "/my-applications",
  verifyToken,
  authorizeRoles("user"),
  async (req, res) => {
    try {
      const applications = await Application.find({
        applicant: req.user.id,
      })
        .populate("job")
        .sort({ createdAt: -1 });

      res.json({ success: true, applications });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

/*
================================================
3️⃣ ADMIN VIEW ALL APPLICATIONS
GET /applications
================================================
*/
router.get(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const applications = await Application.find()
        .populate("job")
        .populate("applicant", "name email")
        .sort({ createdAt: -1 });

      res.json({ success: true, applications });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

/*
================================================
4️⃣ RECRUITER VIEW APPLICATIONS FOR OWN JOB
GET /applications/job/:jobId
================================================
*/
router.get(
  "/job/:jobId",
  verifyToken,
  authorizeRoles("recruiter"),
  async (req, res) => {
    try {
      const job = await Job.findById(req.params.jobId);

      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      if (job.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      const applications = await Application.find({
        job: req.params.jobId,
      })
        .populate("applicant", "name email")
        .populate("job", "title company")
        .sort({ createdAt: -1 });

      res.json({ success: true, applications });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

/*
================================================
5️⃣ UPDATE APPLICATION STATUS
PATCH /applications/:id/status
================================================
*/
router.patch(
  "/:id/status",
  verifyToken,
  authorizeRoles("recruiter", "admin"),
  async (req, res) => {
    try {
      const { status } = req.body;

      if (!["pending", "accepted", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }

      const application = await Application.findById(req.params.id).populate("job");

      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }

      // Recruiter can only update their own job applications
      if (
        req.user.role === "recruiter" &&
        application.job.createdBy.toString() !== req.user.id
      ) {
        return res.status(403).json({ message: "Access denied" });
      }

      application.status = status;
      await application.save();

      res.json({
        success: true,
        message: "Application status updated successfully",
        application,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

module.exports = router;