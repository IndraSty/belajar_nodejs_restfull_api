import supertest from "supertest";
import {web} from "../src/application/web.js";
import {createManyTestContacts, createTestContact, createTestUser, getTestContact, removeAllTestContacts, removeTestUser} from "./test-util.js";
import { logger } from "../src/application/logging.js";

describe('POST /api/contacts', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    })
    
    it('should can create new contact', async () => {
        const result = await supertest(web)
                .post("/api/contacts")
                .set('Authorization', 'test')
                .send({
                    first_name: "test",
                    last_name: "test",
                    email: "test@pzn.com",
                    phone: "08097632"
                });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.first_name).toBe("test");
        expect(result.body.data.last_name).toBe("test");
        expect(result.body.data.email).toBe("test@pzn.com");
        expect(result.body.data.phone).toBe("08097632");
    });

    it('should rejected if request is not valid', async () => {
        const result = await supertest(web)
                .post("/api/contacts")
                .set('Authorization', 'test')
                .send({
                    firs_name: "",
                    last_name: "test",
                    email: "test",
                    phone: "08097632736363782828273678282736"
                });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

});

describe('GET /api/contact/:contactId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should can get contact', async () => {
        const testContact = await getTestContact();
        
        const result = await supertest(web)
                .get("/api/contacts/" + testContact.id)
                .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe(testContact.first_name);
        expect(result.body.data.last_name).toBe(testContact.last_name);
        expect(result.body.data.email).toBe(testContact.email);
        expect(result.body.data.phone).toBe(testContact.phone);
    });

    it('should return 404 if contactId is not found!!', async () => {
        const testContact = await getTestContact();
        
        const result = await supertest(web)
                .get("/api/contacts/" + (testContact.id + 1))
                .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });

});

describe('PUT /api/contacts/:contactId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should can update existing contact', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
                .put('/api/contacts/' + testContact.id)
                .set('Authorization', 'test')
                .send({
                    first_name: "Indra",
                    last_name: "Styawan",
                    email: "indrastyawan@gmail.com",
                    phone: "082765431"
                });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe("Indra");
        expect(result.body.data.last_name).toBe("Styawan");
        expect(result.body.data.email).toBe("indrastyawan@gmail.com");
        expect(result.body.data.phone).toBe("082765431");

    });


    it('should reject if request is invalid', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
                .put('/api/contacts/' + testContact.id)
                .set('Authorization', 'test')
                .send({
                    first_name: "",
                    last_name: "",
                    email: "indrastyawan",
                    phone: ""
                });

        expect(result.status).toBe(400);
    });

    it('should reject if contact is not found', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
                .put('/api/contacts/' + (testContact.id + 1))
                .set('Authorization', 'test')
                .send({
                    first_name: "Indra",
                    last_name: "Styawan",
                    email: "indrastyawan@gmail.com",
                    phone: "082765431"
                });

        expect(result.status).toBe(404);
    });
});

describe('DELETE /api/contacts/:contactId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should can delete contact', async () => {
        let testContact = await getTestContact();
        const result = await supertest(web)
            .delete('/api/contacts/' + testContact.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("Ok");

        testContact = await getTestContact();
        expect(testContact).toBeNull();
    });


    it('should reject if contact is not found', async () => {
        let testContact = await getTestContact();
        const result = await supertest(web)
            .delete('/api/contacts/' + (testContact.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

describe('GET /api/contacts', function () {
    beforeEach(async () => {
        await createTestUser();
        await createManyTestContacts();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should can search without parameter', async () => {
        const result = await supertest(web)
                .get("/api/contacts")
                .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(10);
        expect(result.body.pagging.total_page).toBe(2);
        expect(result.body.pagging.total_item).toBe(15);
    });

    it('should can search to page 2', async () => {
        const result = await supertest(web)
                .get("/api/contacts")
                .query({
                    page: 2
                })
                .set('Authorization', 'test');
            
        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(5);
        expect(result.body.pagging.page).toBe(2);
        expect(result.body.pagging.total_page).toBe(2);
        expect(result.body.pagging.total_item).toBe(15);
    });

    it('should can search using name', async () => {
        const result = await supertest(web)
                .get("/api/contacts")
                .query({
                    name: "test 1"
                })
                .set('Authorization', 'test');
            
        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.pagging.page).toBe(1);
        expect(result.body.pagging.total_page).toBe(1);
        expect(result.body.pagging.total_item).toBe(6);
    });

    it('should can search using email', async () => {
        const result = await supertest(web)
                .get("/api/contacts")
                .query({
                    email: "test1"
                })
                .set('Authorization', 'test');
            
        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.pagging.page).toBe(1);
        expect(result.body.pagging.total_page).toBe(1);
        expect(result.body.pagging.total_item).toBe(6);
    });

    it('should can search using phone', async () => {
        const result = await supertest(web)
                .get("/api/contacts")
                .query({
                    phone: "0812345601"
                })
                .set('Authorization', 'test');
            
        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.pagging.page).toBe(1);
        expect(result.body.pagging.total_page).toBe(1);
        expect(result.body.pagging.total_item).toBe(6);
    });

})