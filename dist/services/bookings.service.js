"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBookingById = exports.getAllBookings = void 0;
const booking_schema_1 = require("../schemas/booking.schema");
const getAllBookings = async () => {
    const bookings = await booking_schema_1.BookingModel.find();
    return bookings;
};
exports.getAllBookings = getAllBookings;
const getBookingById = async (id) => {
    const booking = await booking_schema_1.BookingModel.findOne({ _id: id });
    return booking;
};
exports.getBookingById = getBookingById;
const createBooking = async (newBooking) => {
    try {
        const booking = new booking_schema_1.BookingModel({
            ...newBooking
        });
        await booking.save();
        return booking;
    }
    catch (error) {
        throw error;
    }
};
exports.createBooking = createBooking;
const updateBooking = async (id, updateBooking) => {
    const booking = await booking_schema_1.BookingModel.findOneAndUpdate({ _id: id }, updateBooking, { new: true });
    return booking;
};
exports.updateBooking = updateBooking;
const deleteBooking = async (id) => {
    const deleted = await booking_schema_1.BookingModel.findOneAndDelete({ _id: id });
    if (!deleted) {
        return false;
    }
    return true;
};
exports.deleteBooking = deleteBooking;
