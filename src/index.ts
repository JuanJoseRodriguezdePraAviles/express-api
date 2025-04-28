import express from 'express';
import roomsRouter from './routes/rooms.routes';
import bookingsRouter from './routes/bookings.routes';
import reviewsRouter from './routes/reviews.routes';
import employeesRouter from './routes/employees.routes';
import loginRouter from './routes/login.routes';
import serverless from 'serverless-http';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/rooms", roomsRouter);
app.use("/api/v1/bookings", bookingsRouter);
app.use("/api/v1/reviews", reviewsRouter);
app.use("/api/v1/employees", employeesRouter);
app.use("/api/v1/login", loginRouter);

export const handler = serverless(app);