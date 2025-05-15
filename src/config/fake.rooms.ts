import { faker } from "@faker-js/faker";
import { Room } from "../interfaces/Room";
import { RoomType } from "../interfaces/RoomType";
import { RoomStatus } from "../interfaces/RoomStatus";
import { Amenities } from "../interfaces/Amenities";

export function createRandomRoom(): Room {
    const allAmenities = Object.values(Amenities);
    const randomAmenities = faker.helpers.arrayElements(allAmenities, {
        min: 1,
        max: allAmenities.length
    });
    return {
        ID: faker.string.uuid(),
        room_name: faker.lorem.words(2),
        room_type: faker.helpers.arrayElement(Object.values(RoomType)),
        room_floor: faker.number.int({min: 1, max: 10}).toString(),
        status: faker.helpers.arrayElement(Object.values(RoomStatus)),
        description: faker.lorem.sentence(),
        photos: JSON.stringify([
            faker.image.url(),
            faker.image.url(),
            faker.image.url()
        ]),
        offer: faker.datatype.boolean(),
        price: faker.number.float({ min: 50, max: 500}),
        discount: faker.number.float({min: 0, max: 50}),
        cancellation_policy: faker.lorem.sentence(),
        room_amenities: randomAmenities[0]
    }
}

export const rooms = faker.helpers.multiple(createRandomRoom, {
    count: 10
});