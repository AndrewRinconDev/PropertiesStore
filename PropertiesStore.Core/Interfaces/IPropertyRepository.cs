using MongoDB.Bson;
using MongoDB.Driver;
using PropertiesStore.Core.Entities;

namespace PropertiesStore.Core.Interfaces
{
    public interface IPropertyRepository
    {
        Task<(List<Property>, int)> GetPropertiesAsync(int page, int pageSize);
        Task<(List<Property>, int)> GetFilteredPropertiesAsync(
            string? name, string? address, decimal? minPrice, decimal? maxPrice, int page, int pageSize);
        Task<Property> GetPropertyByIdAsync(string id);
        Task<(List<PropertyWithDetails>, int)> GetPropertiesWithDetailsAsync(int page, int pageSize);
        Task<(List<PropertyWithDetails>, int)> GetFilteredPropertiesWithDetailsAsync(
            string name, string address, decimal? minPrice, decimal? maxPrice, int page, int pageSize);
        Task<PropertyWithDetails> GetPropertyWithDetailsByIdAsync(string id);
    }
}
