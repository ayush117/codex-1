'use client';

import { AuthProvider } from './AuthProvider';
import Navbar from './Navbar';

export default function AppShell({ children }) {
  return (
    <AuthProvider>
      <Navbar />
      {children}
    </AuthProvider>
  );
}
