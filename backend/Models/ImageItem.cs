using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ImageStoreApi.Models
{
    public class Image
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string CreatorUserId { get; set; }

        public string ImageDescription { get; set; }

        // Image binary data
        public byte[] ImageContent { get; set; }
    }
}