import dotenv from 'dotenv';
import { rooms } from './fake.rooms';
import { createBookingsForRooms, getRoomIDs } from './fake.bookings';
import { createReviewsForBookings, getBookingIDs } from './fake.reviews';
import { employees } from './fake.employees';
import bcrypt from 'bcryptjs';
import { sequelize } from './database';
import { Booking } from '../interfaces/Booking';
import { QueryTypes } from 'sequelize';
import { Review } from '../interfaces/Review';

dotenv.config();

export async function seed() {
    try {
        await sequelize.sync({ force: true });

        for(const room of rooms) {
            console.log("Datos que intento insertar:", room);
            await sequelize.query(
                `INSERT INTO room (room_name, room_type, room_floor, status, description, photos,
                    offer, price, discount, cancellation_policy, room_amenities) VALUES (:room_name,
                    :room_type, :room_floor, :status, :description, :photos, :offer, :price, :discount,
                    :cancellation_policy, :room_amenities)`,
                { replacements: room as { [key: string]: any }}
            );
        }
        console.log(`${rooms.length} inserted rooms`);

        const bookings = await createBookingsForRooms();
        console.log(bookings);
        for(const booking of bookings) {
            await sequelize.query(
                `INSERT INTO booking (roomID, clientID, client_name, client_email, client_phone,
                    order_date, check_in_date, check_out_date, status, special_request) VALUES (:roomID,
                    :clientID, :client_name, :client_email, :client_phone, :order_date, :check_in_date,
                    :check_out_date, :status, :special_request)`,
                { replacements: booking as { [key: string]: any }}
            );
        }
        console.log(`${bookings.length} inserted bookings`);

        const reviews = await createReviewsForBookings();
        for(const review of reviews) {
            await sequelize.query(
                `INSERT INTO review (email, date, clientID, customer_name, phone, subject,
                    comment, archived) VALUES (:email, :date, :clientID, :customer_name,
                    :phone, :subject, :comment, :archived)`,
                { replacements: review as { [key: string]: any }}
            );
        }
        console.log(`${reviews.length} inserted reviews`);

        const loadedEmployees = await employees();
        for(const employee of loadedEmployees) {
            console.log('employee trying to insert' + employee);
            await sequelize.query(
                `INSERT INTO employee (name, email, password, job_functions, registration_date, phone,
                    schelude, status) VALUES (:name, :email, :password, :job_functions, :registration_date,
                    :phone, :schelude, :status)`,
                { replacements: employee as { [key: string]: any }}
            );
        }
        console.log(`${employees.length} inserted employees`);

        const hashedPassword = await bcrypt.hash("test1234", 10);
        console.log("Hashed password length:", hashedPassword.length);
        const testEmployee = {
            DNI: "test",
            name: "Test user",
            email: "test@example.com",
            password: hashedPassword,
            job_functions: "Testing",
            registration_date: new Date().toISOString().slice(0, 10),
            phone: "555-555-555",
            schelude: "9-15",
            status: true
        }
        console.log("Inserting test employee:", Object.keys(testEmployee));
        await sequelize.query(
            `INSERT INTO employee (DNI, name, email, password, job_functions, registration_date, phone,
                    schelude, status) VALUES (:DNI, :name, :email, :password, :job_functions, :registration_date,
                    :phone, :schelude, :status)`,
                { replacements: testEmployee as { [key: string]: any }}
        );
    } catch (err) {
        console.log("population BD error", err);
    }
}

seed();