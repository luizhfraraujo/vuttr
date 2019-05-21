
const request = require('supertest');
const server = require('../bin/server');

afterAll(() => {
    server.close();
})

describe('Início dos testes na rota Index', () => {

    test('Acessa a rota default', async () => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
    });
})

describe('Início dos testes na rota Tools', () => {

    test('Realiza post em /tools enviando title vazio', async () => {
        const response = await request(server).post('/tools').set('Content-Type', 'application/json').send({
            "title": "",
            "link": "http://teste.com",
            "description": "teste de app",
            "tags": ["teste", "app", "jest"]
        });
        expect(response.status).toBe(400);
    });

    test('Realiza post em /tools com "description" vazio', async () => {
        const response = await request(server).post('/tools').set('Content-Type', 'application/json').send({
            "title": "teste 1",
            "link": "http://teste.com",
            "description": "",
            "tags": ["teste", "app", "jest"]
        });
        expect(response.status).toBe(400);
    });

    test('Realiza post em /tools com "link" vazio', async () => {
        const response = await request(server).post('/tools').set('Content-Type', 'application/json').send({
            "title": "teste 1",
            "link": "",
            "description": "teste de app",
            "tags": ["teste", "app", "jest"]
        });
        expect(response.status).toBe(400);
    });

    test('Realiza post em /tools corretamente', async () => {
        const response = await request(server).post('/tools')
            .send({
                "title": "teste 1",
                "link": "http://teste.com",
                "description": "teste de app",
                "tags": ["teste", "app", "jest"]
            });
        expect(response.status).toBe(201);

        expect(Object.keys(response.body)).toEqual([
            'tags',
            '_id',
            'title',
            'link',
            'description',
            '__v'
        ])
        createdId = response.body._id;
    });


    test('Acessa a rota /tools', async () => {
        const response = await request(server).get('/tools');
        expect(response.status).toBe(200);
    });

    test('Acessa a rota /tools?tag=teste', async () => {
        const response = await request(server).get('/tools?tag=teste');
        expect(response.status).toBe(200);
    });


    test('Tenta remover uma ferramenta sem informar parâmetro (/tools/id)', async () => {
        const response = await request(server).delete(`/tools`);
        expect(response.status).toBe(404);
    });

    test('Tenta remover uma ferramenta informando parâmetro (/tools/id)', async () => {
        const response = await request(server).delete(`/tools/${createdId}`);
        expect(response.status).toBe(200);
    });

});


describe('Início dos testes na rota Users', () => {

    test('Realiza post em /users/register sem email', async () => {
        const response = await request(server).post('/users/register')
            .send({
                "password": "123456",
                "name": "Teste"
            });
        expect(response.status).toBe(400);
    });

    test('Realiza post em /users/register sem password', async () => {
        const response = await request(server).post('/users/register')
            .send({
                "email": "teste@teste.com",
                
                "name": "Teste"
            });
        expect(response.status).toBe(400);
    });

    test('Realiza post em /users/register corretamente', async () => {
        const response = await request(server).post('/users/register')
            .send({
                "email": "teste@teste.com",
                "password": "123456",
                "name": "Teste"
            });
        expect(response.status).toBe(201);

        expect(Object.keys(response.body)).toEqual([
            '_id',
            'email',
        ]);

        createdId = response.body._id;
    });

    test('Realiza post em /users/login corretamente', async () => {
        const response = await request(server).post('/users/login')
            .send({
                "email": "teste@teste.com",
                "password": "123456",
            });
        expect(response.status).toBe(201);

        expect(Object.keys(response.body)).toEqual([
            'token',
            'data',
        ])
    });

    test('Realiza delete em /users/id sem id', async () => {
        const response = await request(server).delete(`/users/`);
        expect(response.status).toBe(404);
    });

    test('Realiza delete em /users/id corretamente', async () => {
        const response = await request(server).delete(`/users/${createdId}`);
        expect(response.status).toBe(200);
    });
});