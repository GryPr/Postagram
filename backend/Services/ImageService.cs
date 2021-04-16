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

        public ImageService(IImageDatabaseSettings Settings)
        {
            var Client = new MongoClient(Settings.ConnectionString);
            var Database = Client.GetDatabase(Settings.DatabaseName);
            _bucket = new GridFSBucket(Database);

            _images = Database.GetCollection<Image>(Settings.ImageCollectionName);
        }

        public ImageService()
        {
        }

        // Get image with a specified object ID
        public Image Get(string Id) =>
            _images.Find<Image>(Image => Image.Id == Id).FirstOrDefault();
            
        // Get user images with a specified user ID
        public (List<Image>, List<String>) GetUserImages(string CreatorUserId)
        {
            List<Image> Image = _images.Find(Image => Image.CreatorUserId == CreatorUserId).SortByDescending(e => e.CreatedOn).ToList();
            List<String> B64Files = new List<String>(Image.Count);
            for (int i = 0; i < Image.Count; i++)
            {
                System.Diagnostics.Debug.WriteLine(i);
                var Fs = new MemoryStream();
                _bucket.DownloadToStream(Image[i].ImageId, Fs);
                B64Files.Add(Convert.ToBase64String(Fs.ToArray()));
            }
            return (Image, B64Files);
        }


        // Get by descending order of creation date
        public (Image, MemoryStream) Get(int Index)
        {
            Image Image = _images.Find(Image => true).SortByDescending(e => e.CreatedOn).Limit(1).Skip(Index).ToList()[0];
            MemoryStream Fs = new MemoryStream();
            _bucket.DownloadToStream(Image.ImageId, Fs);
            return (Image, Fs);
        }

        // Get list of images by descending order
        public (List<Image>, List<String>) Get()
        {
            List<Image> Image = _images.Find(Image => true).SortByDescending(e => e.CreatedOn).ToList();
            List<String> B64Files = new List<String>(Image.Count);
            for (int i = 0; i < Image.Count; i++)
            {
                //File.AppendAllText(@"./log.txt", i + Environment.NewLine);
                System.Diagnostics.Debug.WriteLine(i);
                var Fs = new MemoryStream();
                _bucket.DownloadToStream(Image[i].ImageId, Fs);
                B64Files.Add(Convert.ToBase64String(Fs.ToArray()));
            }
            return (Image, B64Files);
        }

        // Create an image
        public Image Create(Image Image)
        {
            _images.InsertOne(Image);
            return Image;
        }

        // Adds an image from the data sent through the endpoint in ImageController
        public Image Create(Stream Fs, string ImageDescription, string UserId, string UserName, string FileName, string ContentType)
        {
            var Id = _bucket.UploadFromStream(FileName, Fs);

            Image Image = new Image
            {
                CreatorUserId = UserId,
                CreatorName = UserName,
                CreatedOn = DateTime.Now,
                ImageDescription = ImageDescription,
                FileName = FileName,
                ContentType = ContentType,
                ImageId = Id
            };
            _images.InsertOne(Image);

            return Image;
        }

        // Adds a comment from the data send through the endpoint in ImageController
        public Comment AddComment(string ImageId, string CommentContent, string UserId, string UserName)
        {
            Comment Comment = new Comment
            {
                CreatorUserId = UserId,
                CreatorName = UserName,
                CreatedOn = DateTime.Now,
                CommentContent = CommentContent
            };


            Image Image = _images.Find(Document => Document.Id == ImageId).FirstOrDefault();

            if (Image.Comments == null)
            {
                Image.Comments = new List<Comment>();
            }
            Image.Comments.Add(Comment);

            _images.FindOneAndReplace(Document => Document.Id == ImageId, Image);

            return Comment;
        }
    }
}