import { Booking } from '../interfaces/Booking';
import { BookingModel } from '../schemas/booking.schema';

export const getAllBookings = async (): Promise<Booking[]> => {
  const bookings = await BookingModel.findAll();
  return bookings;
};

export const getBookingById = async (id: string): Promise<Booking | null> => {
    const booking = await BookingModel.findOne({
        where: { ID: id }
    });
    return booking ? booking : null;
}

export const createBooking = async (newBooking: Partial<Booking>): Promise<Booking> => {
    if (!newBooking.roomID || !newBooking.clientID || !newBooking.check_in_date || !newBooking.check_out_date) {
        throw new Error("Missing required booking fields");
    }
    try {
        const booking = await BookingModel.create({
            roomID: newBooking.roomID,
            clientID: newBooking.clientID,
            client_name: newBooking.client_name || undefined,
            client_email: newBooking.client_email || undefined,
            client_phone: newBooking.client_phone || undefined,
            order_date: newBooking.order_date || new Date(),
            check_in_date: newBooking.check_in_date,
            check_out_date: newBooking.check_out_date,
            status: newBooking.status || undefined,
            special_request: newBooking.special_request || undefined
        });
        return booking;
    } catch (error) {
        throw new Error('Error creating booking');
    }
}

export const updateBooking = async (id: string, updateBooking: Partial<Booking>): Promise<Booking | null> => {
    try {
        const [updatedRowsCount] = await BookingModel.update(updateBooking,
            {
                where: { ID: id }
            }
        );
        if(updatedRowsCount > 0) {
            const updatedBooking = await BookingModel.findOne({ where: { ID: id }});
            return updatedBooking;
        }
        return null;
    } catch (error) {
        throw new Error('Error updating booking');
    }
}

export const deleteBooking = async (id: string): Promise<boolean> => {
    try {
        const deletedRowsCount = await BookingModel.destroy({
            where: { ID: id}
        });
        return deletedRowsCount > 0;
    } catch(error) {
        console.log("Error deleting booking:", error);
        throw new Error('Error deleting booking');
    }
}