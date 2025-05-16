import { faker } from '@faker-js/faker';
import { Review } from '../interfaces/Review';
import { sequelize } from './database';
import { Booking } from '../interfaces/Booking';
import { QueryTypes } from 'sequelize';

export async function getBookingIDs(): Promise<string[]> {
    const results = await sequelize.query('SELECT ID FROM booking', {
        type: QueryTypes.SELECT
    }) as unknown as Array<{ ID: string }>;
    return results.map(row => row.ID);
}

export function createRandomReview(bookingId: string): Review {
    return {
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

export async function createReviewsForBookings(): Promise<Review[]> {
    const bookingsIds = await getBookingIDs();
    return bookingsIds.map(reviewId => createRandomReview(reviewId));
}