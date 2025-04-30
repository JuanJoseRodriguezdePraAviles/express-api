import { BookingModel } from '../schemas/booking.schema';
import { Booking } from '../interfaces/Booking';

export const getAllBookings = async (): Promise<Booking[]> => {
    const bookings = await BookingModel.find();
    return bookings;
}

export const getBookingById = async (id: string): Promise<Booking | null> => {
    const booking = await BookingModel.findOne({booking_id: id});
    return booking;
}

export const createBooking = async (newBooking: Partial<Booking>): Promise<Booking> => {
    const booking = new BookingModel({
        ...newBooking,
        booking_id: Date.now().toString()
    });
    await booking.save();
    return booking;
}

export const updateBooking = async (id: string, updateBooking: Partial<Booking>): Promise<Booking | null> => {
    const booking = await BookingModel.findOneAndUpdate(
        {booking_id: id},
        updateBooking,
        {new: true}
    );
    return booking;
}

export const deleteBooking = async (id: string): Promise<boolean> => {
    const deleted = await BookingModel.findOneAndDelete({booking_id: id});
    if(!deleted) {
        return false;
    }
    return true;
}