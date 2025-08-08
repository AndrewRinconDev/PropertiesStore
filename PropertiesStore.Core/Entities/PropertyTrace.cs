using MongoDB.Bson.Serialization.Attributes;

namespace PropertiesStore.Core.Entities
{
    public class PropertyTrace
    {
        [BsonElement("idPropertyTrace")]
        public string IdPropertyImage { get; set; }

        [BsonElement("idProperty")]
        public string IdProperty { get; set; }

        public DateTime DateSale { get; set; }
        public string Name { get; set; }
        public decimal Value { get; set; }
        public decimal Tax { get; set; }
    }
}
