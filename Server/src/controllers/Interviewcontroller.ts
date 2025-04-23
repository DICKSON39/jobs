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
  console.log('📦 Received interview:', { applicationId, scheduledDate, status, notes });

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

export const getInterviewsByApplication = asyncHandler(async(req:Request,res:Response)=>{
    const applicationId = parseInt(req.params.applicationId);
  if (isNaN(applicationId)) {
     res.status(400).json({ error: 'Invalid Application ID' });
     return;
  }
  const result = await pool.query('SELECT * FROM interview WHERE application_id = $1', [applicationId]);
  res.status(200).json(result.rows);
});