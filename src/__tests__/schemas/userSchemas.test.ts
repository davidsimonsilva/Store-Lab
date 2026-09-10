import { profileSchema, addressSchema } from '../../schemas/userSchemas';

describe('userSchemas - profileSchema', () => {
  test('validates correct profile data', () => {
    const valid = {
      name: 'Maria Silva',
      email: 'maria@example.com',
      cpf: '52998224725',
      phone: '11999999999'
    };
    const isValid = profileSchema.isValidSync(valid);
    expect(isValid).toBe(true);
  });

  test('rejects short name or invalid email', () => {
    const invalid = {
      name: 'Ma',
      email: 'not-an-email'
    };
    const isValid = profileSchema.isValidSync(invalid);
    expect(isValid).toBe(false);
  });
});

describe('userSchemas - addressSchema', () => {
  test('validates complete address data', () => {
    const valid = {
      cep: '01001-000',
      street: 'Av Paulista',
      number: '1000',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP'
    };
    const isValid = addressSchema.isValidSync(valid);
    expect(isValid).toBe(true);
  });

  test('rejects incomplete address', () => {
    const invalid = {
      cep: '123',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: 'SPO'
    };
    const isValid = addressSchema.isValidSync(invalid);
    expect(isValid).toBe(false);
  });
});
