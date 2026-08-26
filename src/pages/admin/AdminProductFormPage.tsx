import * as React from 'react';
import { AdminLayout } from '@/src/layouts/admin/AdminLayout';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { useToast } from '@/src/components/ui/Toast';
import { ArrowLeft, Save, Upload, X, Plus, Trash2, GripVertical, Image as ImageIcon } from 'lucide-react';

export const AdminProductFormPage: React.FC = () => {
  const { navigate } = useNavigationStore();
  const { toast } = useToast();
  
  const [images, setImages] = React.useState<string[]>([]);

  const handleSave = () => {
    toast.success('Produto salvo com sucesso!');
    navigate('/admin/produtos');
  };

  const handleMockUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      toast.success('Imagens adicionadas com sucesso (Mock)');
      // Mock images
      setImages((prev) => [
        ...prev, 
        'https://images.unsplash.com/photo-1615486171448-472d4c0c1ac9?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&h=300&fit=crop'
      ]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left pb-20">
        <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/produtos')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-black text-foreground">Novo Produto</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/admin/produtos')}>Cancelar</Button>
            <Button variant="dengo" onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" /> Salvar Produto
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            
            {/* INFORMAÇÕES BÁSICAS */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-foreground">Informações Básicas</h2>
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Nome do Produto</label>
                <Input placeholder="Ex: Mascote Lontrinha 3D" />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Slug (URL)</label>
                <Input placeholder="mascote-lontrinha-3d" />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Descrição Curta</label>
                <Input placeholder="Uma breve descrição..." />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Descrição Completa</label>
                <textarea 
                  rows={5} 
                  className="w-full bg-background border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                  placeholder="Descreva todos os detalhes do produto..."
                />
              </div>
            </div>

            {/* IMAGENS - DRAG AND DROP */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-foreground">Imagens do Produto</h2>
              
              <div className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center bg-background/50 text-center relative hover:bg-background/80 transition-colors">
                <input 
                  type="file" 
                  multiple 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleMockUpload}
                />
                <div className="h-12 w-12 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center mb-3">
                  <Upload className="h-6 w-6 text-pink-500" />
                </div>
                <p className="text-sm font-bold text-foreground">Arraste as imagens aqui</p>
                <p className="text-xs text-muted-foreground mt-1">ou clique para fazer upload (Mock)</p>
              </div>

              {images.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {images.map((img, i) => (
                    <div key={i} className="relative group rounded-xl border border-border overflow-hidden h-24 w-24 bg-background">
                      <img src={img} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button className="text-white hover:text-pink-400"><GripVertical className="h-4 w-4" /></button>
                        <button onClick={() => removeImage(i)} className="text-white hover:text-rose-400"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* VARIAÇÕES */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">Variações (Combinações)</h2>
                <Button variant="outline" size="sm" className="h-8 text-xs"><Plus className="h-3 w-3 mr-1" /> Adicionar Atributo</Button>
              </div>
              <p className="text-xs text-muted-foreground">Ex: Material, Cor, Tamanho</p>
              
              {/* Mock table of combinations */}
              <div className="border border-border rounded-xl overflow-hidden mt-4">
                <table className="w-full text-left text-xs">
                  <thead className="bg-muted text-muted-foreground font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Variação</th>
                      <th className="p-3">SKU</th>
                      <th className="p-3">Preço</th>
                      <th className="p-3">Estoque</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="bg-background">
                      <td className="p-3 font-medium">PLA • Rosa Candy • M</td>
                      <td className="p-3"><Input className="h-8 text-xs" defaultValue="PLA-ROS-M" /></td>
                      <td className="p-3"><Input className="h-8 text-xs w-24" defaultValue="89.90" /></td>
                      <td className="p-3"><Input type="number" className="h-8 text-xs w-20" defaultValue="15" /></td>
                    </tr>
                    <tr className="bg-background">
                      <td className="p-3 font-medium">PLA • Azul Céu • M</td>
                      <td className="p-3"><Input className="h-8 text-xs" defaultValue="PLA-AZU-M" /></td>
                      <td className="p-3"><Input className="h-8 text-xs w-24" defaultValue="89.90" /></td>
                      <td className="p-3"><Input type="number" className="h-8 text-xs w-20" defaultValue="8" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
          
          <div className="space-y-6">
            
            {/* ORGANIZAÇÃO */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-foreground">Organização</h2>
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Categoria Principal</label>
                <select className="w-full bg-background border border-border rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20">
                  <option>Decoração 3D</option>
                  <option>Action Figures</option>
                  <option>Filamentos</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Tags</label>
                <Input placeholder="Separado por vírgulas..." />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Status</label>
                <select className="w-full bg-background border border-border rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20">
                  <option value="active">Ativo (Publicado)</option>
                  <option value="draft">Rascunho</option>
                </select>
              </div>
            </div>

            {/* PREÇO BASE */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-foreground">Precificação Base</h2>
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Preço Padrão (R$)</label>
                <Input type="number" placeholder="89,90" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Preço Promocional (R$)</label>
                <Input type="number" placeholder="Opcional" />
              </div>
            </div>
            
            {/* DIMENSÕES BASE */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-foreground">Frete Padrão</h2>
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Peso (g)</label>
                <Input type="number" placeholder="250" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-foreground">Largura</label>
                  <Input type="number" placeholder="cm" className="text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-foreground">Altura</label>
                  <Input type="number" placeholder="cm" className="text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-foreground">Profund.</label>
                  <Input type="number" placeholder="cm" className="text-xs" />
                </div>
              </div>
            </div>
            
            {/* SEO */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-foreground">SEO</h2>
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Meta Title</label>
                <Input placeholder="Título para buscadores" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Meta Description</label>
                <textarea 
                  rows={3} 
                  className="w-full bg-background border border-border rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                  placeholder="Resumo para Google..."
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
