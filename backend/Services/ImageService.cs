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
        public (Image, MemoryStream) Get(int index)
        {
            Image image = _images.Find(image => true).SortByDescending(e => e.CreatedOn).Limit(1).Skip(index).ToList()[0];
            MemoryStream fs = new MemoryStream();
            _bucket.DownloadToStream(image.ImageId, fs);
            return (image, fs);
        }

        // Create an image
        public Image Create(Image image)
        {


            _images.InsertOne(image);
            return image;
        }

        public Image Create(Stream fs, string ImageDescription, string userId, string userName, string fileName, string contentType)
        {
            var id = _bucket.UploadFromStream(fileName, fs);

            Image image = new Image
            {
                CreatorUserId = userId,
                CreatorName = userName,
                CreatedOn = DateTime.Now,
                ImageDescription = ImageDescription,
                FileName = fileName,
                ContentType = contentType,
                ImageId = id
            };
            _images.InsertOne(image);

            return image;

        }

    }

}