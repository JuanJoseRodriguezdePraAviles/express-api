import jwt from 'jsonwebtoken'
import 'dotenv/config'
import bcrypt from "bcryptjs";

import { Request, Response } from 'express';
import { EmployeeModel } from '../schemas/employee.schema';

export const loginController = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    console.log("Login attempt:", req.body);
    try {
        console.log("Finding employee by email:", username);
        const employee = await EmployeeModel.findOne({ email: username });
        const employees = await EmployeeModel.find();
        if (!employee) {
            console.log("Employee not found");
            res.status(401).json({ message: "Invalid username", username: req.body });
            return;
        }
        console.log("Employee found, checking password...");
        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if (!isPasswordValid) {
            console.log("Invalid password");
            res.status(401).json({ message: "Invalid password" });
            return;
        }
        console.log("Password valid, generating token...");
        const token = generateAccessToken(employee._id.toString());

        console.log("Login successful");
        res.status(200).json({
            token: token,
            loggedUserID: employee._id
        });
    } catch (error) {
        console.error("Login Error:", error);
        console.error("Login Error (string):", JSON.stringify(error, null, 2));
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        }
        res.status(500).json({ message: "Internal server error", error });
    }
}

function generateAccessToken(username: string) {
    return jwt.sign(
        { id: username },
        process.env.SECRET_KEY as string,
        { expiresIn: '1y' }
    )
}