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
        roomId: roomId,
        clientId: faker.string.uuid(),
        clientName: faker.person.fullName(),
        clientEmail: faker.internet.email(),
        clientPhone: faker.phone.number(),
        orderDate: faker.date.past(),
        checkInDate: checkIn,
        checkOutDate: checkout,
        status: faker.helpers.arrayElement(Object.values(BookingStatus)),
        specialRequest: faker.lorem.sentence()
    }
}

export async function createBookingsForRooms(): Promise<Booking[]> {
    const roomIds = await getRoomIDs();
    return roomIds.map(roomId => createRandomBooking(roomId));
}