const axios = require("axios");

describe("Testing POST /users/signup", () => {

    test("respond with HTTP status code 200", async () => {
        // Cambiar el correo cada vez q se ejecute el test
        const result = await axios.post('http://localhost:3000/api/users/signup', {
                email: "test1@email.com",
                password: "1234"
            },
        )
        
        expect(result.status).toBe(201)
        expect(result.data.message).toBe("Sign-in successfully.")
    }, 10000)

    test("respond with HTTP status code 200", async () => {
        const result = await axios.post('http://localhost:3000/api/users/login', {
                email: "test@email.com",
                password: "1234"
            },
        )

        expect(result.status).toBe(200)
        expect(result.data.message).toBe("Login successfully.")
    }, 10000)
})