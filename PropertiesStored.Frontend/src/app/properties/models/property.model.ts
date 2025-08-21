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
  enable: boolean;
}

export interface propertyTraceModel {
  idPropertyTrace: string;
  dateSale: string;
  name: string;
  value: number;
  tax: string;
}

interface propertyModel {
  idProperty: string;
  name: string;
  address: string;
  price: number;
  codeInternational: string;
  year: number;
  owner: ownerModel;
  propertyImages: propertyImageModel[];
  propertyTraces: propertyTraceModel[];
}

export default propertyModel;