import { faker } from '@faker-js/faker';
import { Booking } from '../interfaces/Booking';
import { BookingStatus } from '../interfaces/BookingStatus';

export function createRandomBooking(roomId: string): Booking {
    const checkIn = faker.date.soon();
    const checkout = faker.date.soon({days: 7, refDate: checkIn});
    return {
        room_id: roomId,
        client_id: faker.string.uuid(),
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