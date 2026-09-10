import {
  getUserAddresses,
  saveUserAddress,
  deleteUserAddress,
  setDefaultUserAddress,
  getDefaultUserAddress,
} from '../../services/addressService';

describe('AddressService - Gestão de Múltiplos Endereços', () => {
  const testUserId = 'test_user_123';

  beforeEach(() => {
    localStorage.clear();
  });

  it('deve retornar lista vazia quando o usuário não tiver endereços cadastrados', () => {
    const addresses = getUserAddresses(testUserId);
    expect(addresses).toEqual([]);
  });

  it('deve salvar o primeiro endereço e marcá-lo automaticamente como padrão', () => {
    const addressData = {
      label: 'Residencial',
      recipientName: 'João da Silva',
      cep: '01310-100',
      street: 'Avenida Paulista',
      number: '1000',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      isDefault: false, 
    };

    const saved = saveUserAddress(testUserId, addressData);

    expect(saved.id).toBeDefined();
    expect(saved.isDefault).toBe(true);

    const list = getUserAddresses(testUserId);
    expect(list.length).toBe(1);
    expect(list[0].street).toBe('Avenida Paulista');
  });

  it('ao salvar um segundo endereço como padrão, deve desmarcar o anterior', () => {
    const addr1 = saveUserAddress(testUserId, {
      label: 'Casa',
      recipientName: 'João',
      cep: '01310-100',
      street: 'Rua A',
      number: '10',
      neighborhood: 'Centro',
      city: 'SP',
      state: 'SP',
      isDefault: true,
    });

    const addr2 = saveUserAddress(testUserId, {
      label: 'Trabalho',
      recipientName: 'João',
      cep: '01310-200',
      street: 'Rua B',
      number: '20',
      neighborhood: 'Centro',
      city: 'SP',
      state: 'SP',
      isDefault: true,
    });

    const list = getUserAddresses(testUserId);
    expect(list.length).toBe(2);

    const defaultAddress = getDefaultUserAddress(testUserId);
    expect(defaultAddress?.id).toBe(addr2.id);

    const oldAddress = list.find((a) => a.id === addr1.id);
    expect(oldAddress?.isDefault).toBe(false);
  });

  it('deve permitir alterar o endereço padrão com setDefaultUserAddress', () => {
    const addr1 = saveUserAddress(testUserId, {
      label: 'Casa',
      recipientName: 'João',
      cep: '01310-100',
      street: 'Rua A',
      number: '10',
      neighborhood: 'Centro',
      city: 'SP',
      state: 'SP',
      isDefault: true,
    });

    const addr2 = saveUserAddress(testUserId, {
      label: 'Trabalho',
      recipientName: 'João',
      cep: '01310-200',
      street: 'Rua B',
      number: '20',
      neighborhood: 'Centro',
      city: 'SP',
      state: 'SP',
      isDefault: false,
    });

    setDefaultUserAddress(testUserId, addr2.id);

    const currentDefault = getDefaultUserAddress(testUserId);
    expect(currentDefault?.id).toBe(addr2.id);
  });

  it('ao excluir o endereço padrão, deve promover o primeiro restante a padrão', () => {
    const addr1 = saveUserAddress(testUserId, {
      label: 'Casa',
      recipientName: 'João',
      cep: '01310-100',
      street: 'Rua A',
      number: '10',
      neighborhood: 'Centro',
      city: 'SP',
      state: 'SP',
      isDefault: true,
    });

    const addr2 = saveUserAddress(testUserId, {
      label: 'Trabalho',
      recipientName: 'João',
      cep: '01310-200',
      street: 'Rua B',
      number: '20',
      neighborhood: 'Centro',
      city: 'SP',
      state: 'SP',
      isDefault: false,
    });

    deleteUserAddress(testUserId, addr1.id);

    const list = getUserAddresses(testUserId);
    expect(list.length).toBe(1);
    expect(list[0].id).toBe(addr2.id);
    expect(list[0].isDefault).toBe(true);
  });
});
