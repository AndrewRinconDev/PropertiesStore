using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using PropertiesStore.Core.Interfaces;
using PropertiesStore.Infrastructure.Settings;

namespace PropertiesStore.Infrastructure.Data
{
    public class MongoDbContext : IMongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IOptions<MongoDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);

            // Configure indexes after initializing the database
            ConfigureIndexes();
        }

        public IMongoCollection<T> GetCollection<T>(string name)
        {
            return _database.GetCollection<T>(name);
        }

        private void ConfigureIndexes()
        {
            try
            {
                // Basic indexes for Properties
                var propertiesCollection = _database.GetCollection<BsonDocument>("Properties");
                var propertiesIndexes = new[]
                {
                    new CreateIndexModel<BsonDocument>(
                        Builders<BsonDocument>.IndexKeys.Ascending("Name"),
                        new CreateIndexOptions { Background = true }
                    ),
                    new CreateIndexModel<BsonDocument>(
                        Builders<BsonDocument>.IndexKeys.Ascending("Address"),
                        new CreateIndexOptions { Background = true }
                    ),
                    new CreateIndexModel<BsonDocument>(
                        Builders<BsonDocument>.IndexKeys.Ascending("Price"),
                        new CreateIndexOptions { Background = true }
                    ),
                    new CreateIndexModel<BsonDocument>(
                        Builders<BsonDocument>.IndexKeys.Ascending("IdOwner"),
                        new CreateIndexOptions { Background = true }
                    ),
                    new CreateIndexModel<BsonDocument>(
                        Builders<BsonDocument>.IndexKeys.Ascending("Year"),
                        new CreateIndexOptions { Background = true }
                    )
                };
                propertiesCollection.Indexes.CreateMany(propertiesIndexes);

                // Basic indexes for Owners
                var ownersCollection = _database.GetCollection<BsonDocument>("Owners");
                var ownersIndexes = new[]
                {
                    new CreateIndexModel<BsonDocument>(
                        Builders<BsonDocument>.IndexKeys.Ascending("IdOwner"),
                        new CreateIndexOptions { Background = true, Unique = true }
                    )
                };
                ownersCollection.Indexes.CreateMany(ownersIndexes);

                // Basic indexes for PropertyImages
                var propertyImagesCollection = _database.GetCollection<BsonDocument>("PropertyImages");
                var propertyImagesIndexes = new[]
                {
                    new CreateIndexModel<BsonDocument>(
                        Builders<BsonDocument>.IndexKeys.Ascending("IdProperty"),
                        new CreateIndexOptions { Background = true }
                    ),
                    new CreateIndexModel<BsonDocument>(
                        Builders<BsonDocument>.IndexKeys.Ascending("Enabled"),
                        new CreateIndexOptions { Background = true }
                    )
                };
                propertyImagesCollection.Indexes.CreateMany(propertyImagesIndexes);

                // Basic indexes for PropertyTraces
                var propertyTracesCollection = _database.GetCollection<BsonDocument>("PropertyTraces");
                var propertyTracesIndexes = new[]
                {
                    new CreateIndexModel<BsonDocument>(
                        Builders<BsonDocument>.IndexKeys.Ascending("IdProperty"),
                        new CreateIndexOptions { Background = true }
                    ),
                    new CreateIndexModel<BsonDocument>(
                        Builders<BsonDocument>.IndexKeys.Ascending("DateSale"),
                        new CreateIndexOptions { Background = true }
                    )
                };
                propertyTracesCollection.Indexes.CreateMany(propertyTracesIndexes);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error configuring MongoDB indexes: {ex.Message}");
            }
        }
    }
}
