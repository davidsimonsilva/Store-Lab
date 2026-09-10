import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../context/AuthContext';

describe('AuthContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  beforeEach(() => {
    localStorage.clear();
  });

  test('provides anonymous user ID by default when not logged in', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.anonymousUserId).toMatch(/^usr_/);
  });

  test('loginUser logs in user and persists session', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.loginUser('Carlos Silva', 'carlos@example.com', '52998224725');
    });

    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.user?.name).toBe('Carlos Silva');
    expect(result.current.user?.email).toBe('carlos@example.com');
  });

  test('logoutUser clears user session', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.loginUser('Carlos Silva', 'carlos@example.com');
    });
    expect(result.current.isLoggedIn).toBe(true);

    act(() => {
      result.current.logoutUser();
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.user).toBeNull();
  });
});
