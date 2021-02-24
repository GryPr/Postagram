using System;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ImageStoreApi.Models
{

    public class Comment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string CreatorUserId { get; set; }

        public string CreatorName { get; set; }

        public DateTime CreatedOn { get; set; }

        public ObjectId ImageId { get; set; }

        public string CommentContent { get; set; }

    }
}