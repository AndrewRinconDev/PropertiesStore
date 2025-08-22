export interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
}

export interface PageNumber {
  value: number | string;
  isCurrent: boolean;
  isClickable: boolean;
}

/**
 * Generates an array of page numbers for pagination display
 * @param config - Pagination configuration
 * @returns Array of page numbers with metadata
 */
export function generatePageNumbers(config: PaginationConfig): PageNumber[] {
  const { currentPage, totalPages, maxVisiblePages = 5 } = config;
  
  if (totalPages <= 0) return [];
  
  const pages: PageNumber[] = [];
  
  // If total pages is less than or equal to max visible pages, show all
  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push({
        value: i,
        isCurrent: i === currentPage,
        isClickable: true
      });
    }
    return pages;
  }
  
  // Handle edge cases for better UX
  if (currentPage <= 3) {
    // Show first 4 pages + ellipsis + last page
    for (let i = 1; i <= 4; i++) {
      pages.push({
        value: i,
        isCurrent: i === currentPage,
        isClickable: true
      });
    }
    pages.push({
      value: '...',
      isCurrent: false,
      isClickable: false
    });
    pages.push({
      value: totalPages,
      isCurrent: false,
      isClickable: true
    });
  } else if (currentPage >= totalPages - 2) {
    // Show first page + ellipsis + last 4 pages
    pages.push({
      value: 1,
      isCurrent: false,
      isClickable: true
    });
    pages.push({
      value: '...',
      isCurrent: false,
      isClickable: false
    });
    for (let i = totalPages - 3; i <= totalPages; i++) {
      pages.push({
        value: i,
        isCurrent: i === currentPage,
        isClickable: true
      });
    }
  } else {
    // Show first page + ellipsis + current page ± 1 + ellipsis + last page
    pages.push({
      value: 1,
      isCurrent: false,
      isClickable: true
    });
    pages.push({
      value: '...',
      isCurrent: false,
      isClickable: false
    });
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      pages.push({
        value: i,
        isCurrent: i === currentPage,
        isClickable: true
      });
    }
    pages.push({
      value: '...',
      isCurrent: false,
      isClickable: false
    });
    pages.push({
      value: totalPages,
      isCurrent: false,
      isClickable: true
    });
  }
  
  return pages;
}

/**
 * Calculates the start and end item numbers for the current page
 * @param page - Current page number
 * @param pageSize - Number of items per page
 * @param totalCount - Total number of items
 * @returns Object with start and end item numbers
 */
export function calculatePageRange(page: number, pageSize: number, totalCount: number) {
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalCount);
  
  return { startItem, endItem };
}

/**
 * Checks if a page number is valid
 * @param page - Page number to validate
 * @param totalPages - Total number of pages
 * @returns True if page number is valid
 */
export function isValidPage(page: number, totalPages: number): boolean {
  return page >= 1 && page <= totalPages;
}

/**
 * Gets the next page number
 * @param currentPage - Current page number
 * @param totalPages - Total number of pages
 * @returns Next page number or null if already on last page
 */
export function getNextPage(currentPage: number, totalPages: number): number | null {
  return currentPage < totalPages ? currentPage + 1 : null;
}

/**
 * Gets the previous page number
 * @param currentPage - Current page number
 * @returns Previous page number or null if already on first page
 */
export function getPreviousPage(currentPage: number): number | null {
  return currentPage > 1 ? currentPage - 1 : null;
}

