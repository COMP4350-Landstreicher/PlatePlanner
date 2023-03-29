import {render} from '@testing-library/react';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import CreateAccountPopup, {checkPasswords} from '../components/createAccountPopup';
import Login from '../components/login';


it('Should render Login component', () => {
  render(<Login />, {wrapper: MemoryRouter});
});

it('should render Sign Up component', () => {
  render(<CreateAccountPopup open={true} handleClose={() => { }} />, {wrapper: MemoryRouter});
});


it('Different passwords should not be valid', () => {
  const p1 = 'Password';
  const p2 = 'Apples';
  expect(checkPasswords(p1, p2)).toEqual(false);
});

it('Passwords should be case-sensitive', () => {
  const p1 = 'Password';
  const p2 = 'password';
  expect(checkPasswords(p1, p2)).toEqual(false);
});

it('Identical passwords should be valid', () => {
  const p1 = 'Password';
  const p2 = 'Password';
  expect(checkPasswords(p1, p2)).toEqual(true);
});
