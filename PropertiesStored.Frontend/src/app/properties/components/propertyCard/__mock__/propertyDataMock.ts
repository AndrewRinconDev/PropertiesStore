import propertyModel from "@/app/properties/models/property.model";

export const propertyDataMock = {
  id: '1',
  idProperty: '1',
  codeInternal: 'US',
  year: 2021,
  name: 'Beautiful House',
  address: '123 Main St',
  price: 1000000,
  images: [{
    idPropertyImage: 'property-image-1',
    file: '/house.jpg',
    enabled: true,
  }],
  owner: {
    name: 'John Doe',
    photo: '/owner.jpg',
  },
  traces: [
    {
      idPropertyTrace: '1',
      date: '2021-01-01',
      value: 1000000,
    }
  ]
} as unknown as propertyModel;


