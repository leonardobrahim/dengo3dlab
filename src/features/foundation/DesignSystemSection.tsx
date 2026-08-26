import * as React from 'react';
import {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  Switch,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Dialog,
  Drawer,
  Dropdown,
  DropdownItem,
  DropdownSeparator,
  Tooltip,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Pagination,
  Breadcrumb,
  Avatar,
  Skeleton,
  Progress,
  Separator,
} from '@/src/components/ui';
import { DengoLogo } from '@/src/components/brand/DengoLogo';
import { useToast } from '@/src/hooks/useToast';
import {
  Layers,
  Sparkles,
  Heart,
  CheckCircle,
  AlertTriangle,
  Cake,
  Palette,
  Search,
  Mail,
  Lock,
  ChevronDown,
  Box,
  Share2,
  Flower2,
  Wand2,
} from 'lucide-react';

export const DesignSystemSection: React.FC = () => {
  const { toast } = useToast();

  // Component state controls for interactive workbench
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [switchChecked, setSwitchChecked] = React.useState(true);
  const [selectedRadio, setSelectedRadio] = React.useState('pink_silk');
  const [progressVal, setProgressVal] = React.useState(75);
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div className="space-y-12 text-left">
      {/* Section Header */}
      <div className="border-b border-pink-200/60 dark:border-pink-900/40 pb-6">
        <div className="flex items-center gap-2 text-pink-500 text-xs font-mono uppercase tracking-wider font-bold">
          <Palette className="h-4 w-4" />
          Design System Candy & Tokens Visuais Dengo
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground mt-1">
          Paleta Azul & Rosa Bebê com 23 Componentes Base
        </h2>
        <p className="text-sm text-muted-foreground mt-1.5 max-w-3xl">
          A estética da Dengo 3D Lab combina a fofura de tons pastéis (Baby Pink `#F472B6` e Baby Blue `#38BDF8`), cantos arredondados orgânicos, sombras aveludadas e conformidade rigorosa com acessibilidade WCAG AA e Dark Mode.
        </p>
      </div>

      {/* 0. BRAND PALETTE & MASCOT TOKENS */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <Heart className="h-4 w-4 text-pink-500 fill-pink-500" />
          <span>Paleta de Cores Oficial Dengo 3D</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {/* Baby Pink */}
          <div className="p-4 rounded-2xl border border-pink-200 dark:border-pink-900/60 bg-pink-50/70 dark:bg-pink-950/40 space-y-2">
            <div className="h-12 w-full rounded-xl bg-pink-400 shadow-xs flex items-center justify-center text-white font-black text-xs">
              #F472B6
            </div>
            <div>
              <p className="font-bold text-xs text-foreground">Rosa Bebê (Primary)</p>
              <p className="text-[11px] text-muted-foreground">Capuz da Lontra & Candy Silk</p>
            </div>
          </div>

          {/* Baby Blue */}
          <div className="p-4 rounded-2xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/70 dark:bg-sky-950/40 space-y-2">
            <div className="h-12 w-full rounded-xl bg-sky-400 shadow-xs flex items-center justify-center text-white font-black text-xs">
              #38BDF8
            </div>
            <div>
              <p className="font-bold text-xs text-foreground">Azul Céu (Secondary)</p>
              <p className="text-[11px] text-muted-foreground">Benchy Pastel & Destaques</p>
            </div>
          </div>

          {/* Cherry Red */}
          <div className="p-4 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/40 space-y-2">
            <div className="h-12 w-full rounded-xl bg-rose-500 shadow-xs flex items-center justify-center text-white font-black text-xs">
              #FF4D6D
            </div>
            <div>
              <p className="font-bold text-xs text-foreground">Cerejinha do Capuz</p>
              <p className="text-[11px] text-muted-foreground">Destaques & Acentos Doces</p>
            </div>
          </div>

          {/* Otter Fur Warm Brown */}
          <div className="p-4 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/30 space-y-2">
            <div className="h-12 w-full rounded-xl bg-[#8D634E] shadow-xs flex items-center justify-center text-white font-black text-xs">
              #8D634E
            </div>
            <div>
              <p className="font-bold text-xs text-foreground">Pelagem da Lontrinha</p>
              <p className="text-[11px] text-muted-foreground">Aconchego & Tons Terrosos</p>
            </div>
          </div>

          {/* Marshmallow White */}
          <div className="p-4 rounded-2xl border border-pink-200/60 dark:border-border bg-card space-y-2">
            <div className="h-12 w-full rounded-xl bg-pink-100/60 dark:bg-zinc-800 border border-pink-200 dark:border-border shadow-xs flex items-center justify-center text-pink-700 dark:text-pink-300 font-bold text-xs">
              #FFFDFE
            </div>
            <div>
              <p className="font-bold text-xs text-foreground">Marshmallow Canvas</p>
              <p className="text-[11px] text-muted-foreground">Fundo Suave & Aveludado</p>
            </div>
          </div>
        </div>
      </section>

      {/* 1. BUTTONS & SIZES & VARIANTS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-pink-500" />
            1. Buttons & Variantes Candy
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBtnLoading(!btnLoading)}
            className="text-xs"
          >
            {btnLoading ? 'Desativar Loading' : 'Simular Loading'}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl border border-pink-200/60 dark:border-pink-900/40 bg-card">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-pink-600 dark:text-pink-400">Dengo Gradient</p>
            <Button
              variant="dengo"
              className="w-full"
              isLoading={btnLoading}
              onClick={() => toast.success('Dengo Gradient Ativado!')}
            >
              Comprar Lontrinha
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-sky-600 dark:text-sky-400">Baby Blue</p>
            <Button
              variant="babyBlue"
              className="w-full"
              isLoading={btnLoading}
              onClick={() => toast.info('Filamento Azul Selecionado')}
            >
              Adicionar ao Carrinho
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-pink-500">Baby Pink</p>
            <Button
              variant="babyPink"
              className="w-full"
              isLoading={btnLoading}
              onClick={() => toast.info('Filamento Rosa Selecionado')}
            >
              Favoritar Item
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Outline Pastel</p>
            <Button
              variant="outline"
              className="w-full"
              isLoading={btnLoading}
              onClick={() => toast.info('Exportar arquivo STL fofo')}
            >
              Exportar Modelo 3D
            </Button>
          </div>
        </div>
      </section>

      {/* 2. BADGES & CHIPS */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
          2. Badges & Chips Pastel
        </h3>

        <div className="flex flex-wrap items-center gap-2.5 p-5 rounded-2xl border border-pink-200/60 dark:border-pink-900/40 bg-card">
          <Badge variant="candyGradient">DENGO 3D OFICIAL</Badge>
          <Badge variant="babyPink" dot>Rosa Bebê Candy</Badge>
          <Badge variant="babyBlue" dot>Azul Céu Macaron</Badge>
          <Badge variant="cherry">🍒 Cereja do Bolo</Badge>
          <Badge variant="filament">PLA Silk 1.75mm</Badge>
          <Badge variant="success" dot>Pronta Entrega</Badge>
          <Badge variant="secondary">Articulado</Badge>
          <Badge variant="outline">Edição Especial</Badge>
          <Badge variant="warning">Últimas Unidades</Badge>
          <Badge variant="tech">AMS MULTICOLOR</Badge>
        </div>
      </section>

      {/* 3. INPUTS & FORM CONTROLS */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-pink-400" />
          3. Formulários & Entradas Acessíveis
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl border border-pink-200/60 dark:border-pink-900/40 bg-card">
          <Input
            label="Buscar no Catálogo Dengo"
            placeholder="Ex: Lontra, cortador, PLA rosa..."
            leftIcon={<Search className="h-4 w-4 text-pink-400" />}
          />

          <Select
            label="Cor Candy Color Predileta"
            options={[
              { value: 'pink', label: '🌸 Rosa Bebê Silk' },
              { value: 'blue', label: '☁️ Azul Céu Macaron' },
              { value: 'lavender', label: '💜 Lavanda Pastel' },
              { value: 'mint', label: '🌿 Menta Suave' },
            ]}
          />

          <Input
            label="Cupom de Desconto"
            defaultValue="DENGO10"
            helperText="Ganhe 10% OFF no seu primeiro pedido"
            rightIcon={<Sparkles className="h-4 w-4 text-pink-500" />}
          />
        </div>
      </section>

      {/* 4. SELECTION CONTROLS: CHECKBOX, RADIO, SWITCH */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
          4. Seletores: Checkbox, Radio e Switch
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-2xl border border-pink-200/60 dark:border-pink-900/40 bg-card">
          {/* Checkboxes */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-pink-600 dark:text-pink-400">Opções Adicionais</p>
            <Checkbox label="Embalagem de presente fofa com laço" defaultChecked />
            <Checkbox label="Incluir mini 3DBenchy brinde" defaultChecked />
            <Checkbox label="Perfume suave de baunilha na caixa" />
          </div>

          {/* Radio Group */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-sky-600 dark:text-sky-400">Material de Impressão</p>
            <RadioGroup
              name="material_type"
              value={selectedRadio}
              onChange={setSelectedRadio}
              options={[
                { value: 'pink_silk', label: 'PLA Silk Rosa Bebê (Toque Aveludado)' },
                { value: 'blue_mac', label: 'PLA Azul Céu Macaron (Fosco Macio)' },
                { value: 'candy_flex', label: 'TPU Flexível Candy (Super Macio)' },
              ]}
            />
          </div>

          {/* Switch & Feedback */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-foreground">Configurações Rápidas</p>
            <Switch
              label="Notificações de Novos Lançamentos"
              checked={switchChecked}
              onChange={setSwitchChecked}
            />
            <div className="pt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-muted-foreground">Progresso da Impressão</span>
                <span className="font-mono font-bold text-pink-500">{progressVal}%</span>
              </div>
              <Progress value={progressVal} />
            </div>
          </div>
        </div>
      </section>

      {/* 5. TABS & ACCORDIONS */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-pink-500" />
          5. Tabs & Accordion
        </h3>

        <div className="p-5 rounded-2xl border border-pink-200/60 dark:border-pink-900/40 bg-card space-y-6">
          <Tabs defaultValue="specs">
            <TabsList className="bg-pink-50/80 dark:bg-card">
              <TabsTrigger value="specs">Especificações da Peça</TabsTrigger>
              <TabsTrigger value="materials">Cuidados com PLA Candy</TabsTrigger>
              <TabsTrigger value="shipping">Envio & Embalagem</TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="text-xs text-muted-foreground space-y-2 mt-3">
              <p>
                <strong>Altura da Camada:</strong> 0.12mm (Ultra-fina para sumir com as marcas de impressão).
              </p>
              <p>
                <strong>Articulações:</strong> Impressão Print-in-Place sem necessidade de montagem frágil.
              </p>
            </TabsContent>

            <TabsContent value="materials" className="text-xs text-muted-foreground space-y-2 mt-3">
              <p>
                O PLA biodegradável deve ser mantido ao abrigo de calor excessivo acima de 55°C (não deixar no interior de carros fechados ao sol). Limpar com água fria e sabão neutro.
              </p>
            </TabsContent>

            <TabsContent value="shipping" className="text-xs text-muted-foreground space-y-2 mt-3">
              <p>
                Todas as peças Dengo são embaladas com plástico bolha fofo rosa, papel seda perfumado e caixa reforçada para garantir que cheguem perfeitas em suas mãos!
              </p>
            </TabsContent>
          </Tabs>

          <Separator />

          <Accordion
            items={[
              {
                id: 'acc-1',
                title: 'Como funciona o atendimento personalizado da Dengo 3D Lab?',
                content:
                  'Você pode solicitar personalização de cores, gravação de nomes em chaveiros ou modelagem exclusiva de cortadores e mascotes enviando uma mensagem para nossa equipe.',
              },
              {
                id: 'acc-2',
                title: 'Os filamentos em tons pastéis desbotam com o tempo?',
                content:
                  'Não! Nossos pigmentos Silk Candy utilizam aditivos estabilizadores UV que preservam o tom pastel vivo e reluzente por muitos anos em ambientes internos.',
              },
            ]}
          />
        </div>
      </section>

      {/* 6. OVERLAYS: DIALOG, DRAWER, DROPDOWN & TOOLTIP */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
          6. Modais & Overlays Interativos
        </h3>

        <div className="flex flex-wrap items-center gap-4 p-5 rounded-2xl border border-pink-200/60 dark:border-pink-900/40 bg-card">
          <Button variant="dengo" onClick={() => setIsDialogOpen(true)}>
            Abrir Modal de Personalização
          </Button>

          <Button variant="babyBlue" onClick={() => setIsDrawerOpen(true)}>
            Abrir Gaveta Lateral de Ajustes
          </Button>

          <Dropdown
            trigger={
              <Button variant="outline" rightIcon={<ChevronDown className="h-4 w-4" />}>
                Menu Rápido Dengo
              </Button>
            }
          >
            <DropdownItem onClick={() => toast.info('Baixando guia de fatiamento')}>
              Guia de Fatiamento Candy
            </DropdownItem>
            <DropdownItem onClick={() => toast.info('Abrindo chat da Dengo')}>
              Falar com o Suporte
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem onClick={() => toast.success('Cupom DENGO10 copiado!')}>
              Copiar Cupom DENGO10
            </DropdownItem>
          </Dropdown>

          <Tooltip content="Mascote Oficial Dengo 3D Lab">
            <span className="cursor-pointer">
              <DengoLogo size="sm" variant="icon" />
            </span>
          </Tooltip>
        </div>
      </section>

      {/* 7. TABLES, PAGINATION, AVATARS & SKELETON */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-pink-500" />
          7. Tabela de Filamentos Candy Colors
        </h3>

        <div className="p-5 rounded-2xl border border-pink-200/60 dark:border-pink-900/40 bg-card space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Tonalidade Candy</TableHead>
                <TableHead>Temperatura Bico</TableHead>
                <TableHead>Mesa Aquecida</TableHead>
                <TableHead>Acabamento</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono text-xs text-pink-600 font-bold">FIL-SILK-PNK</TableCell>
                <TableCell className="font-bold">🌸 Rosa Bebê Silk</TableCell>
                <TableCell>205°C - 220°C</TableCell>
                <TableCell>50°C - 60°C</TableCell>
                <TableCell>Seda Acetinada</TableCell>
                <TableCell className="text-right">
                  <Badge variant="success">Em Estoque</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-xs text-sky-600 font-bold">FIL-MAC-BLU</TableCell>
                <TableCell className="font-bold">☁️ Azul Céu Macaron</TableCell>
                <TableCell>200°C - 215°C</TableCell>
                <TableCell>50°C - 55°C</TableCell>
                <TableCell>Fosco Aveludado</TableCell>
                <TableCell className="text-right">
                  <Badge variant="babyBlue">Mais Vendido</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-xs text-purple-600 font-bold">FIL-PAST-LAV</TableCell>
                <TableCell className="font-bold">💜 Lavanda Pastel</TableCell>
                <TableCell>205°C - 220°C</TableCell>
                <TableCell>50°C - 60°C</TableCell>
                <TableCell>Cintilante Suave</TableCell>
                <TableCell className="text-right">
                  <Badge variant="babyPink">Lançamento</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Pagination
            currentPage={currentPage}
            totalPages={3}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>

      {/* Interactive Dialog / Modal Instance */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="Personalize sua Peça Dengo 3D"
        description="Escolha as cores do corpinho e do capuz de ursinho com cerejas!"
      >
        <div className="space-y-4 py-2 text-left">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-900/60">
            <DengoLogo size="sm" variant="icon" />
            <p className="text-xs text-pink-800 dark:text-pink-200 font-medium">
              A lontrinha é impressa com articulações flexíveis nos braços, patinhas e rabinho!
            </p>
          </div>
          <Input label="Nome para Gravação na Base (Opcional)" placeholder="Ex: Léo & Dengo" />
          <Select
            label="Cor Principal do Capuz de Ursinho"
            defaultValue="pink"
            options={[
              { value: 'pink', label: '🌸 Rosa Bebê Tradicional' },
              { value: 'blue', label: '☁️ Azul Céu Macaron' },
              { value: 'lavender', label: '💜 Lavanda Mágica' },
            ]}
          />
          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Fechar
            </Button>
            <Button
              variant="dengo"
              onClick={() => {
                setIsDialogOpen(false);
                toast.success('Pedido personalizado adicionado com carinho!');
              }}
            >
              Salvar Personalização
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Interactive Drawer Instance */}
      <Drawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        title="Configurações de Impressão Dengo"
        description="Ajustes de fatiamento para filamentos Silk e Candy Colors"
        side="right"
      >
        <div className="space-y-4 text-left">
          <div className="p-3.5 rounded-2xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-900/50 text-xs space-y-1">
            <p className="font-bold text-pink-700 dark:text-pink-300">Dica do Mestre Maker:</p>
            <p className="text-muted-foreground">
              Para o efeito Silk extra brilhante, reduza a velocidade externa para 40mm/s e eleve a temperatura para 215°C.
            </p>
          </div>
          <Input label="Velocidade da Parede Externa" defaultValue="45 mm/s (Brilho Máximo)" />
          <Input label="Multiplicador de Extrusão" defaultValue="0.98 (Acabamento Sedoso)" />
          <div className="pt-4">
            <Button
              variant="dengo"
              className="w-full"
              onClick={() => {
                setIsDrawerOpen(false);
                toast.success('Parâmetros salvos no perfil Dengo Slicer!');
              }}
            >
              Aplicar Perfil Silk
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
