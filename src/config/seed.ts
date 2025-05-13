/*
DROP TABLE review, room, booking;
CREATE TABLE IF NOT EXISTS room (
	ID VARCHAR(20) NOT NULL PRIMARY KEY,
    room_name VARCHAR(40) NOT NULL,
    room_type ENUM('Single Bed', 'Double Bed', 'Double Superior', 'Suite'),
    room_floor VARCHAR(5),
    status ENUM('Booked', 'Available'),
    description VARCHAR(1000),
    photos VARCHAR(1000),
    offer BOOLEAN,
    price INT,
    discount INT,
    cancellation_policy VARCHAR(1000),
    room_amenities ENUM('3 Bed Space', '24 Hours Guard', 'Free Wifi', '2 Bathroom', 'Air Conditioner', 'Television')
);
CREATE TABLE IF NOT EXISTS review (
	ID VARCHAR(9) NOT NULL PRIMARY KEY,
    email VARCHAR(40) NOT NULL,
    date DATE NOT NULL,
    DNI VARCHAR(9) NOT NULL,
    customer_name VARCHAR(50) NOT NULL,
    phone VARCHAR(13) NOT NULL,
    subject VARCHAR(40) NOT NULL,
    comment VARCHAR(1000) NOT NULL,
    archived BOOLEAN NOT NULL,
    clientID VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS booking (
	ID VARCHAR(20) NOT NULL PRIMARY KEY,
    roomID VARCHAR(9) NOT NULL,
    FOREIGN KEY (roomID) REFERENCES room(ID),
    reviewID VARCHAR(9),
    FOREIGN KEY (reviewID) REFERENCES review(ID),
    clientID VARCHAR(20) NOT NULL,
    client_name VARCHAR(100),
    client_email VARCHAR(100),
    client_phone VARCHAR(13),
    order_date DATE,
    check_in_date DATE,
    check_out_date DATE,
    status ENUM('Check In', 'Check Out', 'In Progress'),
    special_request VARCHAR(1000)
);

ALTER TABLE review
ADD FOREIGN KEY (clientID) REFERENCES booking(ID);

CREATE TABLE IF NOT EXISTS employee (
	DNI VARCHAR(20) NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(40) NOT NULL,
    job_functions VARCHAR(1000),
    registration_date DATE,
    phone VARCHAR(13),
    schelude VARCHAR(100),
    status BOOLEAN
);

*/
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
import bcrypt from 'bcryptjs';

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

        const testEmployee = {
            name: "Test user",
            email: "test@example.com",
            password: await bcrypt.hash("test1234", 10),
            job_functions: "Testing",
            registration_date: new Date(),
            phone: "555-555-555",
            schelude: "9-15",
            status: true
        }
        resultEmployee.push(testEmployee);

        await EmployeeModel.insertMany(resultEmployee);
        console.log(`${resultReview.length} inserted employees`);

        mongoose.disconnect();
    } catch (err) {
        console.log("population BD error", err);
    }
}

seed();