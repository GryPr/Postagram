// To be created when implementing user profiles, follows, or other

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using ImageStoreApi.Models;
using ImageStoreApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web.Resource;
using MongoDB.Driver;

namespace ImageStoreApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<User> Get(string userId)
        {
            return _userService.Get(userId);
        }

        // Endpoint that receives user data, and creates a user in the database if they don't exist already
        [Authorize]
        [HttpPost]
        public IActionResult Post()
        {
            if (_userService.Get(User.FindFirstValue(ClaimTypes.NameIdentifier)) == null)
            {
                _userService.Create(new User
                {
                    UserId = User.FindFirstValue(ClaimTypes.NameIdentifier),
                    Name = User.Claims.Where(e => e.Type == "name").Select(e => e.Value).SingleOrDefault(),
                    Email = User.Claims.Where(e => e.Type == "emails").Select(e => e.Value).SingleOrDefault(),
                    FollowerCount = 0,
                    FollowedCount = 0,
                    UsersFollowed = new List<string>(),
                    UsersFollowers = new List<string>()
                });
                return Content("Added User");
            }

            return Content("Received Token");
        }
    }
}
