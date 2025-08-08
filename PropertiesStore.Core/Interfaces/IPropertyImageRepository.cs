using PropertiesStore.Core.Entities;

namespace PropertiesStore.Core.Interfaces
{
    public interface IPropertyImageRepository
    {
        Task<List<PropertyImage>> GetImagesByPropertyIdAsync(string idProperty);
    }
}
