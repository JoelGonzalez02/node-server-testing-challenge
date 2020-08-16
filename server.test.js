const request = require('supertest');
const server = require('./server');
const Lakers = require('./lakers/lakersDbModel');
const db = require('./data/db-config');


describe('server.js', () => {
    it('checks that we are using the testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
});

describe('get /', () => {
    let res = {};

    beforeAll(async () => {
        res = await request(server).get('/')
    });

    it('checks that the status is 200', () => {
        expect(res.status).toBe(200)
    });

    it('uses a type of JSON', () => {
        expect(res.type).toBe('application/json');
    });

    it('returns the message api: up', () => {
        expect(res.body).toEqual({api: 'up'});
    });

    describe('get /api/players', () => {
        let res = {};

        beforeAll(async () => {
            res = await request(server).get('/api/players');
        });
        
        it('checks that the status is 200', () => {
            expect(res.status).toBe(200)
        });

        it('uses a type of JSON', () => {
            expect(res.type).toBe('application/json');
        });

        it('returns the correct number of players in the players table', async () => {
            const players = await Lakers.find();
            expect(players.length).toEqual(1)
        });

    })

    describe('post /api/players', () => {
        let res = {};

        beforeAll(async () => {
            res = await request(server).post('/api/players').send({name: 'Anthony Davis', number: 3, position: 'Power Forward/Center', role: 'Superstar Player'});
        });

        it('checks that the status is 201', () => {
            expect(res.status).toBe(201)
        });

        it('uses a type of JSON', () => {
            expect(res.type).toBe('application/json')
        });

        it('checks that the correct player has been posted', () => {
            expect(res.body).toEqual({id: 2, name: 'Anthony Davis', number: 3, position: 'Power Forward/Center', role: 'Superstar Player'})
        })

    })


    describe('delete /api/players', () => {

        let res = {};

        beforeEach(async () => {
            await db('players').truncate();
            res = await request(server).post('/api/players').send({name: 'Lebron James', number: 23, position: 'Point Guard/Small Forward', role: 'Superstar player'})
        });

        it('deletes the player with the specified id', async () => {
           const res = await request(server).delete('/api/players/1');

            expect(res.status).toEqual(200);
        });

        it('returns 404 if the player does not exist', async () => {
            const res = await request(server).delete('/api/players/20');

            expect(res.status).toBe(404);
        })
    })



})