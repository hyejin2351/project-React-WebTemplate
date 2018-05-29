import ValidationError from '../../helpers/validation/ValidationError';

export function isValidUser({ email }) {
  if (email.length < 3 || email.length > 32) throw new ValidationError({ code: 'id', message: 'User ID must be between 3 and 32 characters.' });
  return true;
}

export function isValidNewUser({ email, password }) {
  if (email.length < 3 || email.length > 32) throw new ValidationError({ code: 'id', message: 'User ID must be between 3 and 32 characters.' });
  if (password.length < 8 || password.length > 100) throw new ValidationError({ code: 'pw', message: 'User password must be longer than 8 characters.' });
  return true;
}
