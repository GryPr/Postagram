using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web.Resource;
using ImageStoreApi.Models;
using ImageStoreApi.Services;
using System.Security.Claims;

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
        public ActionResult<Image> Post([FromBody] ImageData imagedata)
        {
            Image image = new Image
            {
                CreatorUserId = User.FindFirstValue(ClaimTypes.NameIdentifier),
                CreatedOn = DateTime.Now,
                ImageData = imagedata
            };


            _imageService.Create(image);

            return image;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Content("This is a placeholder response for ImageController");
        }
    }
}
