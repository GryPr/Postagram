using System;
using System.Collections.Generic;
using System.Linq;
using ImageStoreApi.Models;
using MongoDB.Bson;
using MongoDB.Driver;

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

        public int IncrementFollowerCount(string userId)
        {
            User user = this.Get(userId);
            var filter = Builders<User>.Filter.Eq("UserId", userId);
            var update = Builders<User>.Update.Set("FollowerCount", user.FollowerCount++);

            _users.UpdateOne(filter, update);
            return user.FollowerCount;
        }

        public String[] FollowUser(string followerId, string followedId)
        {
            User follower = this.Get(followerId);
            var filter = Builders<User>.Filter.Eq("UserId", followerId);
            var options = new UpdateOptions { IsUpsert = true };
            var update = Builders<User>.Update.Set("UsersFollowed", follower.UsersFollowed.Append(followedId));

            _users.UpdateOne(filter, update, options);

            // Update the Follower Count
            IncrementFollowerCount(followedId);

            return follower.UsersFollowed;
        }

    }
}