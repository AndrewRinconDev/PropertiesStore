using PropertiesStore.Core.Entities;

namespace PropertiesStore.Core.Interfaces
{
    public interface IPropertyRepository
    {
        Task<(List<PropertyWithDetails>, int)> GetPropertiesWithDetailsAsync(int page, int pageSize);
        Task<(List<PropertyWithDetails>, int)> GetFilteredPropertiesWithDetailsAsync(
            string name, string address, decimal? minPrice, decimal? maxPrice, int page, int pageSize);
        Task<PropertyWithDetails> GetPropertyWithDetailsByIdAsync(string id);
    }
}
