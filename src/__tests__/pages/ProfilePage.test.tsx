import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AuthProvider } from '../../context/AuthContext';
import { ProfilePage } from '../../pages/Profile/ProfilePage';

describe('ProfilePage - Expansão do Perfil e Abas Modulares', () => {
  beforeEach(() => {
    localStorage.clear();
    const mockUser = {
      id: 'usr_test_123',
      name: 'Carlos Oliveira',
      email: 'carlos@storelab.com',
      isLoggedIn: true,
      cpf: '529.982.247-25',
      avatarId: 'avatar-1',
    };
    localStorage.setItem('user_session', JSON.stringify(mockUser));
    localStorage.setItem('lab_user_session', JSON.stringify(mockUser));
  });

  const renderProfilePage = () => {
    return render(
      <MemoryRouter>
        <AuthProvider>
          <ProfilePage />
        </AuthProvider>
      </MemoryRouter>
    );
  };

  it('deve renderizar os dados do usuário logado e as 4 abas modulares', async () => {
    renderProfilePage();

    expect(await screen.findByText('Carlos Oliveira')).toBeInTheDocument();
    expect(screen.getByText('carlos@storelab.com')).toBeInTheDocument();

    expect(screen.getByRole('tab', { name: /dados pessoais/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /endereços/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /cartões salvos/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /meus pedidos/i })).toBeInTheDocument();
  });

  it('deve alternar entre as abas ao clicar', async () => {
    renderProfilePage();

    await screen.findByText('Carlos Oliveira');

    const addressTab = screen.getByRole('tab', { name: /endereços/i });
    fireEvent.click(addressTab);

    expect(await screen.findByText(/endereços de entrega/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /novo endereço/i })).toBeInTheDocument();

    const ordersTab = screen.getByRole('tab', { name: /meus pedidos/i });
    fireEvent.click(ordersTab);

    expect(await screen.findByText(/meus pedidos e rastreamento/i)).toBeInTheDocument();
  });

  it('deve exibir o ícone fixo de perfil do usuário', async () => {
    renderProfilePage();

    expect(await screen.findByText('Carlos Oliveira')).toBeInTheDocument();
    expect(screen.getByText('carlos@storelab.com')).toBeInTheDocument();
  });
});
