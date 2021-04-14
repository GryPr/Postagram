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
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ImageController : ControllerBase
    {

        private readonly ILogger<ImageController> _logger;
        private readonly ImageService _imageService;

        public ImageController(ILogger<ImageController> Logger, ImageService ImageService)
        {
            _logger = Logger;
            _imageService = ImageService;
        }

        // Endpoint that receives an image and a description through multipart formdata, and stores it in the database
        [HttpPost]
        public ActionResult<Image> Post([FromForm] IFormFile ImageContent, [FromForm] string ImageDescription)
        {
            if (!ImageContent.ContentType.Contains("image") || ImageContent.Length <= 0)
            {
                return BadRequest("Wrong Data");
            }

            var ImageFs = ImageContent.OpenReadStream();

            //https://stackoverflow.com/questions/55793878/how-to-retrieve-list-of-images-from-gridfs

            _imageService.Create(ImageFs, ImageDescription, User.FindFirstValue(ClaimTypes.NameIdentifier), User.Claims.Where(e => e.Type == "name").Select(e => e.Value).SingleOrDefault(), ImageContent.FileName, ImageContent.ContentType);

            return Ok(User.Claims.Where(e => e.Type == "name").Select(e => e.Value).SingleOrDefault());
        }

        // Placeholder endpoint
        [HttpGet]
        public IActionResult Get()
        {
            return Content("This is a placeholder response for ImageController");
        }

        // Model for the JSON request to add a comment to a post
        public class AddCommentRequest
        {
            public string ImageId { get; set; }
            public string CommentContent { get; set; }
        }

        // Endpoint that adds a comment to a specific image post
        [HttpPatch]
        public ActionResult<Comment> AddComment([FromBody] AddCommentRequest Request)
        {
            return _imageService.AddComment(Request.ImageId, Request.CommentContent, User.FindFirstValue(ClaimTypes.NameIdentifier), User.Claims.Where(e => e.Type == "name").Select(e => e.Value).SingleOrDefault());

        }
    }
}
