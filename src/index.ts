import express from 'express';
import roomsRouter from './routes/rooms.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/rooms", roomsRouter);

app.listen(PORT, () => {
    console.log(`Server listening en http://localhost:${PORT}`)
});