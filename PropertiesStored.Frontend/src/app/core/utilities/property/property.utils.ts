import { PropertyFilter } from "../../types/property.types";

/**
 * Creates a new filter object with updated values
 */
export const createUpdatedFilter = (
  currentFilter: PropertyFilter,
  page: number,
  pageSize: string
): PropertyFilter => ({
  ...currentFilter,
  page: page.toString(),
  pageSize,
});

/**
 * Creates an empty pagination object
 */
export const createEmptyPagination = () => ({
  page: 1,
  pageSize: 10,
  totalCount: 0,
  totalPages: 0,
});

/**
 * Checks if a filter has any search criteria
 */
export const hasSearchCriteria = (filter: PropertyFilter): boolean => {
  return !!(filter.name || filter.address || filter.minPrice || filter.maxPrice);
};

/**
 * Resets filter to default values
 */
export const resetFilter = (): PropertyFilter => ({
  name: "",
  address: "",
  minPrice: "",
  maxPrice: "",
  page: "1",
  pageSize: "10",
});
