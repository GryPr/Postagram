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

        public ImageController(ILogger<ImageController> logger, ImageService imageService)
        {
            _logger = logger;
            _imageService = imageService;
        }

        [HttpPost]
        public ActionResult<Image> Post([FromForm] IFormFile ImageContent, [FromForm] string ImageDescription)
        {
            if (!ImageContent.ContentType.Contains("image") || ImageContent.Length <= 0)
            {
                return BadRequest("Wrong Data");
            }

            var imageFs = ImageContent.OpenReadStream();

            //https://stackoverflow.com/questions/55793878/how-to-retrieve-list-of-images-from-gridfs

            _imageService.Create(imageFs, ImageDescription, User.FindFirstValue(ClaimTypes.NameIdentifier), User.FindFirstValue(ClaimTypes.Name), ImageContent.FileName, ImageContent.ContentType);

            return Ok(ImageContent.FileName);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Content("This is a placeholder response for ImageController");
        }
    }
}
