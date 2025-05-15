import { faker } from '@faker-js/faker';
import { Review } from '../interfaces/Review';
import { bookings } from './fake.bookings';

export function createRandomReview(bookingId: string): Review {
    return {
        ID: faker.string.uuid(),
        email: faker.internet.email(),
        date: faker.date.recent(),
        clientID: bookingId,
        customer_name: faker.person.fullName(),
        phone: faker.phone.number(),
        subject: faker.lorem.words(3),
        comment: faker.lorem.sentence(),
        archived: faker.datatype.boolean()
    }
}

export const reviews = bookings.map(booking => createRandomReview(booking.ID!));