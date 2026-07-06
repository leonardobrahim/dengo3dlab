export function maskCPF(cpf: string) {
  if (!cpf) return '';
  const digits = cpf.replace(/\D/g, '');
  if (digits.length < 11) return cpf; // Return as is if not full length for simple fallback
  return `***.${digits.slice(3, 6)}.${digits.slice(6, 9)}-**`;
}

export function maskEmail(email: string) {
  if (!email || !email.includes('@')) return email;
  const [name, domain] = email.split('@');
  if (name.length <= 3) return `***@${domain}`;
  return `${name.slice(0, 3)}***@${domain}`;
}
