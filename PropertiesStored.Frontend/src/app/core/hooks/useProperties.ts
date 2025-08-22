import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { getAllProperties } from "../../properties/services/property.service";
import propertyModel, { paginationModel } from "../../properties/models/property.model";
import { PAGINATION_CONSTANTS, FILTER_CONSTANTS } from "../constants/pagination.constants";
import { PropertyFilter } from "../types/property.types";
import { createUpdatedFilter, createEmptyPagination } from "../utilities/property/property.utils";

export const useProperties = () => {
  // State management
  const [properties, setProperties] = useState<propertyModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [pagination, setPagination] = useState<paginationModel>({
    page: PAGINATION_CONSTANTS.DEFAULT_PAGE,
    pageSize: PAGINATION_CONSTANTS.DEFAULT_PAGE_SIZE,
    totalCount: 0,
    totalPages: 0,
  });
  const [filter, setFilter] = useState<PropertyFilter>(FILTER_CONSTANTS.DEFAULT_FILTER);

  // Use refs to store current values without causing re-renders
  const filterRef = useRef<PropertyFilter>(filter);
  const paginationRef = useRef<paginationModel>(pagination);

  // Update refs when state changes
  useEffect(() => {
    filterRef.current = filter;
  }, [filter]);

  useEffect(() => {
    paginationRef.current = pagination;
  }, [pagination]);

  // Core function to fetch properties with filters and pagination
  const getFilteredProperties = useCallback(async (
    page: number = PAGINATION_CONSTANTS.DEFAULT_PAGE, 
    pageSize: string = pagination.pageSize.toString()
  ) => {
    if (initialLoad) {
      setInitialLoad(false);
    }
    
    setLoading(true);
    // Use ref values to avoid dependency issues
    const currentFilter = filterRef.current;
    const updatedFilter = createUpdatedFilter(currentFilter, page, pageSize);
    
    try {
      const propertiesResponse = await getAllProperties(updatedFilter);
      setProperties(propertiesResponse.properties);
      setPagination(propertiesResponse.pagination);
      
      // Keep filter.pageSize in sync with pagination.pageSize
      if (propertiesResponse.pagination.pageSize !== paginationRef.current.pageSize) {
        setFilter(prev => ({ ...prev, pageSize: propertiesResponse.pagination.pageSize.toString() }));
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties([]);
      setPagination(createEmptyPagination());
    } finally {
      setLoading(false);
    }
  }, [initialLoad]); // Only depends on initialLoad

  // Memoized handlers that don't depend on filter changes
  const handlePageChange = useMemo(() => (page: number) => {
    getFilteredProperties(page, paginationRef.current.pageSize.toString());
  }, [getFilteredProperties]);

  const handlePageSizeChange = useMemo(() => (newPageSize: string) => {
    // Update the filter state to keep pageSize in sync
    setFilter(prev => ({ ...prev, pageSize: newPageSize }));
    getFilteredProperties(PAGINATION_CONSTANTS.DEFAULT_PAGE, newPageSize);
  }, [getFilteredProperties]);

  const applyFilters = useMemo(() => () => {
    // Reset to first page when applying filters, but keep current pageSize
    getFilteredProperties(PAGINATION_CONSTANTS.DEFAULT_PAGE, paginationRef.current.pageSize.toString());
  }, [getFilteredProperties]);

  const resetFilters = useMemo(() => () => {
    setFilter(FILTER_CONSTANTS.DEFAULT_FILTER);
    getFilteredProperties(PAGINATION_CONSTANTS.DEFAULT_PAGE, FILTER_CONSTANTS.DEFAULT_FILTER.pageSize);
  }, [getFilteredProperties]);

  // Initial load effect
  useEffect(() => {
    getFilteredProperties(PAGINATION_CONSTANTS.DEFAULT_PAGE);
  }, [getFilteredProperties]);

  return {
    properties,
    loading,
    initialLoad,
    pagination,
    filter,
    setFilter,
    getFilteredProperties,
    handlePageChange,
    handlePageSizeChange,
    applyFilters,
    resetFilters,
  };
};
