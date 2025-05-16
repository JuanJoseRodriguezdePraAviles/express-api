import { sequelize } from '../config/database';
import { Booking } from '../interfaces/Booking';

export const getAllBookings = async (): Promise<Booking[]> => {
  const [bookings] = await sequelize.query('SELECT * FROM booking');
  return bookings as Booking[];
}

export const getBookingById = async (id: string): Promise<Booking | null> => {
    const [results] = await sequelize.query('SELECT * FROM booking WHERE ID = :id', {
        replacements: { id }
    });
    const bookings = results as Booking[];
    return bookings[0] || null;
}

export const createBooking = async (newBooking: Partial<Booking>): Promise<Booking> => {
    if (!newBooking.roomID || !newBooking.clientID || !newBooking.check_in_date || !newBooking.check_out_date) {
        throw new Error("Missing required booking fields");
    }
    const [results] = await sequelize.query(
        `INSERT INTO booking (
            ID, roomID, clientID, client_name, client_email, client_phone,
            order_date, check_in_date, check_out_date, status, special_request
        ) VALUES (
            :ID, :roomID, :clientID, :client_name, :client_email, :client_phone,
            :order_date, :check_in_date, :check_out_date, :status, :special_request
        )`,
         {
            replacements: {
                ID: newBooking.ID,
                roomID: newBooking.roomID,
                clientID: newBooking.clientID,
                client_name: newBooking.client_name || null,
                client_email: newBooking.client_email || null,
                client_phone: newBooking.client_phone || null,
                order_date: newBooking.order_date || new Date(),
                check_in_date: newBooking.check_in_date,
                check_out_date: newBooking.check_out_date,
                status: newBooking.status || null,
                special_request: newBooking.special_request || null
            }
         }
    );
    return (results as Booking[])[0];
}

export const updateBooking = async (id: string, updateBooking: Partial<Booking>): Promise<Booking | null> => {
    const fields = Object.keys(updateBooking);
    if(fields.length === 0) return null;

    const setClause = fields.map((field, i) => `${field} = :value${i}`).join(', ');
    const replacements: Record<string, any> = { id };
    fields.forEach((field, i) => {
        replacements[`value${i}`] = (updateBooking as any)[field];
    });

    const [results] = await sequelize.query(
        `UPDATE booking SET ${setClause} WHERE ID = :id`,
        { replacements }
    );
    return (results as Booking[])[0] || null;
}

export const deleteBooking = async (id: string): Promise<boolean> => {
    const [results] = await sequelize.query('DELETE FROM booking WHERE ID = :id', {
        replacements: { id }
    });
    return true;
}