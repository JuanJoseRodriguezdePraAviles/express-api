"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
class BookingValidator {
}
_a = BookingValidator;
BookingValidator.errors = [];
BookingValidator.validateBooking = (booking) => {
    _a.errors = [];
    if (!booking || typeof booking !== 'object') {
        _a.errors.push("Invalid object booking");
    }
    if ('booking_id' in booking && typeof booking.booking_id !== 'string') {
        _a.errors.push("Invalid booking ID");
    }
    if ('room_id' in booking && typeof booking.room_id !== 'string') {
        _a.errors.push("Invalid room ID");
    }
    if ('room_name' in booking && typeof booking.room_name !== 'string') {
        _a.errors.push("Invalid booking room name");
    }
    if ('room_description' in booking && typeof booking.room_description !== 'string') {
        _a.errors.push("Invalid booking room description");
    }
    if ('room_type' in booking && typeof booking.room_type !== 'string') {
        _a.errors.push("Invalid booking room type");
    }
    if ('room_price' in booking && typeof booking.room_price !== 'number') {
        _a.errors.push("Invalid booking room price");
    }
    if ('room_status' in booking && typeof booking.room_status !== 'string') {
        _a.errors.push("Invalid booking room status");
    }
    if ('room_amenities' in booking && !Array.isArray(booking.room_amenities)) {
        _a.errors.push("Invalid booking room amenities");
    }
    if ('client_id' in booking && typeof booking.client_id !== 'string') {
        _a.errors.push("Invalid booking client id");
    }
    if ('client_name' in booking && typeof booking.client_name !== 'string') {
        _a.errors.push("Invalid booking client name");
    }
    if ('client_email' in booking && typeof booking.client_email !== 'string') {
        _a.errors.push("Invalid booking client email");
    }
    if ('client_phone' in booking && typeof booking.client_phone !== 'string') {
        _a.errors.push("Invalid booking client phone");
    }
    if ('order_date' in booking && !(new Date(booking.order_date) instanceof Date)) {
        _a.errors.push("Invalid booking order date");
    }
    if ('check_in_date' in booking && !(new Date(booking.check_in_date) instanceof Date)) {
        _a.errors.push("Invalid booking check in date");
    }
    if ('check_out_date' in booking && !(new Date(booking.check_out_date) instanceof Date)) {
        _a.errors.push("Invalid booking check out date");
    }
    if ('status' in booking && typeof booking.status !== 'string') {
        _a.errors.push("Invalid booking status");
    }
    if ('special_request' in booking && typeof booking.special_request !== 'string') {
        _a.errors.push("Invalid booking special request");
    }
    return _a.errors.length === 0 ? booking : false;
};
BookingValidator.validateBookingList = (data) => {
    if (!Array.isArray(data)) {
        _a.errors.push("Invalid booking list");
        return false;
    }
    const validatedBookings = [];
    for (const item of data) {
        const validBooking = _a.validateBooking(item);
        if (!validBooking)
            continue;
        validatedBookings.push(validBooking);
    }
    return validatedBookings.length === 0 ? false : validatedBookings;
};
BookingValidator.getErrors = () => {
    return _a.errors;
};
exports.default = BookingValidator;
