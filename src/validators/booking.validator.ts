import { Booking } from "../interfaces/Booking";

export default class BookingValidator {
    static errors: string[] = [];

    public static validateBooking = (booking: any): Booking | false => {
        this.errors = [];
        
        if (!booking || typeof booking !== 'object') {
            this.errors.push("Invalid object booking");
        }
        if ('ID' in booking && typeof booking.id !== 'string') {
            this.errors.push("Invalid booking ID");
        }
        if (!('roomID' in booking) || typeof booking.roomId !== 'string') {
            this.errors.push("Missing or Invalid room ID");
        }
        if (!('clientID' in booking) || typeof booking.clientId !== 'string') {
            this.errors.push("Missing or Invalid booking client id");
        }
        if ('client_name' in booking && typeof booking.clientName !== 'string') {
            this.errors.push("Invalid booking client name");
        }
        if ('client_email' in booking && typeof booking.clientEmail !== 'string') {
            this.errors.push("Invalid booking client email");
        }
        if ('client_phone' in booking && typeof booking.clientPhone !== 'string') {
            this.errors.push("Invalid booking client phone");
        }
        if ('order_date' in booking && !(new Date(booking.orderDate) instanceof Date)) {
            this.errors.push("Invalid booking order date");
        }
        if ('check_in_date' in booking && !(new Date(booking.checkInDate) instanceof Date)) {
            this.errors.push("Invalid booking check in date");
        }
        if ('check_out_date' in booking && !(new Date(booking.checkOutDate) instanceof Date)) {
            this.errors.push("Invalid booking check out date");
        }
        if ('status' in booking && typeof booking.status !== 'string') {
            this.errors.push("Invalid booking status");
        }
        if ('special_request' in booking && typeof booking.specialRequest !== 'string') {
            this.errors.push("Invalid booking special request");
        }

        return this.errors.length === 0 ? booking as Booking : false;
    }

    public static validateBookingList = (data: any): Booking[] | false => {
        if (!Array.isArray(data)) {
            this.errors.push("Invalid booking list");
            return false;
        }
        
        const validatedBookings: Booking[] = [];

        for (const item of data) {
            const validBooking = this.validateBooking(item);
            if (!validBooking) continue;
            validatedBookings.push(validBooking);
        }
        return validatedBookings.length === 0? false : validatedBookings;
    }

    public static getErrors = (): string[] => {
        return this.errors;
    }
}