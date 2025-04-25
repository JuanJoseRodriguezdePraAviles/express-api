import express from 'express';
import roomsRouter from './routes/rooms.routes';
import bookingsRouter from './routes/bookings.routes';
import reviewsRouter from './routes/reviews.routes';
import employeesRouter from './routes/employees.routes';
import loginRouter from './routes/login.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/rooms", roomsRouter);
app.use("/api/v1/bookings", bookingsRouter);
app.use("/api/v1/reviews", reviewsRouter);
app.use("/api/v1/employees", employeesRouter);
app.use("/api/v1/login", loginRouter);

app.listen(PORT, () => {
    console.log(`Server listening en http://localhost:${PORT}`)
});