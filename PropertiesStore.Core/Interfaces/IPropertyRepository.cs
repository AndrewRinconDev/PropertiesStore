using PropertiesStore.Core.Entities;

namespace PropertiesStore.Core.Interfaces
{
    public interface IPropertyRepository
    {
        Task<(List<Property>, int)> GetPropertiesAsync(int page, int pageSize);
        Task<(List<Property>, int)> GetFilteredPropertiesAsync(
            string name,
            string address,
            decimal? minPrice,
            decimal? maxPrice,
            int page,
            int pageSize);
        Task<Property> GetPropertyByIdAsync(string id);
        Task AddPropertyAsync(Property property);
        Task UpdatePropertyAsync(Property property);
        Task DeletePropertyAsync(string id);
    }
}
