'use client'
import LoadingOverlay from "./core/components/loadingOverlay/loadingOverlay.component";
import PropertyFilters from "./properties/components/propertyFilters/propertyFilters.component";
import PropertiesContainer from "./core/components/propertiesContainer/propertiesContainer.component";
import { useProperties } from "./core/hooks/useProperties";
import { LAYOUT_CONSTANTS } from "./core/constants/layout.constants";

export default function PropertiesPage() {
  const {
    properties,
    loading,
    initialLoad,
    pagination,
    filter,
    setFilter,
    handlePageChange,
    handlePageSizeChange,
    applyFilters,
  } = useProperties();

  // Show loading overlay only on initial load
  if (initialLoad) {
    return <LoadingOverlay />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
              🏠 Properties Store
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover your perfect property with our comprehensive search and modern interface
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={LAYOUT_CONSTANTS.CONTAINER.FLEX}>
        <PropertyFilters 
          filter={filter} 
          setFilter={setFilter} 
          applyFilters={applyFilters}
        />
        <PropertiesContainer
          properties={properties}
          loading={loading}
          pagination={pagination}
          filter={filter}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
}
