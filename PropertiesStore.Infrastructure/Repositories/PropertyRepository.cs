using MongoDB.Bson;
using MongoDB.Bson.Serialization;
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
                BuildLookupStage("Owners", "IdOwner", "IdOwner", "Owner"),
                BuildLookupStage("PropertyImages", "IdProperty", "IdProperty", "Images"),
                BuildLookupStage("PropertyTraces", "IdProperty", "IdProperty", "Traces"),
                BuildAddFieldsStage(),
                BuildFacetStage(page, pageSize)
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
                BuildLookupStage("Owners", "IdOwner", "IdOwner", "Owner"),
                BuildLookupStage("PropertyImages", "IdProperty", "IdProperty", "Images"),
                BuildLookupStage("PropertyTraces", "IdProperty", "IdProperty", "Traces"),
                BuildAddFieldsStage()
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

        private static BsonDocument BuildAddFieldsStage()
        {
            return new BsonDocument("$addFields", new BsonDocument
            {
                { "Owner", new BsonDocument("$arrayElemAt", new BsonArray { "$Owner", 0 }) },
                { "Images", new BsonDocument("$filter", new BsonDocument
                    {
                        { "input", "$Images" },
                        { "cond", new BsonDocument("$eq", new BsonArray { "$$this.Enabled", true }) }
                    })
                }
            });
        }

        private static BsonDocument BuildFacetStage(int page, int pageSize)
        {
            return new BsonDocument("$facet", new BsonDocument
            {
                { "data", new BsonArray
                    {
                        new BsonDocument("$skip", (page - 1) * pageSize),
                        new BsonDocument("$limit", pageSize)
                    }
                },
                { "totalCount", new BsonArray
                    {
                        new BsonDocument("$count", "count")
                    }
                }
            });
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
            var result = await _context.GetCollection<Property>("Properties")
                .AggregateAsync<BsonDocument>(pipeline);
            var resultList = await result.ToListAsync();

            var data = resultList.FirstOrDefault()?.GetValue("data").AsBsonArray ?? new BsonArray();
            var totalCount = resultList.FirstOrDefault()?.GetValue("totalCount").AsBsonArray?.FirstOrDefault()?.AsBsonDocument?.GetValue("count").AsInt32 ?? 0;

            var properties = data.Select(doc => BsonSerializer.Deserialize<PropertyWithDetails>(doc.AsBsonDocument)).ToList();

            return (properties, totalCount);
        }

        #endregion
    }
}
