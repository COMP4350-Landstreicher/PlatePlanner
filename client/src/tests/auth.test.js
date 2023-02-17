

var request = require('supertest');
request = request('http://localhost:3000'); 
let session = null;
  
it("should fail to authorize", async () => {
    await request
      .get("/test")
      .then((response) => {
        expect(response.status).toEqual(401);
      })
      .catch((err) => {
        expect(err.response.status).toEqual(401);;
      });
})
it("should succeed to create user", async () => {
	
	var data = 
	{
		email:"test@test.com",
		password:"password",
		userName:"username",
		firstName:"FirstName",
		lastName:"LastName"
	}
	
    await request
      .post("/auth/register", data).send(data)
      .then((response) => {
        expect(response.status).toEqual(200);
		
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
        expect(response.status).toEqual(400);
      })
      
})

it("should succeed to login", async () => {
	
	var data = 
	{
		email:"test@test.com",
		password:"password",

	}
	
    await request
      .post("/auth/login").send(data)
      .then((response) => {
        expect(response.status).toEqual(200);
      })
      
})

it("should fail to login", async () => {
	
	var data = 
	{
		email:"test@test.com",
		password:"passwasdasdasdasord",

	}
	
    await request
      .post("/auth/login").send(data)
      .then((response) => {
        expect(response.status).toEqual(400);
      })
      
})