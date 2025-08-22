export const PAGINATION_CONSTANTS = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [3, 5, 10, 25, 50],
  SKELETON_ITEMS_COUNT: 6,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
} as const;

export const FILTER_CONSTANTS = {
  DEFAULT_FILTER: {
    name: "",
    address: "",
    minPrice: "",
    maxPrice: "",
    page: "1",
    pageSize: "10",
  },
} as const;
