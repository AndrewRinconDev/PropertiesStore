using PropertiesStored.Application.DTOs;

namespace PropertiesStored.Application.Interfaces
{
    public interface IPropertyService
    {
        Task<PropertyListDto> GetAllPropertiesAsync(int page, int pageSize);
        Task<PropertyListDto> GetFilteredPropertiesAsync(
            string? name, string? address, decimal? minPrice, decimal? maxPrice, int page, int pageSize); 
        Task<PropertyDto?> GetPropertyByIdAsync(string id);
        Task<PropertyWithDetailsListDto> GetPropertiesWithDetailsAsync(int page, int pageSize);
        Task<PropertyWithDetailsListDto> GetFilteredPropertiesWithDetailsAsync(
            string name, string address, decimal? minPrice, decimal? maxPrice, int page, int pageSize);
        Task<PropertyWithDetailsDto?> GetPropertyWithDetailsByIdAsync(string id);
    }
}
