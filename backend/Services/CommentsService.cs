using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using ImageStoreApi.Models;
using Microsoft.AspNetCore.Http;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace ImageStoreApi.Services
{
    public class CommentsService
    {
        private readonly IMongoCollection<Image> _images;

        public CommentsService(IImageDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _images = database.GetCollection<Image>(settings.ImageCollectionName);
        }

        // Create an image
        public Comment Create(string imageId, string comment)
        {

            return null;
        }

    }

}