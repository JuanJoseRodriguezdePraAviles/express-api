import { BookingModel } from '../schemas/booking.schema';
import { Booking } from '../interfaces/Booking';
import BookingValidator from '../validators/booking.validator';

export const getAllBookings = async (): Promise<Booking[]> => {
    const bookings = await BookingModel.find();
    return bookings;
}

export const getBookingById = async (id: string): Promise<Booking | null> => {
    const booking = await BookingModel.findOne({_id: id});
    return booking;
}

export const createBooking = async (newBooking: Partial<Booking>): Promise<Booking> => {
    try {
        const validatedBooking = BookingValidator.validateBooking(newBooking);

        if(!validatedBooking) {
            throw new Error(`Booking validation failed: ${BookingValidator.errors.join(', ')}`);
        }
        const booking = new BookingModel({
            ...newBooking
        });
        await booking.save();
        return booking;
    } catch(error) {
        throw error;
    }
}

export const updateBooking = async (id: string, updateBooking: Partial<Booking>): Promise<Booking | null> => {
    const booking = await BookingModel.findOneAndUpdate(
        {_id: id},
        updateBooking,
        {new: true}
    );
    return booking;
}

export const deleteBooking = async (id: string): Promise<boolean> => {
    const deleted = await BookingModel.findOneAndDelete({_id: id});
    if(!deleted) {
        return false;
    }
    return true;
}