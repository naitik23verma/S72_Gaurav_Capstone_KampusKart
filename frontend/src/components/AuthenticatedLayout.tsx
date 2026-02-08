import React from 'react';
import KampusKartNavbar from './KampusKartNavbar';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <KampusKartNavbar />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default AuthenticatedLayout; 