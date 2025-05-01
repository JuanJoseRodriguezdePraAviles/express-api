import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { rooms } from './fake.rooms';
import { reviews } from './fake.reviews';
import { generateEmployees } from './fake.employees';
import { BookingModel } from '../schemas/booking.schema';
import { RoomModel } from '../schemas/room.schema';
import { ReviewModel } from '../schemas/review.schema';
import { EmployeeModel } from '../schemas/employee.schema';
import { createRandomBooking } from './fake.bookings';

dotenv.config();

export async function seed() {
    try {
        await mongoose.connect(process.env.DB_CONN_STRING as string, {
            dbName: process.env.DB_NAME
        })
        await RoomModel.deleteMany();
        const resultRoom = await RoomModel.insertMany(rooms);
        console.log(`${resultRoom.length} inserted rooms`);

        await BookingModel.deleteMany();
        const bookings = resultRoom.map(room => createRandomBooking(room.id));
        const resultBooking = await BookingModel.insertMany(bookings);
        console.log(`${resultBooking.length} inserted bookings`);

        await ReviewModel.deleteMany();
        const resultReview = await ReviewModel.insertMany(reviews);
        console.log(`${resultReview.length} inserted reviews`);

        await EmployeeModel.deleteMany();
        const resultEmployee = await generateEmployees(10);
        await EmployeeModel.insertMany(resultEmployee);
        console.log(`${resultReview.length} inserted employees`);

        mongoose.disconnect();
    } catch (err) {
        console.log("population BD error", err);
    }
}

seed();