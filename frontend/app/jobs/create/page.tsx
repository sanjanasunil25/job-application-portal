router.post(
  "/",
  verifyToken,
  authorizeRoles("admin", "recruiter"),
  async (req, res) => {
    try {
      const { title, description, company, location, salary } = req.body;

      if (!title || !company || !location) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const job = new Job({
        title,
        description: description || "",
        company,
        location,
        salary: salary || 0,
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
      res.status(500).json({ message: error.message });
    }
  }
);