using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PropertiesStore.Core.Entities
{
    public class PropertyImage
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("idPropertyImage")]
        public string IdPropertyImage { get; set; } = string.Empty;

        [BsonElement("idProperty")]
        public string IdProperty { get; set; } = string.Empty;

        public string File { get; set; } = string.Empty;
        public bool Enabled { get; set; }
    }
}
