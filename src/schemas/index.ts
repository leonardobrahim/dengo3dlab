import { z } from 'zod';
import { isValidCPF, isValidCEP } from '@/src/utils/validators';

/**
 * Login validation schema
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  password: z
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Register validation schema
 */
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, 'O nome completo deve ter no mínimo 3 caracteres'),
    email: z
      .string()
      .min(1, 'O e-mail é obrigatório')
      .email('Insira um e-mail válido'),
    cpf: z
      .string()
      .min(1, 'O CPF é obrigatório')
      .refine(isValidCPF, 'CPF inválido. Verifique os dígitos digitados.'),
    phone: z
      .string()
      .min(10, 'O telefone/celular é obrigatório'),
    password: z
      .string()
      .min(8, 'A senha deve conter no mínimo 8 caracteres')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número'),
    confirmPassword: z
      .string()
      .min(1, 'A confirmação de senha é obrigatória'),
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, 'Você deve concordar com os Termos de Serviço'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Shipping Address validation schema
 */
export const addressSchema = z.object({
  name: z.string().min(2, 'Identificador de endereço (ex: Casa, Trabalho) é obrigatório'),
  recipientName: z.string().min(3, 'Nome do recebedor é obrigatório'),
  zipCode: z
    .string()
    .min(8, 'CEP inválido')
    .refine(isValidCEP, 'CEP deve conter 8 dígitos válidos'),
  street: z.string().min(3, 'Logradouro/Rua é obrigatório'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, 'Bairro é obrigatório'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  state: z.string().length(2, 'Estado (UF) deve ter 2 caracteres (ex: SP, RJ)'),
  phone: z.string().optional(),
  isDefaultShipping: z.boolean().optional(),
  isDefaultBilling: z.boolean().optional(),
});

export type AddressFormData = z.infer<typeof addressSchema>;

/**
 * Product management validation schema
 */
export const productSchema = z.object({
  name: z.string().min(3, 'Nome do produto deve ter pelo menos 3 caracteres'),
  slug: z.string().min(3, 'Slug do produto é obrigatório'),
  shortDescription: z.string().min(10, 'Breve descrição deve ter no mínimo 10 caracteres'),
  description: z.string().min(20, 'Descrição detalhada é obrigatória'),
  type: z.enum(['filament', 'resin', 'printer', 'part', 'accessory', 'printed_model', 'service']),
  brand: z.string().min(2, 'Marca/Fabricante é obrigatória'),
  basePrice: z.coerce.number().positive('Preço base deve ser maior que zero'),
  basePromotionalPrice: z.coerce.number().positive('Preço promocional deve ser positivo').optional(),
  inStock: z.boolean().optional(),
  stockTotal: z.coerce.number().int().nonnegative('Estoque não pode ser negativo').optional(),
  tags: z.array(z.string()).optional(),
  featuredImage: z.string().url('URL da imagem principal inválida'),
});

export type ProductFormData = z.infer<typeof productSchema>;

/**
 * Discount Coupon validation schema
 */
export const couponSchema = z.object({
  code: z
    .string()
    .min(3, 'Código do cupom deve ter pelo menos 3 caracteres')
    .toUpperCase(),
  discountType: z.enum(['percentage', 'fixed_amount']),
  discountValue: z.coerce.number().positive('O valor de desconto deve ser positivo'),
  minOrderValue: z.coerce.number().nonnegative().optional(),
  maxDiscountValue: z.coerce.number().nonnegative().optional(),
  expiresAt: z.string().min(10, 'Data de expiração é obrigatória'),
  isActive: z.boolean().optional(),
  description: z.string().min(5, 'Descrição do cupom é obrigatória'),
});

export type CouponFormData = z.infer<typeof couponSchema>;
