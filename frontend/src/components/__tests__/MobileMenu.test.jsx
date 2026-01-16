import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MobileMenu from '../MobileMenu';
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

// Mock AuthContext
jest.mock('../../context/AuthContext', () => ({
  ...jest.requireActual('../../context/AuthContext'),
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
    logout: jest.fn(),
  }),
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

describe('MobileMenu Component', () => {
  test('renders hamburger toggle button', () => {
    renderWithRouter(<MobileMenu />);
    const toggleButton = screen.getByLabelText('Toggle menu');
    
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveTextContent('☰');
  });

  test('opens menu when toggle button is clicked', () => {
    renderWithRouter(<MobileMenu />);
    const toggleButton = screen.getByLabelText('Toggle menu');
    
    fireEvent.click(toggleButton);
    
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('🏠 Home')).toBeInTheDocument();
  });

  test('closes menu when close button is clicked', () => {
    renderWithRouter(<MobileMenu />);
    const toggleButton = screen.getByLabelText('Toggle menu');
    
    // Open menu
    fireEvent.click(toggleButton);
    expect(screen.getByText('Menu')).toBeInTheDocument();
    
    // Close menu
    const closeButton = screen.getByLabelText('Close menu');
    fireEvent.click(closeButton);
    
    expect(screen.queryByText('Menu')).not.toBeInTheDocument();
  });

  test('displays navigation links when menu is open', () => {
    renderWithRouter(<MobileMenu />);
    const toggleButton = screen.getByLabelText('Toggle menu');
    
    fireEvent.click(toggleButton);
    
    expect(screen.getByText('🏠 Home')).toBeInTheDocument();
    expect(screen.getByText('📦 Items')).toBeInTheDocument();
  });

  test('toggle button changes icon when menu is open', () => {
    renderWithRouter(<MobileMenu />);
    const toggleButton = screen.getByLabelText('Toggle menu');
    
    expect(toggleButton).toHaveTextContent('☰');
    
    fireEvent.click(toggleButton);
    
    expect(toggleButton).toHaveTextContent('✕');
  });
});
