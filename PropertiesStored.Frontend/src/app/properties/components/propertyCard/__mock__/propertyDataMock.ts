import propertyModel from "@/app/properties/models/property.model";

export const propertyDataMock = {
  idProperty: '1',
  codeInternational: 'US',
  year: 2021,
  name: 'Beautiful House',
  address: '123 Main St',
  price: 1000000,
  propertyImages: [{
    idPropertyImage: 'property-image-1',
    file: '/house.jpg',
    enable: true,
  }],
  owner: {
    name: 'John Doe',
    photo: '/owner.jpg',
  },
  propertyTraces: [
    {
      idPropertyTrace: '1',
      date: '2021-01-01',
      value: 1000000,
    }
  ]
} as unknown as propertyModel;
