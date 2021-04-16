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
    public class FollowController : ControllerBase
    {

        private readonly ILogger<FollowController> _logger;
        private readonly IUserService _userService;

        public FollowController(ILogger<FollowController> Logger, IUserService UserService)
        {
            _logger = Logger;
            _userService = UserService;
        }

        // Endpoint to follow a user
        [Authorize]
        [HttpGet]
        public IActionResult Get(string UserId)
        {
            _userService.FollowUser(User.FindFirstValue(ClaimTypes.NameIdentifier), UserId);
            return Content("Sucessful Follow");
        }

        [Authorize]
        [Route("/[controller]/followerlist")]
        [HttpGet]
        public ActionResult<List<User>> FollowerListGet(string UserId)
        {
            return _userService.FollowerList(User.FindFirstValue(ClaimTypes.NameIdentifier), UserId);
        }


        [Authorize]
        [Route("/[controller]/followedlist")]
        [HttpGet]
        public ActionResult<List<User>> FollowedListGet(string UserId)
        {
            return _userService.FollowedList(User.FindFirstValue(ClaimTypes.NameIdentifier), UserId);
        }


        // Endpoint to check if the logged in user is following a specific user
        [Authorize]
        [Route("/[controller]/isfollowed")]
        [HttpGet]
        public ActionResult<bool> IsFollowed(string UserId)
        {
            return _userService.IsFollowed(User.FindFirstValue(ClaimTypes.NameIdentifier), UserId);
        }
    }
}
