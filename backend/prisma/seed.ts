import { PrismaClient, Severity, Status } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const SERVICES = ['Auth Service', 'Payment Gateway', 'Search Engine', 'Notification Service', 'User Profile', 'Inventory Service', 'Order Service', 'Analytics Service'];

async function main() {
    console.log('Start seeding ...');

    // Clear existing data
    await prisma.incident.deleteMany();

    const incidents = [];

    for (let i = 0; i < 200; i++) {
        const createdAt = faker.date.recent({ days: 60 });
        // updateAt should be after createdAt
        const updatedAt = faker.date.between({ from: createdAt, to: new Date() });

        incidents.push({
            title: faker.hacker.phrase(),
            service: faker.helpers.arrayElement(SERVICES),
            severity: faker.helpers.enumValue(Severity),
            status: faker.helpers.enumValue(Status),
            owner: faker.datatype.boolean() ? faker.person.fullName() : null,
            summary: faker.lorem.paragraph(),
            createdAt: createdAt,
            updatedAt: updatedAt,
        });
    }

    await prisma.incident.createMany({
        data: incidents,
    });

    console.log(`Seeding finished. Created ${incidents.length} incidents.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
