using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using ImageStoreApi.Models;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace ImageStoreApi.Services
{
    public class ImageService
    {
        private readonly IMongoCollection<Image> _images;
        private GridFSBucket _bucket;

        public ImageService(IImageDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _bucket = new GridFSBucket(database);

            _images = database.GetCollection<Image>(settings.ImageCollectionName);
        }

        // Get list of all images
        public List<Image> Get() =>
            _images.Find(image => true).ToList();

        // Get image with a specified object ID
        public Image Get(string id) =>
            _images.Find<Image>(image => image.Id == id).FirstOrDefault();

        // Get by descending order of creation date
        public List<Image> Get(int index, int length) =>
            _images.Find(image => true).SortByDescending(e => e.CreatedOn).Limit(length).Skip(index).ToList();

        // Create an image
        public Image Create(Image image)
        {


            _images.InsertOne(image);
            return image;
        }

        public Image Create(Stream fs, string ImageDescription, string userId, string extension)
        {
            Image image = new Image
            {
                CreatorUserId = userId,
                CreatedOn = DateTime.Now,
                ImageDescription = ImageDescription,
                ImageExtension = extension
            };
            _images.InsertOne(image);

            var id = _bucket.UploadFromStream(image.Id + extension, fs);

            return null;

        }

    }
}