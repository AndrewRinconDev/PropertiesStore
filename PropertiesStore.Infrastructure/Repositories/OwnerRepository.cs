using MongoDB.Driver;
using PropertiesStore.Core.Entities;
using PropertiesStore.Core.Interfaces;
using PropertiesStore.Infrastructure.Data;

namespace PropertiesStore.Infrastructure.Repositories
{
    public class OwnerRepository : IOwnerRepository
    {
        private readonly IMongoDbContext _context;

        public OwnerRepository(IMongoDbContext context)
        {
            _context = context;
        }

        public async Task<Owner> GetOwnerByIdOwnerAsync(string idOwner)
        {
            return await _context.GetCollection<Owner>("Owners").Find(o => o.IdOwner == idOwner).FirstOrDefaultAsync();
        }
    }
}
