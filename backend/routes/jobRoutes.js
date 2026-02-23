const express = require("express");
const Job = require("../models/Job");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

/*
================================================
CREATE JOB (Admin + Recruiter)
================================================
*/
router.post(
  "/",
  verifyToken,
  authorizeRoles("admin", "recruiter"),
  async (req, res) => {
    try {
      const { title, description, company, location, salary } = req.body;

      const job = new Job({
        title,
        description,
        company,
        location,
        salary,
        status: "open",
        createdBy: req.user.id,
      });

      await job.save();

      res.status(201).json({
        message: "Job created successfully",
        job,
      });
    } catch (error) {
      console.log("CREATE JOB ERROR:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/*
================================================
GET JOBS CREATED BY LOGGED-IN RECRUITER
================================================
*/
router.get(
  "/my-jobs",
  verifyToken,
  authorizeRoles("recruiter", "admin"),
  async (req, res) => {
    try {
      const jobs = await Job.find({ createdBy: req.user.id }).sort({
        createdAt: -1,
      });

      res.json(jobs);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  }
);

/*
================================================
GET ALL JOBS (Public)
================================================
*/
router.get("/", async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

/*
================================================
GET SINGLE JOB
================================================
*/
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json(job);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

/*
================================================
UPDATE JOB (Owner Recruiter OR Admin)
================================================
*/
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "recruiter"),
  async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);

      if (!job) return res.status(404).json({ message: "Job not found" });

      if (
        req.user.role === "recruiter" &&
        job.createdBy.toString() !== req.user.id
      ) {
        return res.status(403).json({ message: "Not authorized" });
      }

      Object.assign(job, req.body);
      await job.save();

      res.json(job);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  }
);

/*
================================================
DELETE JOB (Owner Recruiter OR Admin)
================================================
*/
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "recruiter"),
  async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);

      if (!job) return res.status(404).json({ message: "Job not found" });

      if (
        req.user.role === "recruiter" &&
        job.createdBy.toString() !== req.user.id
      ) {
        return res.status(403).json({ message: "Not authorized" });
      }

      await job.deleteOne();
      res.json({ message: "Job deleted successfully" });
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;