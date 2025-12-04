import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
    const demoUserId = "7a5a160b-1b12-497c-b440-df8dade839e8";

    //create sample products
    await prisma.product.createMany({
        data: Array.from({ length: 25 }).map((_, i) => ({
            usrId: demoUserId,
            name: `Product ${i + i}`,
            price: (Math.random() * 90 + 10).toFixed(2),
            quantity: Math.floor(Math.random() * 20),
            lowStockAt: 5,
            createdAt: new Date(Date.now() - 1000 * 60 * 24 * (i * 5)),
        })),
    });

    console.log("Seed data created succesfully!");
    console.log(`Created 25 products for user ID: ${demoUserId}`)
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async ()=> {
        await prisma.$disconnect();
    })