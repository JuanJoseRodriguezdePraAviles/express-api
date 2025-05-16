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
            await sequelize.query(
                `INSERT INTO room (roomName, roomType, roomFloor, status, description, photos,
                    offer, price, discount, cancellationPolicy, roomAmenities) VALUES (:roomName,
                    :roomType, :roomFloor, :status, :description, :photos, :offer, :price, :discount,
                    :cancellationPolicy, :roomAmenities)`,
                { replacements: room as { [key: string]: any }}
            );
        }

        const bookings = await createBookingsForRooms();
        for(const booking of bookings) {
            await sequelize.query(
                `INSERT INTO booking (roomId, clientId, clientName, clientEmail, clientPhone,
                    orderDate, checkInDate, checkOutDate, status, specialRequest) VALUES (:roomId,
                    :clientId, :clientName, :clientEmail, :clientPhone, :orderDate, :checkInDate,
                    :checkOutDate, :status, :specialRequest)`,
                { replacements: booking as { [key: string]: any }}
            );
        }

        const reviews = await createReviewsForBookings();
        for(const review of reviews) {
            await sequelize.query(
                `INSERT INTO review (email, date, clientId, customerName, phone, subject,
                    comment, archived) VALUES (:email, :date, :clientId, :customerName,
                    :phone, :subject, :comment, :archived)`,
                { replacements: review as { [key: string]: any }}
            );
        }

        const loadedEmployees = await employees();
        for(const employee of loadedEmployees) {
            await sequelize.query(
                `INSERT INTO employee (name, email, password, jobFunctions, registrationDate, phone,
                    schelude, status) VALUES (:name, :email, :password, :jobFunctions, :registrationDate,
                    :phone, :schelude, :status)`,
                { replacements: employee as { [key: string]: any }}
            );
        }

        const hashedPassword = await bcrypt.hash("test1234", 10);
        const testEmployee = {
            dni: "test",
            name: "Test user",
            email: "test@example.com",
            password: hashedPassword,
            jobFunctions: "Testing",
            registrationDate: new Date().toISOString().slice(0, 10),
            phone: "555-555-555",
            schelude: "9-15",
            status: true
        }
        await sequelize.query(
            `INSERT INTO employee (dni, name, email, password, jobFunctions, registrationDate, phone,
                    schelude, status) VALUES (:dni, :name, :email, :password, :jobFunctions, :registrationDate,
                    :phone, :schelude, :status)`,
                { replacements: testEmployee as { [key: string]: any }}
        );
    } catch (err) {
        console.log("population BD error", err);
    }
}

seed();