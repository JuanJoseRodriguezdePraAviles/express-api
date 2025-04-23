"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBookingById = exports.getAllBookings = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const bookingsFilePath = path_1.default.join(__dirname, '../../public/Bookings.json');
const readBookingsFromFile = () => {
    const fileData = fs_1.default.readFileSync(bookingsFilePath, 'utf-8');
    return JSON.parse(fileData);
};
const getAllBookings = () => {
    return readBookingsFromFile();
};
exports.getAllBookings = getAllBookings;
const getBookingById = (id) => {
    const bookings = readBookingsFromFile();
    return bookings.find(booking => String(booking.booking_id) === id);
};
exports.getBookingById = getBookingById;
const createBooking = (newBooking) => {
    const bookings = readBookingsFromFile();
    newBooking.booking_id = Date.now().toString();
    bookings.push(newBooking);
    fs_1.default.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2), 'utf-8');
    return newBooking;
};
exports.createBooking = createBooking;
const updateBooking = (id, updateBooking) => {
    const bookings = readBookingsFromFile();
    const index = bookings.findIndex(booking => String(booking.booking_id) === id);
    if (index !== -1) {
        bookings[index] = { ...bookings[index], ...updateBooking };
        fs_1.default.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2), 'utf-8');
        return bookings[index];
    }
    return undefined;
};
exports.updateBooking = updateBooking;
const deleteBooking = (id) => {
    const bookings = readBookingsFromFile();
    const index = bookings.findIndex(booking => String(booking.booking_id) === id);
    if (index !== -1) {
        const deletedBooking = bookings.splice(index, 1);
        fs_1.default.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2), 'utf-8');
        return deletedBooking[0];
    }
    return undefined;
};
exports.deleteBooking = deleteBooking;
