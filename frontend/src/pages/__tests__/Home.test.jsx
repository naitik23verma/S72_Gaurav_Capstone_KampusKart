import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';
import { AuthProvider } from '../../context/AuthContext';

// Mock api.js to avoid import.meta issues
jest.mock('../../config/api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
  API_URL: 'http://localhost:5000',
}));

// Mock useAuth hook
const mockUseAuth = jest.fn();
jest.mock('../../context/AuthContext', () => ({
  ...jest.requireActual('../../context/AuthContext'),
  useAuth: () => mockUseAuth(),
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Home Component', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
    });
  });

  test('renders welcome message', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByText('Welcome to KampusKart')).toBeInTheDocument();
    expect(screen.getByText('Your campus community platform for lost & found items')).toBeInTheDocument();
  });

  test('displays login and register buttons when not authenticated', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
  });

  test('displays user greeting when authenticated', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: { name: 'John Doe', _id: '123' },
    });

    renderWithRouter(<Home />);
    
    expect(screen.getByText('Hello, John Doe!')).toBeInTheDocument();
  });

  test('displays action buttons when authenticated', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: { name: 'John Doe', _id: '123' },
    });

    renderWithRouter(<Home />);
    
    expect(screen.getByRole('link', { name: /browse items/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /report lost\/found item/i })).toBeInTheDocument();
  });

  test('renders features section', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('📦 Lost & Found')).toBeInTheDocument();
    expect(screen.getByText('🔍 Search & Filter')).toBeInTheDocument();
    expect(screen.getByText('📸 Image Upload')).toBeInTheDocument();
    expect(screen.getByText('🔐 Secure')).toBeInTheDocument();
  });

  test('feature cards have descriptions', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByText('Report and find lost items on campus')).toBeInTheDocument();
    expect(screen.getByText('Easily search by category, location, and date')).toBeInTheDocument();
    expect(screen.getByText('Add photos to help identify items')).toBeInTheDocument();
    expect(screen.getByText('JWT authentication and Google OAuth')).toBeInTheDocument();
  });
});
