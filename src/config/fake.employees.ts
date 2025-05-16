import { faker } from "@faker-js/faker";
import { Employee } from "../interfaces/Employee";
import bcrypt from 'bcryptjs';

export async function createRandomEmployee(): Promise<Employee> {
    const password = faker.internet.password();
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: hashedPassword,
        jobFunctions: faker.lorem.words(),
        registrationDate: faker.date.recent(),
        phone: faker.phone.number(),
        schelude: faker.lorem.words(),
        status: faker.datatype.boolean()
    }
    return employee;
}

export async function employees() {
    return Promise.all(
        Array.from({ length: 10 }, () => createRandomEmployee())
    );
}