function login()
{
	var username =  document.getElementById("login-input").value 
	var password =  document.getElementById("pass-input").value 
	console.log("Logging in user: ");
	console.log(username);
	console.log("Password:");
	console.log(password);
	
}

function createAccount()
{
	document.write('<iframe height="450" allowTransparency="true" frameborder="0" scrolling="yes" style="width:50%;" src="/create-account"></iframe>');
}