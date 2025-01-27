const Job = require("../models/jobSchema");
const transporter = require("../nodemailer/transporter")

const jobPosting =  async (req, res) => {
    const { title, description, experienceLevel, endDate, candidates } = req.body;
  
    try {
      const job = new Job({
        title,
        description,
        experienceLevel,
        endDate,
        company: req.user.id,
        candidates,  
      });
      await job.save();
  
      // Send emails to candidates
      candidates.forEach(async (candidate) => {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: candidate.email,
          subject: `Job Opportunity: ${title}`,
          html: `<p>Dear Candidate,</p><p>We have an exciting job opportunity for you: ${title}. Please check the details ${description} and apply.</p>`
        });
      });
  
      res.status(201).send({ message: 'Job posted and emails sent successfully.' });
    } catch (error) {
      res.status(500).send({ message: 'Job posting failed', error });
    }
};

module.exports = {jobPosting};