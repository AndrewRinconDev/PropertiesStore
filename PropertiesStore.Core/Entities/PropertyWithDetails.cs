using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PropertiesStore.Core.Entities
{
    public class PropertyWithDetails
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("idProperty")]
        public string IdProperty { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string CodeInternal { get; set; } = string.Empty;
        public int Year { get; set; }
        public string IdOwner { get; set; } = string.Empty;
        public Owner Owner { get; set; } = new();
        public List<PropertyImage> Images { get; set; } = new();
        public List<PropertyTrace> Traces { get; set; } = new();
    }
}
