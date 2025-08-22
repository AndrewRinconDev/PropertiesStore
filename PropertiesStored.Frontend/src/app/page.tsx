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
    getFilteredProperties,
    handlePageChange,
    handlePageSizeChange,
  } = useProperties();

  // Show loading overlay only on initial load
  if (initialLoad) {
    return <LoadingOverlay />;
  }

  return (
    <div className={LAYOUT_CONSTANTS.CONTAINER.FLEX}>
      <PropertyFilters 
        filter={filter} 
        setFilter={setFilter} 
        getFilteredProperties={() => getFilteredProperties(1)} 
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
  );
}
