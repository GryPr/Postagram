using MongoDB.Driver;
using ImageStoreApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace ImageStoreApi.Services
{
    public class ImageService
    {
        private readonly IMongoCollection<Image> _images;

        public ImageService(IImageDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

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

    }
}