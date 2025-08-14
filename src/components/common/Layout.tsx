import React, { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from './AdminLayout';
import UserLayout from './UserLayout';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
    );
  }

  return user.role === 'admin' ? (
    <AdminLayout>{children}</AdminLayout>
  ) : (
    <UserLayout>{children}</UserLayout>
  );
};

export default Layout;