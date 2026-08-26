/**
 * Data formatting utilities for 3D Forge (pt-BR locale)
 */

/**
 * Formats a number to Brazilian Real currency (BRL)
 * @example formatCurrency(149.9) => "R$ 149,90"
 */
export function formatCurrency(amount: number): string {
  if (isNaN(amount)) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
}

/**
 * Formats date into readable pt-BR format
 * @example formatDate("2026-08-25T11:00:00Z") => "25/08/2026"
 */
export function formatDate(dateStringOrDate: string | Date, options?: Intl.DateTimeFormatOptions): string {
  if (!dateStringOrDate) return '-';
  const date = typeof dateStringOrDate === 'string' ? new Date(dateStringOrDate) : dateStringOrDate;
  if (isNaN(date.getTime())) return '-';

  return new Intl.DateTimeFormat('pt-BR', options || {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

/**
 * Formats date and time into readable pt-BR format
 * @example formatDateTime("2026-08-25T11:30:00Z") => "25/08/2026 às 11:30"
 */
export function formatDateTime(dateStringOrDate: string | Date): string {
  if (!dateStringOrDate) return '-';
  const date = typeof dateStringOrDate === 'string' ? new Date(dateStringOrDate) : dateStringOrDate;
  if (isNaN(date.getTime())) return '-';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} às ${hours}:${minutes}`;
}

/**
 * Formats a raw CPF (11 digits) into standard format 000.000.000-00
 */
export function formatCPF(cpf: string): string {
  if (!cpf) return '';
  const cleaned = cpf.replace(/\D/g, '').slice(0, 11);
  return cleaned
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2');
}

/**
 * Formats a Brazilian Postal Code (CEP) into 00000-000
 */
export function formatCEP(cep: string): string {
  if (!cep) return '';
  const cleaned = cep.replace(/\D/g, '').slice(0, 8);
  return cleaned.replace(/^(\d{5})(\d)/, '$1-$2');
}

/**
 * Formats Brazilian phone numbers: (11) 98765-4321 or (11) 3456-7890
 */
export function formatPhone(phone: string): string {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '').slice(0, 11);
  if (cleaned.length <= 10) {
    return cleaned
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
  return cleaned
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
}

/**
 * Generates an SEO friendly slug from a string
 * @example generateSlug("Filamento PLA Hyper Preto 1kg") => "filamento-pla-hyper-preto-1kg"
 */
export function generateSlug(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

/**
 * Formats 3D filament weight into readable kg or grams
 * @example formatWeight(1000) => "1.0 kg"
 */
export function formatWeight(grams: number): string {
  if (grams >= 1000) {
    const kg = (grams / 1000).toFixed(grams % 1000 === 0 ? 0 : 1);
    return `${kg} kg`;
  }
  return `${grams}g`;
}

/**
 * Formats time into readable pt-BR format
 * @example formatTime("2026-08-25T11:30:00Z") => "11:30"
 */
export function formatTime(dateStringOrDate: string | Date): string {
  if (!dateStringOrDate) return '-';
  const date = typeof dateStringOrDate === 'string' ? new Date(dateStringOrDate) : dateStringOrDate;
  if (isNaN(date.getTime())) return '-';
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}
