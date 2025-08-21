import { API_BASE_URL } from "../../core/constants/global";

import propertyModel from "../models/property.model";

const apiUrl = `${API_BASE_URL}/Property`;

export const getAllProperties = async (filters?: Record<string, string>): Promise<propertyModel[]> => {
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(`${apiUrl}?${query}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getPropertyById = async (id?: string | string[]): Promise<propertyModel | null> => {
  const response = await fetch(`${apiUrl}/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const createProperty = async (property: propertyModel): Promise<propertyModel | null> => {
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
  return response.json();
};
