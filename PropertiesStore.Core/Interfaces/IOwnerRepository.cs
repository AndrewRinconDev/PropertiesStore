using PropertiesStore.Core.Entities;

namespace PropertiesStore.Core.Interfaces
{
    public interface IOwnerRepository
    {
        Task<Owner> GetOwnerByIdOwnerAsync(string idOwner);
    }
}
