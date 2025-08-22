export interface PropertyFilter {
  name: string;
  address: string;
  minPrice: string;
  maxPrice: string;
  page: string;
  pageSize: string;
}

import propertyModel from "../../properties/models/property.model";
import { paginationModel } from "../../properties/models/property.model";

export interface PropertyListProps {
  properties: propertyModel[];
  loading: boolean;
  pagination: paginationModel;
  filter: PropertyFilter;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: string) => void;
}
