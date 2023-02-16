const {validateUser, getUser, createUser} = require("../utils/authUtils")
const {UserMock} = require("./mocks/userMock")
const bcrypt = require("bcryptjs")
const expect  = require('chai').expect;

describe("Backend authentication tests", () => {
it("Testing creating a user", async () => {
	const User = new UserMock()
	const user = await createUser("test@test.com", "username", "password", "firstName", "lastName", User);
	
	expect(user.email).to.equal("test@test.com");
	expect(user.userName).to.equal("username");
	expect(user.firstName).to.equal("firstName");
	expect(user.lastName).to.equal("lastName");

	expect(user.password).to.not.equal("password");

	const comparison = await bcrypt.compare("password", user.password)

	expect(comparison).to.equal(true);
});

it("Testing validating an existing user", async () => {
	const User = new UserMock()
	const user = await createUser("test@test.com", "username", "password", "firstName", "lastName", User);
	
	const result = await validateUser("test@test.com", "password", User)

	expect(result).to.equal(true);
});

it("Testing validating a non-existant user", async () => {
	const User = new UserMock()
	
	const result = await validateUser("test@test.com", "password", User)
	expect(result).to.equal(null);
});

it("Testing getting an existing user", async () => {
	const User = new UserMock()
	await createUser("test@test.com", "username", "password", "firstName", "lastName", User);
	
	const user = await getUser("test@test.com", User)

	expect(user.email).to.equal("test@test.com");
	expect(user.userName).to.equal("username");
	expect(user.firstName).to.equal("firstName");
	expect(user.lastName).to.equal("lastName");

	expect(user.password).to.not.equal("password");
	const comparison = await bcrypt.compare("password", user.password)
	expect(comparison).to.equal(true);

});

it("Testing getting an existing user", async () => {
	const User = new UserMock()
	await createUser("test@test.com", "username", "password", "firstName", "lastName", User);
	
	const user = await getUser("test2@test.com", User)
	
	expect(user).to.equal(null);

});

})
