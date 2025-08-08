using MongoDB.Driver;
using PropertiesStore.Core.Entities;
using PropertiesStore.Core.Interfaces;

namespace PropertiesStore.Infrastructure.Repositories
{
    public class PropertyImageRepository : IPropertyImageRepository
    {
        private readonly IMongoDbContext _context;

        public PropertyImageRepository(IMongoDbContext context)
        {
            _context = context;
        }

        public async Task<List<PropertyImage>> GetImagesByPropertyIdAsync(string idProperty)
        {
            return await _context.GetCollection<PropertyImage>("PropertyImages").Find(o => o.IdProperty == idProperty).ToListAsync();
        }
    }
}
