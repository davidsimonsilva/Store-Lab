import React from 'react';

export const MemoryRouter: React.FC<{ children: React.ReactNode; initialEntries?: string[] }> = ({ children }) => {
  return <>{children}</>;
};

export const BrowserRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const Routes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const Route: React.FC<{ path?: string; element?: React.ReactNode }> = ({ element }) => {
  return <>{element}</>;
};

export const Link: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }> = ({
  to,
  children,
  ...props
}) => {
  return (
    <a href={to} {...props}>
      {children}
    </a>
  );
};

export const NavLink = Link;

const mockNavigate = jest.fn();

export const useNavigate = () => mockNavigate;

export const useLocation = () => ({
  pathname: '/',
  search: '',
  hash: '',
  state: null,
  key: 'default',
});

export const useParams = () => ({});

export const useSearchParams = () => {
  const [params, setParams] = React.useState(new URLSearchParams());
  const setSearchParams = (newParams: URLSearchParams | Record<string, string>) => {
    if (newParams instanceof URLSearchParams) {
      setParams(newParams);
    } else {
      setParams(new URLSearchParams(newParams));
    }
  };
  return [params, setSearchParams] as const;
};

export const Navigate: React.FC<{ to: string; replace?: boolean }> = () => null;
