using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ImageStoreApi.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string UserId { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

        public string Email { get; set; }

        public int FollowerCount { get; set; }

        public string[] UsersFollowed { get; set; }
    }
}