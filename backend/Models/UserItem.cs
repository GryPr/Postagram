using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ImageStoreApi.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Email")]
        public string Email { get; set; }
    }
}