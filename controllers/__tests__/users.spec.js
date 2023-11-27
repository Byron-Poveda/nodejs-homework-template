const axios = require("axios");
const controller = require('../users')
const service = require('../../services/users')

describe("Testing /users/signup and /users/login", () => {

    test("/users/signup respond with result 201 ok", async () => {
        const req = {
            body: {
                email: 'test@email.com',
                password: '1234'
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        const mockedSignUpResult = {
            success: true,
            result: {
                email: 'test@email.com',
                subscription: 'started'
            },
            message: 'Sign-in successfully.',
        }

        jest.spyOn(service, 'signUp').mockResolvedValue(mockedSignUpResult)
        
        await controller.signUp(req, res)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({
            result: mockedSignUpResult.result,
            message: 'Sign-in successfully.',
        })
        
    }, 10000)

    test("/users/login respond with result 200 ok", async () => {
        const req = {
            body: {
                email: 'test@email.com',
                password: '1234'
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        const mockedLoginResult = {
            success: true,
            result: {
                token: 'token123',
            },
            message: 'Login successfully.',
        }

        jest.spyOn(service, 'login').mockResolvedValue(mockedLoginResult)
        
        await controller.login(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            result: mockedLoginResult.result,
            message: 'Login successfully.',
        })
        
    }, 10000)

})