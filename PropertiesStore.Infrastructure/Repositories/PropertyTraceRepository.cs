using MongoDB.Driver;
using PropertiesStore.Core.Entities;
using PropertiesStore.Core.Interfaces;

namespace PropertiesStore.Infrastructure.Repositories
{
    public class PropertyTraceRepository : IPropertyTraceRepository
    {
        private readonly IMongoDbContext _context;

        public PropertyTraceRepository(IMongoDbContext context)
        {
            _context = context;
        }

        public async Task<List<PropertyTrace>> GetTracesByPropertyIdAsync(string idProperty)
        {
            return await _context.GetCollection<PropertyTrace>("PropertyTraces").Find(o => o.IdProperty == idProperty).ToListAsync();
        }
    }
}
