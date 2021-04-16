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
    public class ImageService : IImageService
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

        public ImageService()
        {
        }

        // Get image with a specified object ID
        public Image Get(string id) =>
            _images.Find<Image>(image => image.Id == id).FirstOrDefault();


        // Get user images with a specified user ID
        public (List<Image>, List<String>) GetUserImages(string CreatorUserId)
        {
            List<Image> image = _images.Find(image => image.CreatorUserId == CreatorUserId).SortByDescending(e => e.CreatedOn).ToList();
            List<String> b64Files = new List<String>(image.Count);
            for (int i = 0; i < image.Count; i++)
            {
                System.Diagnostics.Debug.WriteLine(i);
                var fs = new MemoryStream();
                _bucket.DownloadToStream(image[i].ImageId, fs);
                b64Files.Add(Convert.ToBase64String(fs.ToArray()));
            }
            return (image, b64Files);
        }


        // Get by descending order of creation date
        public (Image, MemoryStream) Get(int index)
        {
            Image image = _images.Find(image => true).SortByDescending(e => e.CreatedOn).Limit(1).Skip(index).ToList()[0];
            MemoryStream fs = new MemoryStream();
            _bucket.DownloadToStream(image.ImageId, fs);
            return (image, fs);
        }

        // Get list of images by descending order
        public (List<Image>, List<String>) Get()
        {
            List<Image> image = _images.Find(image => true).SortByDescending(e => e.CreatedOn).ToList();
            List<String> b64Files = new List<String>(image.Count);
            for (int i = 0; i < image.Count; i++)
            {
                //File.AppendAllText(@"./log.txt", i + Environment.NewLine);
                System.Diagnostics.Debug.WriteLine(i);
                var fs = new MemoryStream();
                _bucket.DownloadToStream(image[i].ImageId, fs);
                b64Files.Add(Convert.ToBase64String(fs.ToArray()));
            }
            return (image, b64Files);
        }

        // Create an image
        public Image Create(Image image)
        {


            _images.InsertOne(image);
            return image;
        }

        // Adds an image from the data sent through the endpoint in ImageController
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

        // Adds a comment from the data send through the endpoint in ImageController
        public Comment AddComment(string ImageId, string CommentContent, string userId, string userName)
        {
            Comment comment = new Comment
            {
                CreatorUserId = userId,
                CreatorName = userName,
                CreatedOn = DateTime.Now,
                CommentContent = CommentContent
            };


            Image image = _images.Find(document => document.Id == ImageId).FirstOrDefault();

            if (image.Comments == null)
            {
                image.Comments = new List<Comment>();
            }
            image.Comments.Add(comment);

            _images.FindOneAndReplace(document => document.Id == ImageId, image);

            return comment;
        }

    }

}