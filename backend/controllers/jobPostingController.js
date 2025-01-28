const Job = require("../models/jobSchema");
const transporter = require("../nodemailer/transporter")
const Company = require("../models/companySchema");

// const jobPosting =  async (req, res) => {
//     const { title, description, experienceLevel, endDate, candidates } = req.body;
  
//     try {
//       const job = new Job({
//         title,
//         description,
//         experienceLevel,
//         endDate,
//         company: req.user.id,
//         candidates,  
//       });
//       await job.save();
  
//       // Send emails to candidates
//       candidates.forEach(async (candidate) => {
//         await transporter.sendMail({
//           from: process.env.EMAIL_USER,
//           to: candidate.email,
//           subject: `Job Opportunity: ${title}`,
//           html: `<p>Dear Candidate,</p><p>We have an exciting job opportunity for you: ${title}. Please check the details ${description} and apply.</p>`
//         });
//       });
  
//       res.status(201).send({ message: 'Job posted and emails sent successfully.' });
//     } catch (error) {
//       res.status(500).send({ message: 'Job posting failed', error });
//     }
// };

// module.exports = {jobPosting};

// const Job = require('../models/Job'); // Assuming you have a Job model
// const Company = require('../models/Company'); // Assuming you have a Company model

const postJob = async (req, res) => {
  const { title, description, experienceLevel, endDate, candidates } = req.body;

  try {
    // Retrieve company details from the database
    const company = await Company.findById(req.user.id); // Ensure company is linked to the user
  
    if (!company) {
      return res.status(400).send({ message: 'Company details not found.' });
    }

    // Create a new job posting
    const job = new Job({
      title,
      description,
      experienceLevel,
      endDate,
      company: req.user.id,
      candidates,  
    });
    
    await job.save(); // Save the job to the database

    // Send emails to all candidates
    candidates.forEach(async (candidate) => {
      try {
        // Send the email
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: candidate.email,
          subject: `Job Opportunity: ${title}`,
          html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 10px;">
              <div style="text-align: center;">
                <h2 style="color: #333;">Job Opportunity from ${company.name}</h2>
              </div>
              <p style="font-size: 16px; color: #333;">We have an exciting job opportunity for you:</p>
              <h3 style="color: #2C3E50;">${title}</h3>
              <p style="font-size: 16px; color: #333;">Job Description: ${description}</p>
              <p style="font-size: 16px; color: #333;">Experience Level: ${experienceLevel}</p>
              <p style="font-size: 16px; color: #333;">Application Deadline: ${endDate}</p>
              <p style="font-size: 16px; color: #333;">To apply or learn more, please visit <a href="${company.website}" style="color: #3498db;">our website</a>.</p>
              <p style="font-size: 16px; color: #333;">Contact Information:</p>
              <ul>
                <li><strong>Company Email:</strong> ${company.email}</li>
                <li><strong>Company Phone:</strong> ${company.mobile}</li>
              </ul>
              <p style="font-size: 16px; color: #333;">We look forward to hearing from you!</p>
              <div style="border-top: 1px solid #ddd; padding-top: 10px; margin-top: 20px;">
                <p style="font-size: 14px; color: #666;">Best regards,</p>
                <p style="font-size: 14px; color: #666;">The ${company.name} Team</p>
              </div>
            </div>
          `
        });

        console.log(`Job opportunity email sent to ${candidate.email}`);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }
    });

    // Respond to the client
    res.status(201).send({ message: 'Job posted successfully, and emails have been sent to candidates.' });
  } catch (error) {
    console.error('Error posting job:', error);
    res.status(500).send({ message: 'Failed to post the job' });
  }
};


module.exports = {postJob};