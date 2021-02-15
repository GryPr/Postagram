using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ImageStoreApi.Models
{
    public class ImageData
    {
        public string ImageDescription { get; set; }
        public byte[] ImageContent { get; set; }
    }
    public class Image
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string CreatorUserId { get; set; }


        public DateTime CreatedOn { get; set; }

        // Image
        public ImageData ImageData { get; set; }
    }
}