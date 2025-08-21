import { mockFetch, mockFetchError } from '../../core/testHelpers/mockFetch';
import propertyModel from '../models/property.model';
import { getAllProperties, getPropertyById, createProperty } from './property.service';

describe('Property Service', () => {
  describe('getAllProperties', () => {
    it('should return a list of properties', async () => {
      const mockFetchResponse = {
        properties: [
          { name: 'Property 1', address: 'Address 1' },
          { name: 'Property 2', address: 'Address 2' },
        ]
      };
      window.fetch = mockFetch(mockFetchResponse);
      
      const propertiesResponse = await getAllProperties();
      expect(propertiesResponse.properties).toBeInstanceOf(Array);
      expect(propertiesResponse.properties).toHaveLength(2);
      expect(propertiesResponse.properties[0]).toHaveProperty('name', 'Property 1');
    });
    
    it('should fetch endpoint with filter params', async () => {
      const mockFetchResponse = {
        properties: [
          { name: 'Property 1', address: 'Address 1' },
          { name: 'Property 2', address: 'Address 2' },
        ]
      };
      window.fetch = mockFetch(mockFetchResponse);
      const fetchSpy = jest.spyOn(global, 'fetch');
      const filters = { name: 'Property 1' };

      const propertiesResponse = await getAllProperties(filters);

      expect(propertiesResponse.properties).toBeInstanceOf(Array);
      expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('Properties/filtered?name=Property+1'));
    });

    it('should throw an error when fetch fails', async () => {
      window.fetch = mockFetchError();
      
      await expect(getAllProperties()).rejects.toThrow();
    });
  });

  describe('getPropertyById', () => {
    it('should return a property when given a valid ID', async () => {
      const propertyId = 'valid-id';
      const mockFetchResponse = { propertyId, name: 'Property 1', address: 'Address 1' };
      window.fetch = mockFetch(mockFetchResponse);

      const property = await getPropertyById(propertyId);

      expect(property).toHaveProperty('propertyId', propertyId);
    });

    it('should throw an error when given an invalid ID', async () => {
      window.fetch = mockFetchError();
      const propertyId = 'invalid-id';

      await expect(getPropertyById(propertyId)).rejects.toThrow();
    });
  });

  describe('createProperty', () => {
    it('should create a new property and return it', async () => {
      const newProperty = { idProperty: '1', name: 'new Property', address: 'Address 1', price: 100000 } as propertyModel;
      window.fetch = mockFetch(newProperty);

      const createdProperty = await createProperty(newProperty);

      expect(createdProperty).toHaveProperty('idProperty');
      expect(createdProperty).toHaveProperty('name', newProperty.name);
      expect(createdProperty).toHaveProperty('address', newProperty.address);
    });

    it('should throw an error when given invalid property data', async () => {
      window.fetch = mockFetchError();
      const invalidProperty = { name: '', address: '' } as propertyModel;
      await expect(createProperty(invalidProperty)).rejects.toThrow();
    });
  });
});
