import { registerSchema } from '../../schemas/authSchemas';

describe('Register Schema Validation (Yup)', () => {
  const validUser = {
    name: 'João Silva',
    email: 'joao@example.com',
    cpf: '52998224725',
    password: 'Password123@',
    confirmPassword: 'Password123@',
  };

  test('passes if all fields are valid with valid mathematical CPF and strong password', () => {
    const isValid = registerSchema.isValidSync(validUser);
    expect(isValid).toBe(true);
  });

  test('passes with formatted CPF (XXX.XXX.XXX-XX)', () => {
    const isValid = registerSchema.isValidSync({
      ...validUser,
      cpf: '529.982.247-25',
    });
    expect(isValid).toBe(true);
  });

  test('fails if CPF has repeated digits', () => {
    const isValid = registerSchema.isValidSync({
      ...validUser,
      cpf: '111.111.111-11',
    });
    expect(isValid).toBe(false);
  });

  test('fails if CPF has invalid check digits', () => {
    const isValid = registerSchema.isValidSync({
      ...validUser,
      cpf: '123.456.789-00',
    });
    expect(isValid).toBe(false);
  });

  test('fails if password has fewer than 10 characters', () => {
    const isValid = registerSchema.isValidSync({
      ...validUser,
      password: 'Pass123@',
      confirmPassword: 'Pass123@',
    });
    expect(isValid).toBe(false);
  });

  test('fails if password lacks uppercase letter', () => {
    const isValid = registerSchema.isValidSync({
      ...validUser,
      password: 'password123@',
      confirmPassword: 'password123@',
    });
    expect(isValid).toBe(false);
  });

  test('fails if password lacks lowercase letter', () => {
    const isValid = registerSchema.isValidSync({
      ...validUser,
      password: 'PASSWORD123@',
      confirmPassword: 'PASSWORD123@',
    });
    expect(isValid).toBe(false);
  });

  test('fails if password lacks numbers', () => {
    const isValid = registerSchema.isValidSync({
      ...validUser,
      password: 'PasswordSpecial@',
      confirmPassword: 'PasswordSpecial@',
    });
    expect(isValid).toBe(false);
  });

  test('fails if password lacks special character', () => {
    const isValid = registerSchema.isValidSync({
      ...validUser,
      password: 'Password12345',
      confirmPassword: 'Password12345',
    });
    expect(isValid).toBe(false);
  });

  test('fails if password and confirmPassword do not match', () => {
    const isValid = registerSchema.isValidSync({
      ...validUser,
      password: 'Password123@',
      confirmPassword: 'DifferentPassword123@',
    });
    expect(isValid).toBe(false);
  });

  test('fails if name has fewer than 3 characters', () => {
    const isValid = registerSchema.isValidSync({
      ...validUser,
      name: 'Jo',
    });
    expect(isValid).toBe(false);
  });

  test('fails if email is invalid', () => {
    const isValid = registerSchema.isValidSync({
      ...validUser,
      email: 'not-an-email',
    });
    expect(isValid).toBe(false);
  });
});
