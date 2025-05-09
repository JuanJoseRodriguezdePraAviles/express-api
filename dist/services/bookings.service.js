"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBookingById = exports.getAllBookings = void 0;
const booking_schema_1 = require("../schemas/booking.schema");
const booking_validator_1 = __importDefault(require("../validators/booking.validator"));
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
        const validatedBooking = booking_validator_1.default.validateBooking(newBooking);
        if (!validatedBooking) {
            throw new Error(`Booking validation failed: ${booking_validator_1.default.errors.join(', ')}`);
        }
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
