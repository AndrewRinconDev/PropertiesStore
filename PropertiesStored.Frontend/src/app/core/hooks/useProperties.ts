import { useState, useEffect } from "react";
import { getAllProperties } from "../../properties/services/property.service";
import propertyModel, { paginationModel } from "../../properties/models/property.model";
import { PAGINATION_CONSTANTS, FILTER_CONSTANTS } from "../constants/pagination.constants";
import { PropertyFilter } from "../types/property.types";
import { createUpdatedFilter, createEmptyPagination } from "../utilities/property/property.utils";

export const useProperties = () => {
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

  const getFilteredProperties = async (page: number = PAGINATION_CONSTANTS.DEFAULT_PAGE, pageSize: string = filter.pageSize) => {
    if (initialLoad) {
      setInitialLoad(false);
    }
    setLoading(true);
    const updatedFilter = createUpdatedFilter(filter, page, pageSize);
    
    try {
      const propertiesResponse = await getAllProperties(updatedFilter);
      
      setProperties(propertiesResponse.properties);
      setPagination(propertiesResponse.pagination);
      setFilter(updatedFilter);
    } catch (error) {
      console.error('Error fetching properties:', error);
      // Set empty properties on error to prevent infinite loading
      setProperties([]);
      setPagination(createEmptyPagination());
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    getFilteredProperties(page);
  };

  const handlePageSizeChange = (newPageSize: string) => {
    getFilteredProperties(PAGINATION_CONSTANTS.DEFAULT_PAGE, newPageSize);
  };

  const resetFilters = () => {
    setFilter(FILTER_CONSTANTS.DEFAULT_FILTER);
    getFilteredProperties(PAGINATION_CONSTANTS.DEFAULT_PAGE, FILTER_CONSTANTS.DEFAULT_FILTER.pageSize);
  };

  useEffect(() => {
    getFilteredProperties(PAGINATION_CONSTANTS.DEFAULT_PAGE);
  }, []); // Empty dependency array to only run on mount

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
    resetFilters,
  };
};
