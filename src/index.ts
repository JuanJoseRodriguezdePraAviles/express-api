import express from 'express';
import roomsRouter from './routes/rooms.routes';
import bookingsRouter from './routes/bookings.routes';
import reviewsRouter from './routes/reviews.routes';
import employeesRouter from './routes/employees.routes';
import loginRouter from './routes/login.routes';
import serverless from 'serverless-http';
import { connectDB } from './config/database';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express'; 

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
    origin: 'http://hotel-dashboard-96.s3-website.eu-north-1.amazonaws.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
    if(Buffer.isBuffer(req.body)) {
        try {
            req.body = JSON.parse(req.body.toString('utf8'));
        } catch (err) {
            console.error("Error parsing buffer body:", err);
        }
    }
    next();
});

app.use("/api/v1/rooms", roomsRouter);
app.use("/api/v1/bookings", bookingsRouter);
app.use("/api/v1/reviews", reviewsRouter);
app.use("/api/v1/employees", employeesRouter);
app.use("/api/v1/login", loginRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error:", err);

  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

export const handler = serverless(app);

if(process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running at http://:localhost:${PORT}`);
    });
}

