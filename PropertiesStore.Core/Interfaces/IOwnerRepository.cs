using PropertiesStore.Core.Entities;

namespace PropertiesStore.Core.Interfaces
{
    public interface IOwnerRepository
    {
        Task<Owner> GetOwnerByOwnerIdAsync(string ownerId);
    }
}
