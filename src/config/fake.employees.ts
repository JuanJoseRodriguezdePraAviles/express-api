import { faker } from "@faker-js/faker";
import { Employee } from "../interfaces/Employee";

export function createRandomEmployee(): Employee {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        job_functions: faker.lorem.words(),
        registration_date: faker.date.recent(),
        phone: faker.phone.number(),
        schelude: faker.lorem.words(),
        status: faker.datatype.boolean()
    }
}

export const employees = faker.helpers.multiple(createRandomEmployee, {
    count: 10
});