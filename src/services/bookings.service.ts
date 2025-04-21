import fs from 'fs';
import path from 'path';
import { Booking } from '../interfaces/Booking';

const bookingsFilePath = path.join(__dirname, '../../public/Bookings.json');

const readBookingsFromFile = (): Booking[] => {
    const fileData = fs.readFileSync(bookingsFilePath, 'utf-8');
    return JSON.parse(fileData);
}

export const getAllBookings = (): Booking[] => {
    return readBookingsFromFile();
}

export const getBookingById = (id: string): Booking | undefined => {
    const bookings = readBookingsFromFile();
    return bookings.find(booking => String(booking.booking_id) === id);
}

export const createBooking = (newBooking: Booking): Booking => {
    const bookings = readBookingsFromFile();
    newBooking.booking_id = Date.now().toString();
    bookings.push(newBooking);
    fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2), 'utf-8');
    return newBooking;
}

export const updateBooking = (id: string, updateBooking: Partial<Booking>): Booking | undefined => {
    const bookings = readBookingsFromFile();
    const index = bookings.findIndex(booking => String(booking.booking_id) === id);

    if (index !== -1) {
        bookings[index] = { ...bookings[index], ...updateBooking };
        fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2), 'utf-8');
        return bookings[index];
    }
    return undefined;
}

export const deleteBooking = (id: string): Booking | undefined => {
    const bookings = readBookingsFromFile();
    const index = bookings.findIndex(booking => String(booking.booking_id) === id);

    if (index !== -1) {
        const deletedBooking = bookings.splice(index, 1);
        fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2), 'utf-8');
        return deletedBooking[0];
    }
    return undefined;
}