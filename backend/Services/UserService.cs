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

        public UserService(IImageDatabaseSettings Settings)
        {
            var Client = new MongoClient(Settings.ConnectionString);
            var Database = Client.GetDatabase(Settings.DatabaseName);

            _users = Database.GetCollection<User>(Settings.UserCollectionName);
        }

        // Get list of all users
        public List<User> Get() =>
            _users.Find(user => true).ToList();

        // Get user with a specified ID
        public User Get(string Id) =>
            _users.Find<User>(User => User.UserId == Id).FirstOrDefault();

        // Create an user
        public User Create(User User)
        {
            _users.InsertOne(User);
            return User;
        }

        public int IncrementFollowerCount(string UserId, bool Mode)
        {
            User User = this.Get(UserId);
            var Filter = Builders<User>.Filter.Eq("UserId", UserId);
            if (Mode == true)
            {
                User.FollowerCount++;
            }
            else
            {
                User.FollowerCount--;
            }
            var Update = Builders<User>.Update.Set("FollowerCount", User.FollowerCount);

            _users.UpdateOne(Filter, Update);
            return User.FollowerCount;
        }

        public int IncrementFollowedCount(string UserId, bool Mode)
        {
            User User = this.Get(UserId);
            var Filter = Builders<User>.Filter.Eq("UserId", UserId);
            if (Mode == true)
            {
                User.FollowedCount++;
            }
            else
            {
                User.FollowedCount--;
            }
            var Update = Builders<User>.Update.Set("FollowedCount", User.FollowedCount);

            _users.UpdateOne(Filter, Update);
            return User.FollowedCount;
        }

        // User that you follow
        public List<String> FollowUser(string FollowerId, string FollowedId)
        {
            // follower = us
            // followed = them
            User Follower = this.Get(FollowerId);
            User Followed = this.Get(FollowedId);
            var FollowerIdFilter = Builders<User>.Filter.Eq("UserId", FollowerId);
            var Options = new UpdateOptions { IsUpsert = true };
            var FollowedIdFilter = Builders<User>.Filter.Eq("UserId", FollowedId);
            if (Follower.UsersFollowed == null)
            {
                Follower.UsersFollowed = new List<String>();
            }

            if (Followed.UsersFollowers == null)
            {
                Followed.UsersFollowers = new List<String>();
            }

            if (!Follower.UsersFollowed.Contains(FollowedId))
            {
                Follower.UsersFollowed.Add(FollowedId);

                // Update the Follower Count
                IncrementFollowerCount(FollowedId, true);

                Followed.UsersFollowers.Add(FollowerId);

                // Update the Followed Count
                IncrementFollowedCount(FollowerId, true);
            }

            else if (Follower.UsersFollowed.Contains(FollowedId))
            {
                Follower.UsersFollowed.Remove(FollowedId);
                IncrementFollowerCount(FollowedId, false);

                Followed.UsersFollowers.Remove(FollowerId);
                IncrementFollowedCount(FollowerId, false);
            }

            var UsersFollowedUpdate = Builders<User>.Update.Set<List<String>>("UsersFollowed", Follower.UsersFollowed);
            var UsersFollowersUpdate = Builders<User>.Update.Set<List<String>>("UsersFollowers", Followed.UsersFollowers);
            _users.UpdateOne(FollowerIdFilter, UsersFollowedUpdate, Options);
            _users.UpdateOne(FollowedIdFilter, UsersFollowersUpdate, Options);

            return Follower.UsersFollowed;
        }

         public List<User> FollowerList(string FollowerId, string FollowedId)
        {
            User Followed = this.Get(FollowedId);
            
            List<User> UserList = new List<User>(Followed.UsersFollowers.Count);       

            foreach(string UserId in Followed.UsersFollowers ){
                UserList.Add(this.Get(UserId));
            }
            File.AppendAllText(@"./log.txt", UserList.Count + Environment.NewLine);
            return UserList;  
        }

         public List<User> FollowedList(string FollowerId, string FollowedId)
        {
            User Follower = this.Get(FollowedId);
            
            List<User> UserList = new List<User>(Follower.UsersFollowed.Count);

            foreach(string UserId in Follower.UsersFollowed ){
                UserList.Add(this.Get(UserId));
            }
            File.AppendAllText(@"./log.txt", UserList.Count + Environment.NewLine);
            return UserList;      
        }

        public bool IsFollowed(string FollowerId, string FollowedId)
        {
            User Follower = this.Get(FollowerId);
 
            if (Follower.UsersFollowed == null)
            {
                return false;
            }
            return Follower.UsersFollowed.Contains(FollowedId); ;
        }
    }
}