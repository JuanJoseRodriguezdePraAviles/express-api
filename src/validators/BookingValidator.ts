import { Booking } from "../interfaces/Booking";

export const validateBooking = (booking: any): Booking | false => {
    if (!booking || typeof booking !== 'object') return false;

    if ('booking_id' in booking && typeof booking.booking_id !== 'string') return false;
    if ('room_id' in booking && typeof booking.room_id !== 'string') return false;
    if ('room_name' in booking && typeof booking.room_name !== 'string') return false;
    if ('room_description' in booking && typeof booking.room_description !== 'string') return false;
    if ('room_type' in booking && typeof booking.room_type !== 'string') return false;

    if ('room_price' in booking && typeof booking.room_price !== 'number') return false;
    if ('room_status' in booking && typeof booking.room_status !== 'string') return false;
    if ('room_amenities' in booking && !Array.isArray(booking.room_amenities)) return false;

    if ('client_id' in booking && typeof booking.client_id !== 'string') return false;
    if ('client_name' in booking && typeof booking.client_name !== 'string') return false;
    if ('client_email' in booking && typeof booking.client_email !== 'string') return false;
    if ('client_phone' in booking && typeof booking.client_phone !== 'string') return false;

    if ('order_date' in booking && !(booking.order_date instanceof Date)) return false;
    if ('check_in_date' in booking && !(booking.check_in_date instanceof Date)) return false;
    if ('check_out_date' in booking && !(booking.check_out_date instanceof Date)) return false;

    if ('status' in booking && typeof booking.status !== 'string') return false;
    if ('special_request' in booking && typeof booking.special_request !== 'string') return false;


    return booking as Booking;
}

export const validateBookingList = (data: any): Booking[] | false => {
    if (!Array.isArray(data)) return false;

    const validatedBookings: Booking[] = [];

    for (const item of data) {
        const validBooking = validateBooking(item);
        if (!validBooking) return false;
        validatedBookings.push(validBooking);
    }
    return validatedBookings;
}