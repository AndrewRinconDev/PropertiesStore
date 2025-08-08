using MongoDB.Bson;
using MongoDB.Driver;
using PropertiesStore.Core.Entities;
using PropertiesStore.Core.Interfaces;

namespace PropertiesStore.Infrastructure.Repositories
{
    public class PropertyRepository : IPropertyRepository
    {

        private readonly IMongoDbContext _context;

        public PropertyRepository(IMongoDbContext context)
        {
            _context = context;
        }
        public async Task<(List<Property>, int)> GetPropertiesAsync(int page, int pageSize)
        {
            var count = await _context.GetCollection<Property>("Properties").CountDocumentsAsync(_ => true);
            var properties = await _context.GetCollection<Property>("Properties")
                .Find(_ => true)
                .Skip((page - 1) * pageSize)
                .Limit(pageSize)
                .ToListAsync();

            return (properties, (int)count);
        }

        public async Task<(List<Property>, int)> GetFilteredPropertiesAsync(
            string name,
            string address,
            decimal? minPrice,
            decimal? maxPrice,
            int page,
            int pageSize)
        {
            var filter = Builders<Property>.Filter.Empty;

            if (!string.IsNullOrEmpty(name))
            {
                filter = Builders<Property>.Filter.And(filter,
                    Builders<Property>.Filter.Regex(x => x.Name, new BsonRegularExpression(name, "i")));
            }

            if (!string.IsNullOrEmpty(address))
            {
                filter = Builders<Property>.Filter.And(filter,
                    Builders<Property>.Filter.Regex(x => x.Address, new BsonRegularExpression(address, "i")));
            }

            if (minPrice.HasValue)
            {
                filter = Builders<Property>.Filter.And(filter,
                    Builders<Property>.Filter.Gte(x => x.Price, minPrice.Value));
            }

            if (maxPrice.HasValue)
            {
                filter = Builders<Property>.Filter.And(filter,
                    Builders<Property>.Filter.Lte(x => x.Price, maxPrice.Value));
            }

            var count = await _context.GetCollection<Property>("Properties").CountDocumentsAsync(filter);
            var properties = await _context.GetCollection<Property>("Properties")
                .Find(filter)
                .Skip((page - 1) * pageSize)
                .Limit(pageSize)
                .ToListAsync();

            return (properties, (int)count);
        }

        public async Task<Property> GetPropertyByIdAsync(string id)
        {
            return await _context.GetCollection<Property>("Properties").Find(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task AddPropertyAsync(Property property)
        {
            await _context.GetCollection<Property>("Properties").InsertOneAsync(property);
        }

        public async Task UpdatePropertyAsync(Property property)
        {
            await _context.GetCollection<Property>("Properties").ReplaceOneAsync(p => p.Id == property.Id, property);
        }

        public async Task DeletePropertyAsync(string id)
        {
            await _context.GetCollection<Property>("Properties").DeleteOneAsync(p => p.Id == id);
        }    
    }
}
