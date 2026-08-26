import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate } from './formatters';

describe('Formatters', () => {
  describe('formatCurrency', () => {
    it('should format positive numbers correctly', () => {
      expect(formatCurrency(1500)).toContain('1.500');
    });

    it('should format zero correctly', () => {
      expect(formatCurrency(0)).toContain('0,00');
    });
  });

  describe('formatDate', () => {
    it('should format valid dates', () => {
      expect(formatDate('2026-08-25T10:00:00Z')).toContain('25');
      expect(formatDate('2026-08-25T10:00:00Z')).toContain('2026');
    });
  });
});
