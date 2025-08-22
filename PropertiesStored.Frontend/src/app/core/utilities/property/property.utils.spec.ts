import {
  createUpdatedFilter,
  createEmptyPagination,
  hasSearchCriteria,
  resetFilter
} from './property.utils';
import { PropertyFilter } from '../../types/property.types';

describe('Property Utilities', () => {
  describe('createUpdatedFilter', () => {
    it('should create updated filter with new page and pageSize', () => {
      const currentFilter: PropertyFilter = {
        name: 'Test Property',
        address: '123 Test St',
        minPrice: '100000',
        maxPrice: '500000',
        page: '1',
        pageSize: '10'
      };

      const result = createUpdatedFilter(currentFilter, 2, '25');

      expect(result).toEqual({
        name: 'Test Property',
        address: '123 Test St',
        minPrice: '100000',
        maxPrice: '500000',
        page: '2',
        pageSize: '25'
      });
    });

    it('should preserve all other filter properties', () => {
      const currentFilter: PropertyFilter = {
        name: 'Luxury',
        address: 'Downtown',
        minPrice: '1000000',
        maxPrice: '5000000',
        page: '3',
        pageSize: '50'
      };

      const result = createUpdatedFilter(currentFilter, 1, '10');

      expect(result.name).toBe('Luxury');
      expect(result.address).toBe('Downtown');
      expect(result.minPrice).toBe('1000000');
      expect(result.maxPrice).toBe('5000000');
      expect(result.page).toBe('1');
      expect(result.pageSize).toBe('10');
    });

    it('should handle empty filter', () => {
      const currentFilter: PropertyFilter = {
        name: '',
        address: '',
        minPrice: '',
        maxPrice: '',
        page: '1',
        pageSize: '10'
      };

      const result = createUpdatedFilter(currentFilter, 5, '100');

      expect(result.page).toBe('5');
      expect(result.pageSize).toBe('100');
    });
  });

  describe('createEmptyPagination', () => {
    it('should return empty pagination object with default values', () => {
      const result = createEmptyPagination();

      expect(result).toEqual({
        page: 1,
        pageSize: 10,
        totalCount: 0,
        totalPages: 0
      });
    });

    it('should return new object instance each time', () => {
      const result1 = createEmptyPagination();
      const result2 = createEmptyPagination();

      expect(result1).not.toBe(result2);
      expect(result1).toEqual(result2);
    });
  });

  describe('hasSearchCriteria', () => {
    it('should return true when name is provided', () => {
      const filter: PropertyFilter = {
        name: 'Test Property',
        address: '',
        minPrice: '',
        maxPrice: '',
        page: '1',
        pageSize: '10'
      };

      expect(hasSearchCriteria(filter)).toBe(true);
    });

    it('should return true when address is provided', () => {
      const filter: PropertyFilter = {
        name: '',
        address: '123 Test St',
        minPrice: '',
        maxPrice: '',
        page: '1',
        pageSize: '10'
      };

      expect(hasSearchCriteria(filter)).toBe(true);
    });

    it('should return true when minPrice is provided', () => {
      const filter: PropertyFilter = {
        name: '',
        address: '',
        minPrice: '100000',
        maxPrice: '',
        page: '1',
        pageSize: '10'
      };

      expect(hasSearchCriteria(filter)).toBe(true);
    });

    it('should return true when maxPrice is provided', () => {
      const filter: PropertyFilter = {
        name: '',
        address: '',
        minPrice: '',
        maxPrice: '500000',
        page: '1',
        pageSize: '10'
      };

      expect(hasSearchCriteria(filter)).toBe(true);
    });

    it('should return true when multiple criteria are provided', () => {
      const filter: PropertyFilter = {
        name: 'Luxury',
        address: 'Downtown',
        minPrice: '1000000',
        maxPrice: '5000000',
        page: '1',
        pageSize: '10'
      };

      expect(hasSearchCriteria(filter)).toBe(true);
    });

    it('should return false when no search criteria are provided', () => {
      const filter: PropertyFilter = {
        name: '',
        address: '',
        minPrice: '',
        maxPrice: '',
        page: '1',
        pageSize: '10'
      };

      expect(hasSearchCriteria(filter)).toBe(false);
    });

    it('should return false when only page and pageSize are provided', () => {
      const filter: PropertyFilter = {
        name: '',
        address: '',
        minPrice: '',
        maxPrice: '',
        page: '2',
        pageSize: '25'
      };

      expect(hasSearchCriteria(filter)).toBe(false);
    });
  });

  describe('resetFilter', () => {
    it('should return filter with default values', () => {
      const result = resetFilter();

      expect(result).toEqual({
        name: '',
        address: '',
        minPrice: '',
        maxPrice: '',
        page: '1',
        pageSize: '10'
      });
    });

    it('should return new object instance each time', () => {
      const result1 = resetFilter();
      const result2 = resetFilter();

      expect(result1).not.toBe(result2);
      expect(result1).toEqual(result2);
    });

    it('should always return the same default values', () => {
      const result = resetFilter();

      expect(result.name).toBe('');
      expect(result.address).toBe('');
      expect(result.minPrice).toBe('');
      expect(result.maxPrice).toBe('');
      expect(result.page).toBe('1');
      expect(result.pageSize).toBe('10');
    });
  });
});
