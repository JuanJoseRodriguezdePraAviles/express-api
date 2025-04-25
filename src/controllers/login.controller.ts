import jwt from 'jsonwebtoken'
import 'dotenv/config'


import { Request, Response } from 'express';

export const loginController = (req: Request, res: Response): void => {
    const { username, password } = req.body;
    if(username !== 'admin') {
        res.status(403).json({ message: "Ivalid username"})
    }
    if(password !== 'admin') {
        res.status(403).json({ message: "Ivalid password"})
    }
    const token = generateAccessToken(username);

    res.status(200).send({
        token: token,
        loggedUserID: username
    })

}

function generateAccessToken(username: string) {
    return jwt.sign(
        { id: username },
        process.env.SECRET_KEY as string,
        { expiresIn: '1y' }
    )
  }