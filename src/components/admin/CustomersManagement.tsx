import { useState } from 'react';
import { Eye, EyeOff, Search, Download, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

interface Customer {
  id: string;
  name: string;
  email: string;
  cpf: string;
  address: string;
  totalOrders: number;
}

const mockCustomers: Customer[] = [
  { id: '1', name: 'João Silva', email: 'joao.silva@exemplo.com', cpf: '123.456.789-00', address: 'Rua das Flores, 123 - São Paulo, SP', totalOrders: 5 },
  { id: '2', name: 'Maria Oliveira', email: 'maria.o@exemplo.com', cpf: '987.654.321-11', address: 'Av. Paulista, 1500 - Apt 45 - São Paulo, SP', totalOrders: 2 },
  { id: '3', name: 'Carlos Souza', email: 'csouza@exemplo.com', cpf: '456.789.123-22', address: 'Rua Central, 400 - Curitiba, PR', totalOrders: 1 },
];

const maskCPF = (cpf: string) => `***.${cpf.substring(4, 7)}.***-**`;
const maskAddress = (address: string) => {
  const parts = address.split('-');
  return `*** - ${parts[1] || '***'}`;
};

export function CustomersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [unmaskedId, setUnmaskedId] = useState<string | null>(null);

  const filteredCustomers = mockCustomers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMask = (id: string) => {
    if (unmaskedId === id) {
      setUnmaskedId(null);
    } else {
      setUnmaskedId(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clientes e Faturamento</h1>
          <p className="text-slate-500">Gestão segura de dados para emissão fiscal.</p>
        </div>
        <Button variant="outline" className="text-slate-700 bg-white">
          <Download className="w-4 h-4 mr-2" /> Exportar Relatório Fiscal
        </Button>
      </div>

      <div className="bg-emerald-50 p-4 rounded-xl text-sm text-emerald-800 font-medium flex gap-3 items-start border border-emerald-100">
        <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold mb-1">Proteção de Dados Ativa</p>
          <p className="text-emerald-700">
            CPFs e endereços estão ocultos por padrão para evitar exposição indevida (Compliance LGPD). 
            Desoculte apenas no momento de emitir a Nota Fiscal.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center">
        <Search className="w-5 h-5 text-slate-400 mr-3" />
        <input
          type="text"
          placeholder="Buscar cliente por nome ou e-mail..."
          className="w-full bg-transparent border-none focus:outline-none text-sm text-slate-900"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Cliente</th>
                <th className="p-4 font-semibold">Contato</th>
                <th className="p-4 font-semibold">CPF (Protegido)</th>
                <th className="p-4 font-semibold">Endereço de Entrega</th>
                <th className="p-4 font-semibold text-center">Pedidos</th>
                <th className="p-4 font-semibold text-right">Ação Fiscal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map((customer) => {
                const isUnmasked = unmaskedId === customer.id;
                return (
                  <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 text-sm">{customer.name}</div>
                    </td>
                    <td className="p-4 text-sm text-slate-600">{customer.email}</td>
                    <td className="p-4">
                      <div className="font-mono text-sm bg-slate-100 px-2 py-1 rounded inline-block text-slate-700">
                        {isUnmasked ? customer.cpf : maskCPF(customer.cpf)}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600 max-w-xs truncate" title={isUnmasked ? customer.address : maskAddress(customer.address)}>
                      {isUnmasked ? customer.address : maskAddress(customer.address)}
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full text-xs">
                        {customer.totalOrders}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={`h-8 px-3 text-xs ${isUnmasked ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' : ''}`}
                        onClick={() => toggleMask(customer.id)}
                      >
                        {isUnmasked ? (
                          <><EyeOff className="w-3.5 h-3.5 mr-1.5" /> Ocultar</>
                        ) : (
                          <><Eye className="w-3.5 h-3.5 mr-1.5" /> Ver Dados NF</>
                        )}
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
