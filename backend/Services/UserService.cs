using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Policy;
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

        public int IncrementFollowerCount(string userId, bool mode)
        {
            User user = this.Get(userId);
            var filter = Builders<User>.Filter.Eq("UserId", userId);
            if (mode == true)
            {
                user.FollowerCount++;
            }
            else
            {
                user.FollowerCount--;
            }
            var update = Builders<User>.Update.Set("FollowerCount", user.FollowerCount);

            _users.UpdateOne(filter, update);
            return user.FollowerCount;
        }

        public List<String> FollowUser(string followerId, string followedId)
        {
            User follower = this.Get(followerId);
            var filter = Builders<User>.Filter.Eq("UserId", followerId);
            var options = new UpdateOptions { IsUpsert = true };
            if (follower.UsersFollowed == null)
            {
                follower.UsersFollowed = new List<String>();
            }

            if (!follower.UsersFollowed.Contains(followedId))
            {
                follower.UsersFollowed.Add(followerId);

                // Update the Follower Count
                IncrementFollowerCount(followedId, true);
            }
            else if (follower.UsersFollowed.Contains(followedId))
            {
                follower.UsersFollowed.Remove(followedId);
                IncrementFollowerCount(followedId, false);
            }

            var update = Builders<User>.Update.Set<List<String>>("UsersFollowed", follower.UsersFollowed);
            _users.UpdateOne(filter, update, options);

            return follower.UsersFollowed;
        }

        public bool IsFollowed(string followerId, string followedId)
        {
            User follower = this.Get(followerId);

            File.AppendAllText(@"./log.txt", followerId + Environment.NewLine);
            if (follower.UsersFollowed == null)
            {
                return false;
            }
            return follower.UsersFollowed.Contains(followedId); ;
        }

    }
}