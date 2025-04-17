import { error } from 'console';
import pool from '../config/db.config'
import { asyncHandler } from '../middlewares/asyncHandler';
import { Request,Response } from 'express';


export const getAllSkills = asyncHandler(async(req:Request,res:Response)=> {
   const result = await pool.query("SELECT * FROM skill ");
   res.status(200).json(result.rows);
   return;
})

export const getSkillById = asyncHandler(async(req:Request,res:Response)=> {
    const skillId = parseInt(req.params.id);
    if(isNaN(skillId)) {
        res.status(400).json({error: 'Invalid skill ID'});

        const result = await pool.query("SELECT * FROM skill WHERE id=$1", [skillId]);

        if(result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        }
    }


})

export const createSkill = asyncHandler(async(req:Request,res:Response)=> {
    const {name} = req.body;
    if(!name) {
        res.status(400).json({error: 'Skill name is required! '})
    }

    const result = await pool.query("INSERT INTO skill (name) VALUES ($1) RETURNING id,name",[name]);
    res.status(201).json(result.rows[0]);
})

export const updateSkill = asyncHandler(async(req:Request,res:Response)=> {
    const skillId = parseInt(req.params.id);
    const {name} = req.body;
    if(isNaN(skillId)) {
        res.status(400).json({error: "Invalid skill ID"});

    }

    if(!name){
        res.status(400).json({error: "skill name Is required! "})
    }

    const result = await pool.query("UPDATE skill SET name=$1 WHERE id=$2 RETURNING id,name",[name,skillId])
    if(result.rows.length > 0 ) {
        res.status(200).json({message: "Skill Updated",
            result: result.rows[0]
        })
        return;
    }
})

export const  deleteSkill = asyncHandler(async(req:Request,res:Response)=> {
    const skillId = parseInt(req.params.id);
    if(isNaN(skillId)){
      res.status(400).json({error: "Invalid Skill ID!"})
    }

    const result = await pool.query("DELETE FROM skill WHERE id=$1 RETURNING id", [skillId])

    if(result.rows.length > 0) {
        res.status(200).json({message: `Skill with Id ${skillId} deleted successfully`})
        return

    }else {
        res.status(404).json({message: "Skill not Found"})
        return
    }
})