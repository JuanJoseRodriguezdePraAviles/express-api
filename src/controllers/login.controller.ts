import jwt from 'jsonwebtoken'
import 'dotenv/config'
import bcrypt from "bcryptjs";

import { Request, Response } from 'express';
import { EmployeeModel } from '../schemas/employee.schema';
import { RowDataPacket, FieldPacket } from 'mysql2';

export const loginController = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    
    try {
        const employee = await EmployeeModel.findOne({where: {email: username }});
        
        if(!employee) {
            res.status(401).json({ message: "Invalid username", username: req.body});
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if(!isPasswordValid) {
            res.status(401).json({ message: "Invalid password"});
            return;
        }
        const token = generateAccessToken(employee.DNI.toString());

        res.status(200).json({
            token: token,
            loggedUserID: employee.DNI
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error});
    }
}

function generateAccessToken(username: string) {
    return jwt.sign(
        { id: username },
        process.env.SECRET_KEY as string,
        { expiresIn: '1y' }
    )
  }