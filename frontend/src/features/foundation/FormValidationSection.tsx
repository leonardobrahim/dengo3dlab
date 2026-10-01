import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  loginSchema,
  registerSchema,
  addressSchema,
  productSchema,
  couponSchema,
  LoginFormData,
  RegisterFormData,
  AddressFormData,
  ProductFormData,
  CouponFormData,
} from '@/src/schemas';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { Select } from '@/src/components/ui/Select';
import { Checkbox } from '@/src/components/ui/Checkbox';
import { Button } from '@/src/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/src/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/src/components/ui/Tabs';
import { useToast } from '@/src/hooks/useToast';
import { useAuthStore } from '@/src/stores/authStore';
import { ShieldCheck } from 'lucide-react';
import { formatCPF, formatPhone, formatCEP } from '@/src/utils/formatters';

export const FormValidationSection: React.FC = () => {
  const { toast } = useToast();
  const { login, register: registerUser, isLoading: isAuthLoading } = useAuthStore();

  // 1. Login Form
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema) as any,
    defaultValues: {
      email: 'carlos.maker@example.com',
      password: 'Password123!',
      rememberMe: true,
    },
  });

  const onLogin = async (data: LoginFormData) => {
    const success = await login(data);
    if (success) {
      toast.success('Login validado!', `Autenticado como ${data.email}`);
    }
  };

  // 2. Register Form
  const {
    register: registerReg,
    handleSubmit: handleRegisterSubmit,
    setValue: setRegValue,
    formState: { errors: regErrors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema) as any,
    defaultValues: {
      name: 'Leonardo Ibrahim',
      email: 'leonardo@example.com',
      cpf: '123.456.789-09',
      phone: '(11) 98888-7777',
      password: 'SenhaForte123',
      confirmPassword: 'SenhaForte123',
      termsAccepted: true,
    },
  });

  const onRegister = async (data: RegisterFormData) => {
    const success = await registerUser(data);
    if (success) {
      toast.success('Cadastro validado com Zod!', `Bem-vindo(a) ${data.name}`);
    }
  };

  // 3. Address Form
  const {
    register: registerAddr,
    handleSubmit: handleAddressSubmit,
    setValue: setAddrValue,
    formState: { errors: addrErrors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema) as any,
    defaultValues: {
      name: 'Oficina Central',
      recipientName: 'Carlos Silva',
      zipCode: '01310-100',
      street: 'Avenida Paulista',
      number: '1000',
      complement: '4º Andar',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      isDefaultShipping: true,
    },
  });

  const onSaveAddress = (data: AddressFormData) => {
    toast.success('Endereço validado!', `${data.street}, ${data.number} - ${data.city}/${data.state}`);
  };

  // 4. Product Form
  const {
    register: registerProd,
    handleSubmit: handleProdSubmit,
    formState: { errors: prodErrors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: 'Filamento PEEK Aeroespacial 1.75mm',
      slug: 'filamento-peek-aeroespacial-1-75mm',
      shortDescription: 'Polímero ultra-térmico para indústria aeroespacial suportando até 260°C.',
      description: 'Filamento de PEEK puro sem aditivos. Requer extrusora de 400°C e câmara aquecida a 90°C.',
      type: 'filament',
      brand: '3D Forge Engineering',
      basePrice: 890.00,
      basePromotionalPrice: 799.00,
      stockTotal: 12,
      inStock: true,
      tags: ['PEEK', 'Aeroespacial', 'Alta Temperatura'],
      featuredImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    },
  });

  const onSaveProduct = (data: ProductFormData) => {
    toast.success('Schema de Produto Válido!', `${data.name} (R$ ${data.basePrice})`);
  };

  return (
    <div className="space-y-12 text-left">
      {/* Section Header */}
      <div className="border-b border-border pb-6">
        <div className="flex items-center gap-2 text-primary text-xs font-mono uppercase tracking-wider font-semibold">
          <ShieldCheck className="h-4 w-4" />
          Validação de Schemas
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground mt-1">
          Formulários com React Hook Form & Zod
        </h2>
        <p className="text-sm text-muted-foreground mt-1.5 max-w-3xl">
          Todos os formulários contam com tipagem estrita via Zod Schemas (`z.infer`), validação de CPF por algoritmo de módulo 11, formatação de máscaras brasileiras e mensagens de erro acessíveis.
        </p>
      </div>

      <Tabs defaultValue="register" className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full">
          <TabsTrigger value="register">Cadastro Maker (CPF/Tel)</TabsTrigger>
          <TabsTrigger value="login">Login & Sessão</TabsTrigger>
          <TabsTrigger value="address">Endereço de Entrega</TabsTrigger>
          <TabsTrigger value="product">Cadastro de Produto</TabsTrigger>
        </TabsList>

        {/* 1. REGISTER FORM */}
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">Cadastro de Usuário Maker</CardTitle>
              <CardDescription>
                Testa a validação síncrona do Zod com conferência de CPF, telefone e confirmação de senha.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegisterSubmit(onRegister)} className="space-y-4 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Nome Completo *"
                    {...registerReg('name')}
                    error={regErrors.name?.message}
                    placeholder="Eng. Carlos Silva"
                  />
                  <Input
                    label="E-mail *"
                    type="email"
                    {...registerReg('email')}
                    error={regErrors.email?.message}
                    placeholder="carlos@maker.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="CPF (Com Validação de Dígitos) *"
                    {...registerReg('cpf')}
                    onChange={(e) => setRegValue('cpf', formatCPF(e.target.value))}
                    error={regErrors.cpf?.message}
                    placeholder="000.000.000-00"
                    helperText="Algoritmo real de validação da Receita Federal"
                  />
                  <Input
                    label="Celular / WhatsApp *"
                    {...registerReg('phone')}
                    onChange={(e) => setRegValue('phone', formatPhone(e.target.value))}
                    error={regErrors.phone?.message}
                    placeholder="(11) 98765-4321"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Senha (Mín. 8 chars, 1 maiúscula, 1 número) *"
                    type="password"
                    {...registerReg('password')}
                    error={regErrors.password?.message}
                    placeholder="••••••••"
                  />
                  <Input
                    label="Confirme a Senha *"
                    type="password"
                    {...registerReg('confirmPassword')}
                    error={regErrors.confirmPassword?.message}
                    placeholder="••••••••"
                  />
                </div>

                <div className="pt-2">
                  <Checkbox
                    label="Concordo com os Termos de Serviço e Política de Privacidade da 3D Forge"
                    {...registerReg('termsAccepted')}
                    error={regErrors.termsAccepted?.message}
                  />
                </div>

                <div className="pt-3">
                  <Button type="submit" isLoading={isAuthLoading} className="w-full sm:w-auto">
                    Validar Cadastro com Zod
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2. LOGIN FORM */}
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">Autenticação de Usuário</CardTitle>
              <CardDescription>
                Validação de e-mail RFC 5322 e senha mínima.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4 max-w-md">
                <Input
                  label="E-mail de Acesso *"
                  type="email"
                  {...registerLogin('email')}
                  error={loginErrors.email?.message}
                  placeholder="usuario@dominio.com"
                />

                <Input
                  label="Senha de Acesso *"
                  type="password"
                  {...registerLogin('password')}
                  error={loginErrors.password?.message}
                  placeholder="••••••••"
                />

                <Checkbox label="Lembrar deste dispositivo" {...registerLogin('rememberMe')} />

                <Button type="submit" isLoading={isAuthLoading} className="w-full">
                  Fazer Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. ADDRESS FORM */}
        <TabsContent value="address">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">Endereço de Entrega & Faturamento</CardTitle>
              <CardDescription>
                Validação de CEP brasileiro de 8 dígitos e campos obrigatórios de logística.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddressSubmit(onSaveAddress)} className="space-y-4 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Identificador do Local *"
                    {...registerAddr('name')}
                    error={addrErrors.name?.message}
                    placeholder="Ex: Laboratório Maker"
                  />
                  <Input
                    label="Nome do Destinatário *"
                    {...registerAddr('recipientName')}
                    error={addrErrors.recipientName?.message}
                    placeholder="Carlos Silva"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="CEP *"
                    {...registerAddr('zipCode')}
                    onChange={(e) => setAddrValue('zipCode', formatCEP(e.target.value))}
                    error={addrErrors.zipCode?.message}
                    placeholder="00000-000"
                  />
                  <div className="sm:col-span-2">
                    <Input
                      label="Logradouro / Rua *"
                      {...registerAddr('street')}
                      error={addrErrors.street?.message}
                      placeholder="Avenida Paulista"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="Número *"
                    {...registerAddr('number')}
                    error={addrErrors.number?.message}
                    placeholder="1000"
                  />
                  <div className="sm:col-span-2">
                    <Input
                      label="Complemento"
                      {...registerAddr('complement')}
                      placeholder="Sala 402, Bloco B"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="Bairro *"
                    {...registerAddr('neighborhood')}
                    error={addrErrors.neighborhood?.message}
                    placeholder="Bela Vista"
                  />
                  <Input
                    label="Cidade *"
                    {...registerAddr('city')}
                    error={addrErrors.city?.message}
                    placeholder="São Paulo"
                  />
                  <Input
                    label="UF (Estado) *"
                    maxLength={2}
                    {...registerAddr('state')}
                    error={addrErrors.state?.message}
                    placeholder="SP"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit">Validar Endereço</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 4. PRODUCT FORM */}
        <TabsContent value="product">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">Cadastro de Produto / Filamento Técnico</CardTitle>
              <CardDescription>
                Validação de preços numéricos positivos, slugs e campos de catálogo 3D.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProdSubmit(onSaveProduct)} className="space-y-4 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Nome do Produto *"
                    {...registerProd('name')}
                    error={prodErrors.name?.message}
                  />
                  <Input
                    label="Slug URL *"
                    {...registerProd('slug')}
                    error={prodErrors.slug?.message}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Select
                    label="Tipo de Item *"
                    defaultValue="filament"
                    options={[
                      { value: 'filament', label: 'Filamento FDM' },
                      { value: 'resin', label: 'Resina UV' },
                      { value: 'printer', label: 'Impressora 3D' },
                      { value: 'part', label: 'Peça de Reposição' },
                    ]}
                    {...registerProd('type')}
                  />
                  <Input
                    label="Marca *"
                    {...registerProd('brand')}
                    error={prodErrors.brand?.message}
                  />
                  <Input
                    label="Preço Base (R$) *"
                    type="number"
                    step="0.01"
                    {...registerProd('basePrice')}
                    error={prodErrors.basePrice?.message}
                  />
                </div>

                <Textarea
                  label="Breve Resumo (Short Description) *"
                  {...registerProd('shortDescription')}
                  error={prodErrors.shortDescription?.message}
                />

                <Input
                  label="URL da Imagem Principal *"
                  {...registerProd('featuredImage')}
                  error={prodErrors.featuredImage?.message}
                />

                <Button type="submit">Salvar Produto</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
