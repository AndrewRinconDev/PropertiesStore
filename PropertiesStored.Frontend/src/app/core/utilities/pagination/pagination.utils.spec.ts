import {
  generatePageNumbers,
  calculatePageRange,
  isValidPage,
  getNextPage,
  getPreviousPage,
  PaginationConfig
} from './pagination.utils';

describe('Pagination Utilities', () => {
  describe('generatePageNumbers', () => {
    it('should return empty array for invalid total pages', () => {
      const config: PaginationConfig = { currentPage: 1, totalPages: 0 };
      const result = generatePageNumbers(config);
      expect(result).toEqual([]);
    });

    it('should return all pages when total pages <= max visible pages', () => {
      const config: PaginationConfig = { currentPage: 1, totalPages: 3, maxVisiblePages: 5 };
      const result = generatePageNumbers(config);
      
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({ value: 1, isCurrent: true, isClickable: true });
      expect(result[1]).toEqual({ value: 2, isCurrent: false, isClickable: true });
      expect(result[2]).toEqual({ value: 3, isCurrent: false, isClickable: true });
    });

    it('should handle current page at beginning (<= 3)', () => {
      const config: PaginationConfig = { currentPage: 2, totalPages: 10 };
      const result = generatePageNumbers(config);
      
      expect(result).toHaveLength(6);
      expect(result.map(p => p.value)).toEqual([1, 2, 3, 4, '...', 10]);
      expect(result[1]).toEqual({ value: 2, isCurrent: true, isClickable: true });
    });

    it('should handle current page at end (>= totalPages - 2)', () => {
      const config: PaginationConfig = { currentPage: 9, totalPages: 10 };
      const result = generatePageNumbers(config);
      
      expect(result).toHaveLength(6);
      expect(result.map(p => p.value)).toEqual([1, '...', 7, 8, 9, 10]);
      expect(result[4]).toEqual({ value: 9, isCurrent: true, isClickable: true });
    });

    it('should handle current page in middle', () => {
      const config: PaginationConfig = { currentPage: 5, totalPages: 10 };
      const result = generatePageNumbers(config);
      
      expect(result).toHaveLength(7);
      expect(result.map(p => p.value)).toEqual([1, '...', 4, 5, 6, '...', 10]);
      expect(result[3]).toEqual({ value: 5, isCurrent: true, isClickable: true });
    });

    it('should respect custom maxVisiblePages', () => {
      const config: PaginationConfig = { currentPage: 1, totalPages: 8, maxVisiblePages: 3 };
      const result = generatePageNumbers(config);
      
      expect(result).toHaveLength(6);
      expect(result.map(p => p.value)).toEqual([1, 2, 3, 4, '...', 8]);
    });

    it('should handle edge case with exactly maxVisiblePages', () => {
      const config: PaginationConfig = { currentPage: 1, totalPages: 5, maxVisiblePages: 5 };
      const result = generatePageNumbers(config);
      
      expect(result).toHaveLength(5);
      expect(result.map(p => p.value)).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('calculatePageRange', () => {
    it('should calculate correct range for first page', () => {
      const result = calculatePageRange(1, 10, 100);
      expect(result).toEqual({ startItem: 1, endItem: 10 });
    });

    it('should calculate correct range for middle page', () => {
      const result = calculatePageRange(3, 10, 100);
      expect(result).toEqual({ startItem: 21, endItem: 30 });
    });

    it('should handle last page with fewer items', () => {
      const result = calculatePageRange(10, 10, 95);
      expect(result).toEqual({ startItem: 91, endItem: 95 });
    });

    it('should handle single page', () => {
      const result = calculatePageRange(1, 10, 5);
      expect(result).toEqual({ startItem: 1, endItem: 5 });
    });

    it('should handle zero items', () => {
      const result = calculatePageRange(1, 10, 0);
      expect(result).toEqual({ startItem: 1, endItem: 0 });
    });
  });

  describe('isValidPage', () => {
    it('should return true for valid page numbers', () => {
      expect(isValidPage(1, 10)).toBe(true);
      expect(isValidPage(5, 10)).toBe(true);
      expect(isValidPage(10, 10)).toBe(true);
    });

    it('should return false for invalid page numbers', () => {
      expect(isValidPage(0, 10)).toBe(false);
      expect(isValidPage(-1, 10)).toBe(false);
      expect(isValidPage(11, 10)).toBe(false);
      expect(isValidPage(15, 10)).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isValidPage(1, 1)).toBe(true);
      expect(isValidPage(1, 0)).toBe(false);
    });
  });

  describe('getNextPage', () => {
    it('should return next page when available', () => {
      expect(getNextPage(1, 10)).toBe(2);
      expect(getNextPage(5, 10)).toBe(6);
      expect(getNextPage(9, 10)).toBe(10);
    });

    it('should return null when on last page', () => {
      expect(getNextPage(10, 10)).toBeNull();
      expect(getNextPage(1, 1)).toBeNull();
    });

    it('should handle edge cases', () => {
      expect(getNextPage(0, 10)).toBe(1);
      expect(getNextPage(-1, 10)).toBe(0);
    });
  });

  describe('getPreviousPage', () => {
    it('should return previous page when available', () => {
      expect(getPreviousPage(2)).toBe(1);
      expect(getPreviousPage(5)).toBe(4);
      expect(getPreviousPage(10)).toBe(9);
    });

    it('should return null when on first page', () => {
      expect(getPreviousPage(1)).toBeNull();
    });

    it('should handle edge cases', () => {
      expect(getPreviousPage(0)).toBeNull();
      expect(getPreviousPage(-1)).toBeNull();
    });
  });
});
