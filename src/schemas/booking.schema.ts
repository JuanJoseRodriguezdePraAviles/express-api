import { Schema, model } from 'mongoose';
import { BookingStatus } from '../interfaces/BookingStatus';
import { Booking } from '../interfaces/Booking';

const BookingSchema = new Schema<Booking>({
    room_id: {type: String, required: true},
    client_id: {type: String, required: true},
    client_name: {type: String},
    client_email: {type: String},
    client_phone: {type: String},
    order_date: {type: Date},
    check_in_date: {type: Date},
    check_out_date: {type: Date},
    status: {type: String, enum: Object.values(BookingStatus)},
    special_request: {type: String}
})

export const BookingModel = model<Booking>('Booking', BookingSchema);