import { useState } from 'react';
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut } from 'lucide-react';
import { Dashboard } from './Dashboard';
import { OrdersKanban } from './OrdersKanban';
import { ProductsManagement } from './ProductsManagement';
import { CustomersManagement } from './CustomersManagement';

interface AdminLayoutProps {
  onLogout: () => void;
}

type AdminView = 'dashboard' | 'orders' | 'products' | 'customers';

export function AdminLayout({ onLogout }: AdminLayoutProps) {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'orders', label: 'Esteira de Produção', icon: Package },
    { id: 'products', label: 'Produtos & Estoque', icon: ShoppingBag },
    { id: 'customers', label: 'Clientes & Fiscal', icon: Users },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center font-bold text-white shadow-sm">
              D3
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">Dengo3D ERP</span>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    currentView === item.id 
                      ? 'bg-rose-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-slate-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sair do Painel
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'orders' && <OrdersKanban />}
          {currentView === 'products' && <ProductsManagement />}
          {currentView === 'customers' && <CustomersManagement />}
        </div>
      </div>
    </div>
  );
}
