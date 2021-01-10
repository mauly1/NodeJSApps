const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/User')
const {userOneId,userOne,setupDatabase,userTwoId,userTwo,} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'newusercreation',
        email: 'newusercreated@gmail.com',
        password: 'newusercreated1@#!'
    }).expect(201)
    //Assert that database was changed properly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // assertion about the response
    expect(response.body.user.name).toBe('newusercreation')

    // assertion about the response object

    expect(response.body).toMatchObject({
        user: {
            name: 'newusercreation',
            email: 'newusercreated@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('newusercreated1@#!')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        name: userOne.name,
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should Not login for non existing user', async () => {
    await request(app).post('/users/login').send({
        name: userOne.name,
        email: userOne.email,
        password: 'wrongpassword'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unAuthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(response.body).toBeNull()
})

test('Should note delete account for unAuthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar images', async () => {
    await request(app).post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'test/fixtures/myprofile.jpeg')
        .expect(200)

    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user field',async ()=>{
    await request(app)
        .patch('/users/me')
        .set({
            name:'updatednamefornewuser'
        })
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
    const user = await User.findById(userOneId);
    expect(user.name).toEqual('updatednamefornewuser')
})

test('Should Not update non existing fields',async ()=>{
    await request(app)
        .patch('/users/me')
        .set({
            location:'locationIsNonExistingField'
        })
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(400)
})

test('Should Not update if user is not authorized',async ()=>{
    await request(app)
        .patch('/users/me')
        .set({
            name:'updatednamefornewuser'
        })
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(400)
})