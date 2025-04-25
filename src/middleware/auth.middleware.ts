import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        res.status(401).json({ error: 'Token not provided'});
        return;
    }

    jwt.verify(token, process.env.SECRET_KEY as string, (err, user) => {
        if (err) {
            res.status(403).json({ error: 'Invalid or expired token'});
            return;
        }
        (req as any).user = user;
        next();
    })
}
const express = require('express');
const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    }
    next();
});