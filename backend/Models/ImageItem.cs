using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ImageStoreApi.Models
{
    public class Image
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id {get; set; }

        [BsonElement("Name")]
        public string ImageName { get; set;}
    }
}