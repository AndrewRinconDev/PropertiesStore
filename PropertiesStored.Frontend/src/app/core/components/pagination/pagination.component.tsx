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
    <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-6">
      {/* Mobile version - 2 rows */}
      <div className="sm:hidden space-y-4">
        {/* Row 1: Showing info and page size selector */}
        <div className="flex items-center justify-between bg-slate-50 rounded-lg p-4">
          <p className="text-sm text-slate-700">
            <span className="font-semibold text-blue-600">{startItem}-{endItem}</span> of{' '}
            <span className="font-semibold text-slate-800">{totalCount}</span>
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="pageSize" className="text-sm text-slate-600 font-medium">
              Show:
            </label>
            <select
              id="pageSize"
              value={currentPageSize}
              onChange={(e) => onPageSizeChange(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
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
          <nav className="flex items-center gap-2" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              ← Previous
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              Next →
            </button>
          </nav>
        </div>
      </div>

      {/* Desktop version - single row with justify-between */}
      <div className="hidden sm:flex sm:items-center sm:justify-between w-full">
        {/* Left: Showing info */}
        <div className="flex items-center">
          <p className="text-sm text-slate-700 bg-slate-50 px-4 py-2 rounded-lg">
            Showing <span className="font-semibold text-blue-600">{startItem}</span> to{' '}
            <span className="font-semibold text-blue-600">{endItem}</span> of{' '}
            <span className="font-semibold text-slate-800">{totalCount}</span> results
          </p>
        </div>
        
        {/* Center: Pagination numbers */}
        <div className="flex items-center">
          <nav className="flex items-center gap-1" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  pageNum.isCurrent
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                    : !pageNum.isClickable
                    ? 'text-slate-400 cursor-default'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {pageNum.value}
              </button>
            ))}
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-lg">
            <label htmlFor="pageSize" className="text-sm text-slate-700 font-medium">
              Show:
            </label>
            <select
              id="pageSize"
              value={currentPageSize}
              onChange={(e) => onPageSizeChange(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size.toString()}>
                  {size}
                </option>
              ))}
            </select>
            <span className="text-sm text-slate-600">per page</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
