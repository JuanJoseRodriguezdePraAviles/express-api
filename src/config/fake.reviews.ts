import { faker } from '@faker-js/faker';
import { Review } from '../interfaces/Review';

export function createRandomReview(): Review {
    return {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        date: faker.date.recent(),
        customer_id: faker.string.uuid(),
        customer_name: faker.person.fullName(),
        phone: faker.phone.number(),
        subject: faker.lorem.words(3),
        comment: faker.lorem.sentence(),
        archived: faker.datatype.boolean()
    }
}

export const reviews = faker.helpers.multiple(createRandomReview, {
    count: 10
});