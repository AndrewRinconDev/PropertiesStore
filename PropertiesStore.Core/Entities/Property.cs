using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PropertiesStore.Core.Entities
{
    public class Property
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("idProperty")]
        public string IdProperty { get; set; }

        public string Name { get; set; }
        public string Address { get; set; }
        public decimal Price { get; set; }
        public string CodeInternal { get; set; }
        public int Year { get; set; }
        public string IdOwner { get; set; }
    }
}
