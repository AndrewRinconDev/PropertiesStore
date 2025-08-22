import React from 'react';

import { paginationModel } from '@/app/properties/models/property.model';
import { generatePageNumbers, calculatePageRange } from '../../utilities/pagination/pagination.utils';

interface PaginationProps {
  pagination: paginationModel;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: string) => void;
  currentPage: number;
  currentPageSize: string;
}

const Pagination: React.FC<PaginationProps> = ({ pagination, onPageChange, onPageSizeChange, currentPage, currentPageSize }) => {
  const { page, totalPages, totalCount, pageSize } = pagination;
  
  const { startItem, endItem } = calculatePageRange(page, pageSize, totalCount);
  const pageNumbers = generatePageNumbers({ currentPage, totalPages });

  const pageSizeOptions = [3, 5, 10, 25, 50];

  return (
    <div className="w-full px-4 py-3 sm:px-6">
      {/* Mobile version - 2 rows */}
      <div className="sm:hidden space-y-3">
        {/* Row 1: Showing info and page size selector */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            <span className="font-medium">{startItem}-{endItem}</span> of{' '}
            <span className="font-medium">{totalCount}</span>
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="pageSize" className="text-sm text-gray-700">
              Show:
            </label>
            <select
              id="pageSize"
              value={currentPageSize}
              onChange={(e) => onPageSizeChange(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#292f86] focus:border-[#292f86]"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size.toString()}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Row 2: Navigation buttons */}
        <div className="flex items-center justify-center">
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-medium text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      </div>

      {/* Desktop version - single row with justify-between */}
      <div className="hidden sm:flex sm:items-center sm:justify-between w-full">
        {/* Left: Showing info */}
        <div className="flex items-center">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startItem}</span> to{' '}
            <span className="font-medium">{endItem}</span> of{' '}
            <span className="font-medium">{totalCount}</span> results
          </p>
        </div>
        
        {/* Center: Pagination numbers */}
        <div className="flex items-center">
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
            </button>
            
            {pageNumbers.map((pageNum, index) => (
              <button
                key={index}
                onClick={() => pageNum.isClickable && typeof pageNum.value === 'number' ? onPageChange(pageNum.value) : undefined}
                disabled={!pageNum.isClickable}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  pageNum.isCurrent
                    ? 'z-10 bg-[#292f86] text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#292f86]'
                    : !pageNum.isClickable
                    ? 'text-gray-700 cursor-default'
                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus-visible:outline-offset-0'
                }`}
              >
                {pageNum.value}
              </button>
            ))}
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#292f86]"
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l4.5-4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
        
        {/* Right: Page size selector */}
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <label htmlFor="pageSize" className="text-sm text-gray-700">
              Show:
            </label>
            <select
              id="pageSize"
              value={currentPageSize}
              onChange={(e) => onPageSizeChange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#292f86] focus:border-[#292f86]"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size.toString()}>
                  {size}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-700">per page</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
