import { Schema, model } from 'mongoose';
import { BookingStatus } from '../interfaces/BookingStatus';
import { Booking } from '../interfaces/Booking';

const BookingSchema = new Schema<Booking>({
    id: {type: String, required: true},
    clientId: {type: String, required: true},
    clientName: {type: String},
    clientEmail: {type: String},
    clientPhone: {type: String},
    orderDate: {type: Date},
    checkInDate: {type: Date},
    checkOutDate: {type: Date},
    status: {type: String, enum: Object.values(BookingStatus)},
    specialRequest: {type: String}
})

export const BookingModel = model<Booking>('Booking', BookingSchema);