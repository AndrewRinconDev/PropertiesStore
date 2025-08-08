using MongoDB.Bson.Serialization.Attributes;

namespace PropertiesStore.Core.Entities
{
    public class PropertyImage
    {
        [BsonElement("idPropertyImage")]
        public string IdPropertyImage { get; set; }

        [BsonElement("idProperty")]
        public string IdProperty { get; set; }

        public string FilePath { get; set; }
        public bool Enabled { get; set; }
    }
}
