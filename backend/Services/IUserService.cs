using ImageStoreApi.Models;
using System.Collections.Generic;

namespace ImageStoreApi.Services
{
    public interface IUserService
    {
        User Create(User user);
        List<string> FollowUser(string followerId, string followedId);
        List<User> Get();
        User Get(string id);
        int IncrementFollowerCount(string userId, bool mode);
        bool IsFollowed(string followerId, string followedId);
    }
}