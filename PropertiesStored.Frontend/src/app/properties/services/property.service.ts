import { API_BASE_URL } from "../../core/constants/global";

import propertyModel, { propertyResponseModel } from "../models/property.model";

const apiUrl = `${API_BASE_URL}/Properties`;

// Simple cache for properties
const propertiesCache = new Map<string, { data: propertyResponseModel; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getAllProperties = async (filters?: Record<string, string>): Promise<propertyResponseModel> => {
  const queryParams = new URLSearchParams();
  
  // Add filters
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.trim() !== '') {
        queryParams.append(key, value);
      }
    });
  }
  
  // Add pagination parameters
  if (filters?.page) {
    queryParams.append('page', filters.page);
  }
  if (filters?.pageSize) {
    queryParams.append('pageSize', filters.pageSize);
  }
  
  const query = queryParams.toString();
  const cacheKey = query || 'default';
  
  // Check cache first
  const cached = propertiesCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  try {
    const response = await fetch(`${apiUrl}/filtered?${query}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    const data = await response.json();
    
    // Cache the result
    propertiesCache.set(cacheKey, { data, timestamp: Date.now() });
    
    return data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

export const getPropertyById = async (id?: string | string[]): Promise<propertyModel | null> => {
  if (!id) return null;
  
  const cacheKey = `property-${id}`;
  const cached = propertiesCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as unknown as propertyModel;
  }
  
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    const data = await response.json();
    
    // Cache the result
    propertiesCache.set(cacheKey, { data, timestamp: Date.now() });
    
    return data;
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    throw error;
  }
};

export const createProperty = async (property: propertyModel): Promise<propertyModel | null> => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(property),
    });
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    const data = await response.json();
    
    // Clear cache after creating new property
    propertiesCache.clear();
    
    return data;
  } catch (error) {
    console.error('Error creating property:', error);
    throw error;
  }
};
