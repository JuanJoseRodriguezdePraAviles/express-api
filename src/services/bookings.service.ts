import { sequelize } from '../config/database';
import { Booking } from '../interfaces/Booking';

export const getAllBookings = async (): Promise<Booking[]> => {
  const [bookings] = await sequelize.query('SELECT * FROM booking');
  return bookings as Booking[];
}

export const getBookingById = async (id: string): Promise<Booking | null> => {
    const [results] = await sequelize.query('SELECT * FROM booking WHERE id = :id', {
        replacements: { id }
    });
    const bookings = results as Booking[];
    return bookings[0] || null;
}

export const createBooking = async (newBooking: Partial<Booking>): Promise<Booking> => {
    if (!newBooking.roomId || !newBooking.clientId || !newBooking.checkInDate || !newBooking.checkOutDate) {
        throw new Error("Missing required booking fields");
    }
    const [results] = await sequelize.query(
        `INSERT INTO booking (
            id, roomId, clientId, clientName, clientEmail, clientPhone,
            orderDate, checkInDate, checkOutDate, status, specialRequest
        ) VALUES (
            :id, :roomId, :clientId, :clientName, :clientEmail, :clientPhone,
            :orderDate, :checkInDate, :checkOutDate, :status, :specialRequest
        )`,
         {
            replacements: {
                id: newBooking.id,
                roomId: newBooking.roomId,
                clientId: newBooking.clientId,
                clientName: newBooking.clientName || null,
                clientEmail: newBooking.clientEmail || null,
                clientPhone: newBooking.clientPhone || null,
                orderDate: newBooking.orderDate || new Date(),
                checkInDate: newBooking.checkInDate,
                checkOutDate: newBooking.checkOutDate,
                status: newBooking.status || null,
                specialRequest: newBooking.specialRequest || null
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
        `UPDATE booking SET ${setClause} WHERE id = :id`,
        { replacements }
    );
    return (results as Booking[])[0] || null;
}

export const deleteBooking = async (id: string): Promise<boolean> => {
    const [results] = await sequelize.query('DELETE FROM booking WHERE id = :id', {
        replacements: { id }
    });
    return true;
}