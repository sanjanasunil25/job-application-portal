const Application = require("../models/Application");
const Job = require("../models/Job");

/*
USER APPLY FOR JOB
*/
exports.applyForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job || job.status !== "open") {
      return res.status(400).json({ message: "Job not available" });
    }

    const existingApplication = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user.id,
    });

    if (existingApplication) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await Application.create({
      job: req.params.jobId,
      applicant: req.user.id,
      resume: req.body.resume || "",
      status: "pending",
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*
USER VIEW OWN APPLICATIONS
*/
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    }).populate("job");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*
RECRUITER VIEW JOB APPLICATIONS
*/
exports.getApplicationsForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const applications = await Application.find({
      job: req.params.jobId,
    })
      .populate("applicant", "name email")
      .populate("job", "title company");

    res.json(applications);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/*
UPDATE APPLICATION STATUS
*/
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(req.params.id).populate("job");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (
      req.user.role === "recruiter" &&
      application.job.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    application.status = status;
    await application.save();

    res.json({
      message: "Application status updated successfully",
      application,
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};