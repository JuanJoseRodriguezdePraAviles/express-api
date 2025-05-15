import { faker } from '@faker-js/faker';
import { Booking } from '../interfaces/Booking';
import { BookingStatus } from '../interfaces/BookingStatus';
import { rooms } from './fake.rooms';

export function createRandomBooking(roomId: string): Booking {
    const checkIn = faker.date.soon();
    const checkout = faker.date.soon({days: 7, refDate: checkIn});
    return {
        ID: faker.string.uuid(),
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

export const bookings = rooms.map(room => createRandomBooking(room.ID!));