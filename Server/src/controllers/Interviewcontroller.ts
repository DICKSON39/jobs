import pool from "../config/db.config";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Request,Response } from "express";

export const getAllInterviews = asyncHandler(async(req:Request,res:Response)=> {
    console.log('Get/api/interviews requested')
    const result = await pool.query('SELECT * FROM interview');
    res.status(200).json(result.rows);
    return;
})

export const getInterviewById = asyncHandler(async(req:Request,res:Response)=>{
    const id = parseInt(req.params.id);
  if (isNaN(id)) {
     res.status(400).json({ error: 'Invalid interview ID' });
     return;
  }
  const result = await pool.query('SELECT * FROM interview WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
      return;
    } else {
      res.status(404).json({ message: 'Interview not found' });
      return;
    }
})

export const createInterview = asyncHandler(async (req: Request, res: Response) => {
  const { applicationId, scheduledDate, status = 'scheduled', notes } = req.body;
  //console.log('📦 Received interview:', { applicationId, scheduledDate, status, notes });

  // Check if applicationId and scheduledDate are provided
  if (!applicationId || !scheduledDate) {
    
    res.status(400).json({ error: 'Application ID and scheduled date are required' });
    return;
  }

  try {
    // Ensure scheduledDate is in ISO format (if necessary)
    const isoScheduledDate = new Date(scheduledDate).toISOString(); // Convert to ISO if it's not already

    // Query to insert into the interview table
    const result = await pool.query(
      'INSERT INTO interview (application_id, "scheduledDate", status, notes) VALUES ($1, $2, $3, $4) RETURNING *',
      [applicationId, isoScheduledDate, status, notes || 'No notes provided'] // Default notes if none are provided
    );

    // Respond with the newly created interview
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating interview:', err);
    res.status(500).json({ error: 'Failed to create interview' });
  }
});


export const updateInterview = asyncHandler(async(req:Request,res:Response)=> {
    const id = parseInt(req.params.id);
  const { applicationId, scheduledDate, status, notes } = req.body;
  if (isNaN(id)) {
     res.status(400).json({ error: 'Invalid interview ID' });
     return
  }

  if (!applicationId || !scheduledDate || !status) {
     res.status(400).json({ error: 'Application ID, "scheduledDate", and status are required' });
     return;
  }

  const result = await pool.query(
    'UPDATE interview SET application_id = $1, scheduled_date = $2, status = $3, notes = $4 WHERE id = $5 RETURNING *',
    [applicationId, scheduledDate, status, notes, id]
  );
  if (result.rows.length > 0) {
    res.status(200).json(result.rows[0]);
  } else {
    res.status(404).json({ message: 'Interview not found' });
  }
})

export const deleteInterView = asyncHandler(async(req:Request,res:Response)=> {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid interview ID' });
    }

    const result = await pool.query('DELETE FROM interview WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length > 0) {
      res.status(200).json({ message: `Interview with ID ${id} deleted successfully` });
      return;
    } else {
      res.status(404).json({ message: 'Interview not found' });
      return;
    }


})

// export const g = asyncHandler(async(req:Request,res:Response)=>{
//     const applicationId = parseInt(req.params.applicationId);
//   if (isNaN(applicationId)) {
//      res.status(400).json({ error: 'Invalid Application ID' });
//      return;
//   }
//   const result = await pool.query('SELECT * FROM interview WHERE application_id = $1', [applicationId]);
//   res.status(200).json(result.rows);
// });

export const getInterviewsByApplication = asyncHandler(async (req: Request, res: Response) => {
  console.log('Raw userId param:', req.params.userId); // Debugging line

  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) {
    res.status(400).json({ error: 'Invalid User ID' });
    return;
  }

  try {
    // Correct SQL to get interviews by user_id (use user_id for consistency)
    const result = await pool.query(
      `SELECT i.* 
       FROM interview i
       JOIN application a ON i.application_id = a.id
       WHERE a.user_id = $1`, // Make sure the column name is user_id, not userId
      [userId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});





export const getUserProfileDetails = asyncHandler(async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) {
    res.status(400).json({ error: 'Invalid User ID' });
    return;
  }

  // Get CVs
  const cvResult = await pool.query('SELECT * FROM cv WHERE user_id = $1', [userId]);

  // Get Skills
  const skillsResult = await pool.query(`
    SELECT 
      s.name AS "skillName", 
      us."yearsExperience"
    FROM user_skill us
    JOIN skill s ON us."skillId" = s.id
    WHERE us."userId" = $1
  `, [userId]);

  // Optional: get user name (if you want to include it in the response)
  const userResult = await pool.query('SELECT name FROM "user" WHERE id = $1', [userId]);
  const userName = userResult.rows[0]?.name || null;

  // Combine the results
  res.status(200).json({
    userId,
    userName,
    cvs: cvResult.rows,
    skills: skillsResult.rows
  });
});



export const getUserInterviewNotifications = asyncHandler(async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) {
    res.status(400).json({ error: 'Invalid User ID' });
    return
  }

  const result = await pool.query(`
    SELECT 
      i.id AS "interviewId",
      i.scheduled_at AS "scheduledAt",
      i.location,
      i.mode,

      j.title AS "jobTitle",
      j.company,

      r.name AS "recruiterName",
      r.email AS "recruiterEmail"

    FROM interview i
    JOIN application a ON i.application_id = a.id
    JOIN job j ON a.job_id = j.id
    LEFT JOIN "user" r ON j.recruiterid = r.id
    WHERE a.user_id = $1
    ORDER BY i.scheduled_at DESC
  `, [userId]);

  res.status(200).json(result.rows);
});
