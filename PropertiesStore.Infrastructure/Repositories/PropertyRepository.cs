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

        public async Task<(List<PropertyWithDetails>, int)> GetPropertiesWithDetailsAsync(int page, int pageSize)
        {
            var pipeline = BuildBasePipeline(page, pageSize);
            return await ExecuteAggregationPipeline(pipeline);
        }

        public async Task<(List<PropertyWithDetails>, int)> GetFilteredPropertiesWithDetailsAsync(
            string name, string address, decimal? minPrice, decimal? maxPrice, int page, int pageSize)
        {
            var pipeline = BuildFilteredPipeline(name, address, minPrice, maxPrice, page, pageSize);
            return await ExecuteAggregationPipeline(pipeline);
        }

        public async Task<PropertyWithDetails> GetPropertyWithDetailsByIdAsync(string id)
        {
            var pipeline = BuildSinglePropertyPipeline(id);
            var result = await _context.GetCollection<Property>("Properties")
                .AggregateAsync<PropertyWithDetails>(pipeline);
            return await result.FirstOrDefaultAsync();
        }

        #region Private Methods
        private static BsonDocument[] BuildBasePipeline(int page, int pageSize)
        {
            return
            [
                BuildLimitedLookupStage("Owners", "IdOwner", "IdOwner", "Owner", 1),
                BuildLimitedLookupStage("PropertyImages", "IdProperty", "IdProperty", "Images", 20),
                BuildLimitedLookupStage("PropertyTraces", "IdProperty", "IdProperty", "Traces", 10),
                BuildAddFieldsStage(),
                BuildDocumentSizeValidation(),
                new BsonDocument("$skip", (page - 1) * pageSize),
                new BsonDocument("$limit", pageSize)
            ];
        }

        private static BsonDocument[] BuildFilteredPipeline(
            string name, string address, decimal? minPrice, decimal? maxPrice, int page, int pageSize)
        {
            var pipeline = new List<BsonDocument>();

            var matchFilter = BuildMatchFilter(name, address, minPrice, maxPrice);
            if (matchFilter.ElementCount > 0)
            {
                pipeline.Add(new BsonDocument("$match", matchFilter));
            }

            pipeline.AddRange(BuildBasePipeline(page, pageSize));
            return pipeline.ToArray();
        }

        private static BsonDocument[] BuildSinglePropertyPipeline(string id)
        {
            return
            [
                new BsonDocument("$match", new BsonDocument("_id", new ObjectId(id))),
                BuildLimitedLookupStage("Owners", "IdOwner", "IdOwner", "Owner", 1),
                BuildLimitedLookupStage("PropertyImages", "IdProperty", "IdProperty", "Images", 50),
                BuildLimitedLookupStage("PropertyTraces", "IdProperty", "IdProperty", "Traces", 20),
                BuildAddFieldsStage(),
                BuildDocumentSizeValidation()
            ];
        }

        private static BsonDocument BuildLookupStage(string from, string localField, string foreignField, string asField)
        {
            return new BsonDocument("$lookup", new BsonDocument
            {
                { "from", from },
                { "localField", localField },
                { "foreignField", foreignField },
                { "as", asField }
            });
        }

        private static BsonDocument BuildLimitedLookupStage(string from, string localField, string foreignField, string asField, int limit)
        {
            return new BsonDocument("$lookup", new BsonDocument
            {
                { "from", from },
                { "localField", localField },
                { "foreignField", foreignField },
                { "as", asField },
                { "pipeline", new BsonArray
                    {
                        new BsonDocument("$limit", limit)
                    }
                }
            });
        }

        private static BsonDocument BuildAddFieldsStage()
        {
            return new BsonDocument("$addFields", new BsonDocument
            {
                { "Owner", new BsonDocument("$arrayElemAt", new BsonArray { "$Owner", 0 }) },
                { "Images", new BsonDocument("$filter", new BsonDocument
                    {
                        { "input", new BsonDocument("$slice", new BsonArray { "$Images", 10 }) }, // Limit to 10 images
                        { "cond", new BsonDocument("$eq", new BsonArray { "$$this.Enabled", true }) }
                    })
                },
                { "Traces", new BsonDocument("$slice", new BsonArray { "$Traces", 5 }) } // Limit to 5 traces
            });
        }

        private static BsonDocument BuildDocumentSizeValidation()
        {
            return new BsonDocument("$match", new BsonDocument("$expr", new BsonDocument("$lt", new BsonArray 
                { 
                    new BsonDocument("$bsonSize", "$$ROOT"), 
                    15000000 // 15MB limit (leaving 1MB buffer)
                })));
        }

        private static BsonDocument BuildMatchFilter(string name, string address, decimal? minPrice, decimal? maxPrice)
        {
            var filter = new BsonDocument();

            if (!string.IsNullOrEmpty(name))
            {
                filter.Add("Name", new BsonRegularExpression(name, "i"));
            }

            if (!string.IsNullOrEmpty(address))
            {
                filter.Add("Address", new BsonRegularExpression(address, "i"));
            }

            if (minPrice.HasValue || maxPrice.HasValue)
            {
                var priceFilter = new BsonDocument();
                if (minPrice.HasValue)
                    priceFilter.Add("$gte", minPrice.Value);
                if (maxPrice.HasValue)
                    priceFilter.Add("$lte", maxPrice.Value);
                filter.Add("Price", priceFilter);
            }

            return filter;
        }

        private async Task<(List<PropertyWithDetails>, int)> ExecuteAggregationPipeline(BsonDocument[] pipeline)
        {
            // Get the data with pagination
            var dataResult = await _context.GetCollection<Property>("Properties")
                .AggregateAsync<PropertyWithDetails>(pipeline);
            var properties = await dataResult.ToListAsync();

            // Get total count separately to avoid $facet limit
            var countPipeline = BuildCountPipeline(pipeline);
            var countResult = await _context.GetCollection<Property>("Properties")
                .AggregateAsync<BsonDocument>(countPipeline);
            var countDoc = await countResult.FirstOrDefaultAsync();
            var totalCount = countDoc?.GetValue("count").AsInt32 ?? 0;

            return (properties, totalCount);
        }

        private static BsonDocument[] BuildCountPipeline(BsonDocument[] dataPipeline)
        {
            var countPipeline = new List<BsonDocument>();
            
            // Remove pagination stages and add count
            foreach (var stage in dataPipeline)
            {
                if (stage.Contains("$skip") || stage.Contains("$limit"))
                    continue;
                countPipeline.Add(stage);
            }
            
            countPipeline.Add(new BsonDocument("$count", "count"));
            return countPipeline.ToArray();
        }

        #endregion
    }
}
