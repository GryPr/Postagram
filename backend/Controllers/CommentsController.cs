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
    public class CommentsController : ControllerBase
    {

        private readonly ILogger<CommentsController> _logger;
        private readonly CommentsService _commentService;

        public CommentsController(ILogger<CommentsController> logger, CommentsService commentService)
        {
            _logger = logger;
            _commentService = commentService;
        }

        [Authorize]
        [HttpPost]
        public ActionResult<Image> Post()
        {

            return Ok(User.Claims.Where(e => e.Type == "name").Select(e => e.Value).SingleOrDefault());
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Content("This is a placeholder response for CommentsController");
        }
    }
}
