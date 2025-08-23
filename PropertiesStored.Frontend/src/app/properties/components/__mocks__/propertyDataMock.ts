import propertyModel from "../../models/property.model";
import { IPropertyDescription } from "../propertyDescription/propertyDescription.interface";

export const mockPropertyData: propertyModel = {
  id: '1',
  idProperty: 'prop1',
  name: 'Test Property',
  address: '123 Test St',
  price: 100000,
  codeInternal: 'TP001',
  year: 2020,
  owner: {
    idOwner: 'owner1',
    name: 'Test Owner',
    address: 'Owner Address',
    photo: '/owner1.jpg',
    birthday: '1980-01-01'
  },
  images: [
    { idPropertyImage: 'img1', file: '/test1.jpg', enabled: true },
    { idPropertyImage: 'img2', file: '/test2.jpg', enabled: true }
  ],
  traces: []
};

export const mockLuxuryVilla: propertyModel = {
  id: '2',
  idProperty: 'prop2',
  name: 'Luxury Villa',
  address: 'Beverly Hills, CA',
  price: 500000,
  codeInternal: 'LV001',
  year: 2023,
  owner: {
    idOwner: 'owner2',
    name: 'John Doe',
    address: 'Beverly Hills Address',
    photo: '/john.jpg',
    birthday: '1975-05-15'
  },
  images: [
    { idPropertyImage: 'img3', file: '/luxury1.jpg', enabled: true },
    { idPropertyImage: 'img4', file: '/luxury2.jpg', enabled: true },
    { idPropertyImage: 'img5', file: '/luxury3.jpg', enabled: true }
  ],
  traces: []
};

export const mockPropertyDescription = {
  name: 'Luxury Villa',
  address: 'Beverly Hills, CA',
  codeInternal: 'US',
  year: 2021,
  price: 1000000,
  owner: {
    name: 'John Doe',
    photo: '/owner.jpg',
  },
} as IPropertyDescription;
