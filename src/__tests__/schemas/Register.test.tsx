import { registerSchema } from '../../schemas/authSchemas';

describe('Register Schema Validation', () => {
  test('fails if password and confirmPassword do not match', () => {
    const invalidData = {
      name: 'João Silva',
      email: 'joao@example.com',
      password: 'password123',
      confirmPassword: 'differentpassword',
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  test('passes if all fields are valid and passwords match', () => {
    const validData = {
      name: 'João Silva',
      email: 'joao@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };

    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
