import { prismaClient } from "../src/application/database.js";
import bycrypt from "bcrypt";

//menghapus user setelah melakukan test
export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: 'test'
        }
    });
}

//membuat user untuk ditest
export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bycrypt.hash("rahasia", 10),
            name: "test",
            token: "test"
        }
    })
}

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "test"
        }
    });
}

export const removeAllTestContacts = async () => {
    await prismaClient.contact.deleteMany({
        where: {
            username: 'test'
        }
    });
}

export const createTestContact = async () => {
    await prismaClient.contact.create({
        data: {
            username: "test",
            first_name: "test",
            last_name: "test",
            email: "test@pzn.com",
            phone: "081234567"
        }
    });
}

export const createManyTestContacts = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.contact.create({
            data: {
                username: `test`,
                first_name: `test ${i}`,
                last_name: `test ${i}`,
                email: `test${i}@pzn.com`,
                phone: `081234560${i}`
            }
        });

    }
}

export const getTestContact = async () => {
    return prismaClient.contact.findFirst({
        where: {
            username: "test"
        }
    })
}

export const removeAllTestAddresses = async () => {
    await prismaClient.address.deleteMany({
        where: {
            contact: {
                username: "test"
            }
        }
    });
}

export const createTestAddress = async () => {
    const contact = await getTestContact();
    await prismaClient.address.create({
        data: {
            contact_id: contact.id,
            street: "Jalan test",
            city: "Kota test",
            province: "Provinsi test",
            country: "Indonesia",
            postal_code: "232323",
        }
    })
}

export const getTestAddress = async () => {
    return prismaClient.address.findFirst({
        where: {
            contact: {
                username: "test"
            }
        }
    })
}