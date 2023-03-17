import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import CreateAccountPopup, { checkPasswords } from '../components/createAccountPopup';
import Login from '../components/login';


var request = require('supertest');
request = request('http://localhost:3000'); 
let session = null;
  
it("Should render Login component", () => {
    render(<Login />, { wrapper: MemoryRouter });
})

it("should render Sign Up component", () => {
    render(<CreateAccountPopup open={true} handleClose={ () => {}} />, { wrapper: MemoryRouter });
})


it("Different passwords should not be valid", () => {
		var p1 = "Password"
		var p2 = "Apples"
    expect(checkPasswords(p1, p2)).toEqual(false);
})

it("Passwords should be case-sensitive", () => {
		var p1 = "Password"
		var p2 = "password"
    expect(checkPasswords(p1, p2)).toEqual(false);
})

it("Identical passwords should be valid", () => {
		var p1 = "Password"
		var p2 = "Password"
    expect(checkPasswords(p1, p2)).toEqual(true);
})