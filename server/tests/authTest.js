const {validateUser, getUser, createUser} = require("../utils/authUtils")
const {UserMock} = require("./mocks/userMock")
const bcrypt = require("bcryptjs")
const expect  = require('chai').expect;
const dotenv = require('dotenv').config()


var request = require('supertest');
request = request(process.env.WEB_SERVER_URI); 
let session = null;

var email = Math.random().toString(36).slice(2)+"@test.com";

describe("Backend authentication unit tests", () => {
	it("Testing creating a user", async () => {
		const User = new UserMock()
		const user = await createUser(email, "username", "password", "firstName", "lastName", User);
		
		expect(user.email).to.equal(email);
		expect(user.userName).to.equal("username");
		expect(user.firstName).to.equal("firstName");
		expect(user.lastName).to.equal("lastName");

		expect(user.password).to.not.equal("password");

		const comparison = await bcrypt.compare("password", user.password)

		expect(comparison).to.equal(true);
	});

	it("Testing validating an existing user", async () => {
		const User = new UserMock()
		const user = await createUser(email, "username", "password", "firstName", "lastName", User);
		
		const result = await validateUser(email, "password", User)

		expect(result).to.equal(true);
	});

	it("Testing validating a non-existant user", async () => {
		const User = new UserMock()
		
		const result = await validateUser(email, "password", User)
		expect(result).to.equal(null);
	});

	it("Testing getting an existing user", async () => {
		const User = new UserMock()
		await createUser(email, "username", "password", "firstName", "lastName", User);
		
		const user = await getUser(email, User)

		expect(user.email).to.equal(email);
		expect(user.userName).to.equal("username");
		expect(user.firstName).to.equal("firstName");
		expect(user.lastName).to.equal("lastName");

		expect(user.password).to.not.equal("password");
		const comparison = await bcrypt.compare("password", user.password)
		expect(comparison).to.equal(true);

	});

	it("Testing getting an existing user", async () => {
		const User = new UserMock()
		await createUser(email, "username", "password", "firstName", "lastName", User);
		
		const user = await getUser("test2@test.com", User)
		
		expect(user).to.equal(null);

	});

})

describe("Backend authentication integration tests", () => { 
it("should fail to authorize", async () => {
    await request
      .get("/test")
      .then((response) => {
        expect(response.status).to.equal(401);
      })
      .catch((err) => {
        expect(err.response.status).to.equal(401);;
      });
})
it("should succeed to create user", async () => {
	
	var data = 
	{
		email:email,
		password:"password",
		userName:"username",
		firstName:"FirstName",
		lastName:"LastName"
	}
	
    await request
      .post("/auth/register", data).send(data)
      .then((response) => {
        expect(response.status).to.equal(200);
		
      });
      
	
})

it("should fail to create user", async () => {
	
	var data = 
	{
		password:"password",
		userName:"username",
		firstName:"FirstName",
		lastName:"LastName"
	}
	
    await request
      .post("/auth/register").send(data)
      .then((response) => {
        expect(response.status).to.equal(400);
      })
      
})

it("should succeed to login", async () => {
	
	var data = 
	{
		email:email,
		password:"password",
	}
	
    await request
      .post("/auth/login").send(data)
      .then((response) => {
        expect(response.status).to.equal(200);
      })
})

it("should fail to login", async () => {
	
	var data = 
	{
		email:email,
		password:"passwasdasdasdasord",

	}
	
    await request
      .post("/auth/login").send(data)
      .then((response) => {
        expect(response.status).to.equal(400);
      })
      
})
})

module.exports = { email }
