import * as React from 'react';
import { StoreHeader } from './StoreHeader';
import { StoreFooter } from './StoreFooter';
import { CartDrawer } from '@/src/features/foundation/CartDrawer';

export interface StoreLayoutProps {
  children: React.ReactNode;
}

export const StoreLayout: React.FC<StoreLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-pink-300/40 selection:text-pink-900">
      <StoreHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
      <StoreFooter />
      <CartDrawer />
    </div>
  );
};
