import { useState } from 'react';
import { ShieldCheck, Lock, User, FileText, ShoppingCart, Menu, ChevronRight } from 'lucide-react';
import { CheckoutForm } from './components/CheckoutForm';
import { OrderSummary } from './components/OrderSummary';
import { Catalog } from './components/Catalog';
import { ProductDetails } from './components/ProductDetails';
import { MOCK_PRODUCTS } from './data/products';
import { Auth } from './components/Auth';

type ViewState = 'catalog' | 'product' | 'checkout' | 'auth';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('catalog');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [intentAfterAuth, setIntentAfterAuth] = useState<ViewState | null>(null);

  const handleProductSelect = (id: string) => {
    setSelectedProductId(id);
    setCurrentView('product');
  };

  const handleCheckoutAccess = () => {
    if (user) {
      setCurrentView('checkout');
    } else {
      setIntentAfterAuth('checkout');
      setCurrentView('auth');
    }
  };

  const handleAddToCart = () => {
    handleCheckoutAccess();
  };

  const selectedProduct = selectedProductId ? MOCK_PRODUCTS.find(p => p.id === selectedProductId) : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-rose-200">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setCurrentView('catalog')}
          >
            <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-xl shadow-sm border border-rose-200">
              <span role="img" aria-label="Otter logo">🦦</span>
            </div>
            <span className="font-extrabold text-2xl tracking-tight hidden sm:flex items-center gap-1">
              <span className="text-rose-400 drop-shadow-sm">Dengo</span>
              <span className="text-sky-400 drop-shadow-sm">3D</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            {user ? (
              <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                <User className="w-4 h-4 text-rose-500" />
                Olá, {user.name.split(' ')[0]}
              </div>
            ) : (
              <div 
                className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-rose-600 cursor-pointer transition-colors px-2 py-1 rounded-md hover:bg-rose-50"
                onClick={() => setCurrentView('auth')}
              >
                <User className="w-4 h-4" />
                Entrar
              </div>
            )}
            
            {currentView !== 'checkout' ? (
              <div 
                className="flex items-center gap-2 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-colors cursor-pointer"
                onClick={handleCheckoutAccess}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:block">Carrinho (1)</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-4 h-4" />
                <span className="hidden sm:inline">Checkout 100% Seguro</span>
                <span className="sm:hidden">Seguro</span>
              </div>
            )}
            
            <button className="md:hidden p-2 -mr-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {currentView === 'catalog' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-rose-100 to-sky-100 rounded-3xl p-8 sm:p-12 text-slate-900 relative overflow-hidden flex flex-col justify-center items-start border border-white shadow-sm">
              <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiMwMDAiLz48L3N2Zz4=')]"></div>
              <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-rose-300 rounded-full blur-3xl opacity-40 mix-blend-multiply"></div>
              <div className="absolute -left-20 -top-20 w-96 h-96 bg-sky-300 rounded-full blur-3xl opacity-40 mix-blend-multiply"></div>
              
              <div className="relative z-10 max-w-2xl">
                <span className="inline-block py-1.5 px-3.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/80 text-rose-600 text-xs font-black tracking-wider mb-5 shadow-sm">
                  ESTÚDIO CRIATIVO
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight text-slate-900">
                  Suas ideias tangíveis com um toque de dengo.
                </h1>
                <p className="text-slate-700 text-base sm:text-lg mb-8 max-w-xl font-medium leading-relaxed">
                  Peças de utilidade, decoração e engenharia. Produzidas sob demanda com qualidade superior ou prontas para envio imediato.
                </p>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Catálogo de Impressão 3D</h2>
              </div>
              <Catalog onProductSelect={handleProductSelect} />
            </div>
          </div>
        )}

        {currentView === 'product' && selectedProduct && (
          <ProductDetails 
            product={selectedProduct} 
            onBack={() => setCurrentView('catalog')}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentView === 'auth' && (
          <div className="max-w-4xl mx-auto">
             <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-6 px-4">
                <span className="hover:text-rose-600 cursor-pointer transition-colors" onClick={() => {
                  setCurrentView('catalog');
                  setIntentAfterAuth(null);
                }}>Voltar para a Vitrine</span>
              </div>
            <Auth onLoginSuccess={(u) => {
              setUser(u);
              if (intentAfterAuth) {
                setCurrentView(intentAfterAuth);
                setIntentAfterAuth(null);
              } else {
                setCurrentView('catalog');
              }
            }} />
          </div>
        )}

        {currentView === 'checkout' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Form Flow */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-6">
              <div className="flex flex-col gap-1 pb-2">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-2">
                  <span className="hover:text-rose-600 cursor-pointer" onClick={() => setCurrentView('catalog')}>Vitrine</span>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-slate-900 font-semibold">Checkout</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-slate-400" />
                  Finalizar Compra
                </h1>
                <p className="text-slate-500 font-medium pl-9 text-sm">
                  Sua peça 3D será colocada na fila de impressão assim que o pagamento for confirmado.
                </p>
              </div>
              <CheckoutForm />
            </div>
            
            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 xl:col-span-5">
              <div className="sticky top-24">
                <OrderSummary />
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-500 hover:text-rose-600 transition-colors p-3 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 cursor-pointer">
                    <FileText className="w-5 h-5" />
                    <div>
                      <div className="text-slate-900">Política de Privacidade (LGPD)</div>
                      <div className="text-xs font-normal">Saiba como tratamos e protegemos seus dados.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
