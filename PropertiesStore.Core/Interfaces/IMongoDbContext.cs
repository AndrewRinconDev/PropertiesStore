using MongoDB.Driver;

namespace PropertiesStore.Core.Interfaces
{
    public interface IMongoDbContext
    {
        IMongoCollection<T> GetCollection<T>(string name);
    }
}
