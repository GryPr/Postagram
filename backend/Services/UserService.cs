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
    public class UserService : IUserService
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

        public int IncrementFollowedCount(string userId, bool mode)
        {
            User user = this.Get(userId);
            var filter = Builders<User>.Filter.Eq("UserId", userId);
            if (mode == true)
            {
                user.FollowedCount++;
            }
            else
            {
                user.FollowedCount--;
            }
            var update = Builders<User>.Update.Set("FollowedCount", user.FollowedCount);

            _users.UpdateOne(filter, update);
            return user.FollowedCount;
        }

        //User that you follow
        public List<String> FollowUser(string followerId, string followedId)
        {
            // follower = us
            // followed = them
            User follower = this.Get(followerId);
            User followed = this.Get(followedId);
            var filter = Builders<User>.Filter.Eq("UserId", followerId);
            var options = new UpdateOptions { IsUpsert = true };
            var filter1 = Builders<User>.Filter.Eq("UserId", followedId);
            var options1 = new UpdateOptions { IsUpsert = true };
            if (follower.UsersFollowed == null)
            {
                follower.UsersFollowed = new List<String>();
            }

            if (followed.UsersFollowers == null)
            {
                followed.UsersFollowers = new List<String>();
            }

            if (!follower.UsersFollowed.Contains(followedId))
            {
                follower.UsersFollowed.Add(followedId);

                // Update the Follower Count
                IncrementFollowerCount(followedId, true);

                followed.UsersFollowers.Add(followerId);

                // Update the Followed Count
                IncrementFollowedCount(followerId, true);

            }
            else if (follower.UsersFollowed.Contains(followedId))
            {
                follower.UsersFollowed.Remove(followedId);
                IncrementFollowerCount(followedId, false);

                followed.UsersFollowers.Remove(followerId);
                IncrementFollowedCount(followerId, false);
            }

            var update = Builders<User>.Update.Set<List<String>>("UsersFollowed", follower.UsersFollowed);
            var update1 = Builders<User>.Update.Set<List<String>>("UsersFollowers", followed.UsersFollowers);
            _users.UpdateOne(filter, update, options);
            _users.UpdateOne(filter1, update1, options1);

            return follower.UsersFollowed;
        }

        public List<User> FollowerList(string followerId, string followedId)
        {
            User followed = this.Get(followedId);

            List<User> userList = new List<User>(followed.UsersFollowers.Count);



            foreach (string userId in followed.UsersFollowers)
            {


                userList.Add(this.Get(userId));

            }
            File.AppendAllText(@"./log.txt", userList.Count + Environment.NewLine);
            return userList;



        }



        public List<User> FollowedList(string followerId, string followedId)
        {
            User follower = this.Get(followedId);

            List<User> userList = new List<User>(follower.UsersFollowed.Count);



            foreach (string userId in follower.UsersFollowed)
            {


                userList.Add(this.Get(userId));

            }
            File.AppendAllText(@"./log.txt", userList.Count + Environment.NewLine);
            return userList;



        }


        public bool IsFollowed(string followerId, string followedId)
        {
            User follower = this.Get(followerId);


            if (follower.UsersFollowed == null)
            {
                return false;
            }
            return follower.UsersFollowed.Contains(followedId); ;
        }

    }
}