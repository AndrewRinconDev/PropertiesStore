export interface ownerModel {
  idOwner: string;
  name: string;
  address: string;
  photo: string;
  birthday: string;
}

export interface propertyImageModel {
  idPropertyImage: string;
  file: string;
  enabled: boolean;
}

export interface propertyTraceModel {
  idPropertyTrace: string;
  dateSale: string;
  name: string;
  value: number;
  tax: string;
}

interface propertyModel {
  id: string;
  idProperty: string;
  name: string;
  address: string;
  price: number;
  codeInternal: string;
  year: number;
  owner: ownerModel;
  images: propertyImageModel[];
  traces: propertyTraceModel[];
}

export interface propertyResponseModel {
  properties: propertyModel[];
  pagination: paginationModel;
}

export interface paginationModel {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export default propertyModel;