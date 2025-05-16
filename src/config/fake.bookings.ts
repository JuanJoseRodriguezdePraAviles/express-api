import { faker } from '@faker-js/faker';
import { Booking } from '../interfaces/Booking';
import { BookingStatus } from '../interfaces/BookingStatus';
import { sequelize } from './database';

export async function getRoomIDs(): Promise<string[]> {
    const [results] = await sequelize.query('SELECT ID FROM room');
    return (results as any[]).map(row => row.ID);
}

export function createRandomBooking(roomId: string): Booking {
    const checkIn = faker.date.soon();
    const checkout = faker.date.soon({days: 7, refDate: checkIn});
    return {
        roomID: roomId,
        clientID: faker.string.uuid(),
        client_name: faker.person.fullName(),
        client_email: faker.internet.email(),
        client_phone: faker.phone.number(),
        order_date: faker.date.past(),
        check_in_date: checkIn,
        check_out_date: checkout,
        status: faker.helpers.arrayElement(Object.values(BookingStatus)),
        special_request: faker.lorem.sentence()
    }
}

export async function createBookingsForRooms(): Promise<Booking[]> {
    const roomIds = await getRoomIDs();
    return roomIds.map(roomId => createRandomBooking(roomId));
}