using MongoDB.Driver;
using ImageStoreApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace ImageStoreApi.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IImageDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UserCollectionName);
        }

        // Get list of all users
        public List<User> Get() =>
            _users.Find(user => true).ToList();

        // Get user with a specified ID
        public User Get(string id) =>
            _users.Find<User>(user => user.UserId == id).FirstOrDefault();

        // Create an user
        public User Create(User user)
        {
            _users.InsertOne(user);
            return user;
        }

    }
}