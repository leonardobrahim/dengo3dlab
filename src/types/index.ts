/**
 * Core domain types for 3D Printing E-Commerce Platform (3D Forge)
 */

// ==========================================
// ENUMS & UNION TYPES
// ==========================================

export type UserRole = 'customer' | 'maker' | 'admin' | 'superadmin' | 'production' | 'stock' | 'support';

export type InventoryStatus =
  | 'in_stock'
  | 'low_stock'
  | 'out_of_stock'
  | 'made_to_order'
  | 'pre_order';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'in_production'
  | 'ready_to_ship'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus =
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'cancelled';

export type PaymentMethod =
  | 'credit_card'
  | 'pix'
  | 'boleto'
  | 'installments';

export type ShipmentStatus =
  | 'pending'
  | 'shipped'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'exception';

export type ProductionStatus =
  | 'queued'
  | 'slicing'
  | 'printing'
  | 'post_processing'
  | 'curing_wash'
  | 'quality_inspection'
  | 'completed'
  | 'reprint_needed';

export type PrintTechnology = 'fdm' | 'sla' | 'sls' | 'dlp' | 'metal';

export type ProductType = 'filament' | 'resin' | 'printer' | 'part' | 'accessory' | 'printed_model' | 'service';

// ==========================================
// USER & ADDRESS
// ==========================================

export interface Address {
  id: string;
  userId?: string;
  name: string;
  recipientName: string;
  zipCode: string; // CEP
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string; // UF (SP, RJ, etc.)
  isDefaultShipping?: boolean;
  isDefaultBilling?: boolean;
  phone?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  cpf?: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser extends User {
  role: 'admin' | 'superadmin';
  permissions: string[];
  department?: string;
  lastLoginAt?: string;
}

// ==========================================
// CATEGORY & PRODUCT
// ==========================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  parentId?: string | null;
  order: number;
  productCount?: number;
}

export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  type?: string; // e.g., 'color', 'phrase', 'quantity'
  value?: string; // the value of the variant, e.g., 'FODA-SE', 'Lilás'
  colorHex?: string;
  colorName?: string;
  diameterMm?: number;
  weightGrams?: number;
  material?: string;
  price: number;
  promotionalPrice?: number;
  stockQuantity: number | null;
  imageUrl?: string;
}

export interface TechnicalSpecs {
  technology?: PrintTechnology;
  printTempRange?: string; // e.g. "200°C - 230°C"
  bedTempRange?: string; // e.g. "50°C - 60°C"
  fanSpeed?: string; // e.g. "100%"
  density?: string; // e.g. "1.24 g/cm³"
  tensileStrength?: string; // e.g. "50 MPa"
  heatDeflectionTemp?: string; // e.g. "55°C"
  spoolHubDiameterMm?: number;
  layerHeightRecommendation?: string;
  layerHeightMm?: number;
  infillPercent?: number;
  material?: string;
  dimensionsMm?: { x: number; y: number; z: number };
  weightGrams?: number;
  postProcessing?: string;
  requiresEnclosure?: boolean;
  printVolumeMm?: { x: number; y: number; z: number }; // For 3D Printers
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  type: ProductType;
  brand: string;
  categories: Category[];
  variants: ProductVariant[];
  basePrice: number;
  basePromotionalPrice?: number;
  images: string[];
  featuredImage: string;
  rating: number | null;
  reviewCount: number | null;
  soldCount?: number | null;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  stockTotal: number | null;
  technicalSpecs?: TechnicalSpecs;
  tags: string[];
  origin?: string;
  packageContents?: string[];
  careInstructions?: string[];
  faq?: { question: string; answer: string }[];
  seo?: { metaTitle?: string; metaDescription?: string; keywords?: string[] };
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// CART & COUPON
// ==========================================

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  productName: string;
  productSlug: string;
  variantName: string;
  colorName?: string;
  colorHex?: string;
  material?: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
  maxStock: number;
  sku: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed_amount' | 'free_shipping';
  discountValue: number;
  minOrderValue?: number;
  maxDiscountValue?: number;
  expiresAt: string;
  isActive: boolean;
  description: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  appliedCoupon?: Coupon | null;
  shippingAddress?: Address | null;
  estimatedDeliveryDays?: number;
}

// ==========================================
// ORDER, PAYMENT & SHIPPING
// ==========================================

export interface OrderItem {
  id: string;
  productId: string;
  variantId: string;
  sku: string;
  name: string;
  variantName: string;
  material?: string;
  colorHex?: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  productionRequired?: boolean;
  productionOrderId?: string;
}

export interface Payment {
  id: string;
  orderId: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  installments?: number;
  pixQrCode?: string;
  pixQrCodeUrl?: string;
  boletoBarcode?: string;
  boletoUrl?: string;
  paidAt?: string;
  transactionReference?: string;
}

export interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location: string;
  timestamp: string;
}

export interface Shipment {
  id: string;
  orderId: string;
  carrierName: string; // e.g. "Correios Sedex", "Jadlog Express", "Loggi"
  trackingCode: string;
  trackingUrl?: string;
  status: ShipmentStatus;
  estimatedDeliveryDate: string;
  deliveredAt?: string;
  events: TrackingEvent[];
}

export interface ProductionOrder {
  id: string;
  orderId: string;
  orderItemId: string;
  status: ProductionStatus;
  printerAssigned?: string;
  materialUsed?: string;
  gramsEstimated?: number;
  printTimeEstimatedHours?: number;
  startedAt?: string;
  finishedAt?: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "3DF-2026-9812"
  userId: string;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  shippingAddress: Address;
  payment: Payment;
  shipment?: Shipment;
  productionOrders?: ProductionOrder[];
  appliedCoupon?: Coupon;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// REVIEW & INVENTORY & NOTIFICATION
// ==========================================

export interface Review {
  id: string;
  productId: string;
  userId?: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1 to 5
  title?: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulVotes: number;
  unhelpfulVotes?: number;
  printQualityScore?: number; // 1-5 special metric for 3D prints
  variantInfo?: string;
  customerPhotoUrl?: string;
  createdAt: string;
}

export interface ShippingQuoteOption {
  id: string;
  name: string;
  serviceType: 'SEDEX' | 'PAC' | 'PICKUP' | 'EXPRESS';
  carrierName: string;
  price: number;
  originalPrice?: number;
  estimatedDeliveryDays: number;
  deliveryDateFormatted: string;
  isFree?: boolean;
  highlightBadge?: string;
}

export interface InventoryItem {
  id: string;
  productId: string;
  variantId: string;
  sku: string;
  productName: string;
  variantName: string;
  currentStock: number;
  reservedStock: number;
  minStockThreshold: number;
  locationInWarehouse?: string; // e.g. "RACK-B-04"
  lastRestockedAt?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'shipping' | 'production' | 'promo' | 'system';
  isRead: boolean;
  link?: string;
  createdAt: string;
}

// ==========================================
// API CLIENT RESPONSE CONTRACTS
// ==========================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode: number;
  details?: Record<string, string[]>;
}
