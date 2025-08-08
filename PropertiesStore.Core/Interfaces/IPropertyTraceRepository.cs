using PropertiesStore.Core.Entities;

namespace PropertiesStore.Core.Interfaces
{
    public interface IPropertyTraceRepository
    {
        Task<List<PropertyTrace>> GetTracesByPropertyIdAsync(string idProperty);
    }
}
