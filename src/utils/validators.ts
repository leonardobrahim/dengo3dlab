/**
 * Validation utilities for Brazilian documents and forms
 */

/**
 * Validates a Brazilian CPF (Cadastro de Pessoas Físicas) using standard checksum algorithm
 */
export function isValidCPF(cpf: string): boolean {
  if (!cpf) return false;
  const clean = cpf.replace(/\D/g, '');

  if (clean.length !== 11) return false;
  // Check for known invalid sequential values
  if (/^(\d)\1{10}$/.test(clean)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(clean.charAt(i)) * (10 - i);
  }
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(clean.charAt(i)) * (11 - i);
  }
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean.charAt(10))) return false;

  return true;
}

/**
 * Validates a Brazilian CEP (8 digits)
 */
export function isValidCEP(cep: string): boolean {
  if (!cep) return false;
  const clean = cep.replace(/\D/g, '');
  return clean.length === 8;
}

/**
 * Validates basic email structure
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates Brazilian phone numbers (10 or 11 digits)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  const clean = phone.replace(/\D/g, '');
  return clean.length === 10 || clean.length === 11;
}
