namespace ImageStoreApi.Models
{
    public class ImageDatabaseSettings : IImageDatabaseSettings
    {
        public string UserCollectionName { get; set; }
        public string ImageCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IImageDatabaseSettings
    {
        string UserCollectionName { get; set; }
        string ImageCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}