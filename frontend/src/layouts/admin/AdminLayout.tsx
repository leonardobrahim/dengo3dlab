import * as React from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { Drawer } from '@/src/components/ui/Drawer';
import { useAuthStore } from '@/src/stores/authStore';
import { useNavigationStore } from '@/src/stores/navigationStore';

export interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const { navigate } = useNavigationStore();

  React.useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate('/login');
      } else if (!['admin', 'superadmin', 'production', 'support', 'stock'].includes(user?.role as string)) {
        // If not an authorized role, redirect to account overview
        navigate('/minha-conta');
      }
    }
  }, [isLoading, isAuthenticated, user, navigate]);

  if (isLoading || !isAuthenticated || !['admin', 'superadmin', 'production', 'support', 'stock'].includes(user?.role as string)) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground selection:bg-pink-300/40 selection:text-pink-900">
      {/* Desktop Sidebar (Permanent) */}
      <div className="hidden lg:block shrink-0 sticky top-0 h-screen">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar (Drawer) */}
      <Drawer
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        title="Painel Administrativo"
        description="Gestão de pedidos, catálogo e fazenda 3D"
        side="left"
      >
        <div className="h-full -mx-4 -my-2">
          <AdminSidebar onItemClick={() => setMobileMenuOpen(false)} />
        </div>
      </Drawer>

      {/* Main Admin Content Column */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onMenuToggle={() => setMobileMenuOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
};
