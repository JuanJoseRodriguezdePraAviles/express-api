import jwt from 'jsonwebtoken'
import 'dotenv/config'
import bcrypt from "bcryptjs";

import { Request, Response } from 'express';
import { EmployeeModel } from '../schemas/employee.schema';

export const loginController = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
        const employee = await EmployeeModel.findOne({ email: username});
        if(!employee) {
            res.status(401).json({ message: "Invalid username or password"});
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if(!isPasswordValid) {
            res.status(401).json({ message: "Invalid username or password"});
            return;
        }
        const token = generateAccessToken(employee._id.toString());

        res.status(200).send({
            token: token,
            loggedUserID: employee._id
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