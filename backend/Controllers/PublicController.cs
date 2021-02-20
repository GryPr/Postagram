using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using ImageStoreApi.Models;
using ImageStoreApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web.Resource;

namespace ImageStoreApi.Controllers
{

    // Manages the public API (it doesn't require authentication and authorization)
    [ApiController]
    [Route("[controller]")]
    public class PublicController : ControllerBase
    {
        private readonly ILogger<PublicController> _logger;

        private readonly ImageService _imageService;

        public PublicController(ILogger<PublicController> logger, ImageService imageService)
        {
            _logger = logger;
            _imageService = imageService;
        }

        public class Range
        {
            public int index { get; set; }
        }

        public class GetResponse
        {
            public string FileName { get; set; }
            public string ContentType { get; set; }
            public string ImageDescription { get; set; }

            public DateTime CreatedOn { get; set; }

            public string CreatorName { get; set; }

            public string ImageContent { get; set; }
        }

        [HttpGet]
        public ActionResult<GetResponse> Get([FromBody] Range range)
        {
            var (img, file) = _imageService.Get(range.index);
            byte[] bytes = file.ToArray();
            string base64 = Convert.ToBase64String(bytes);
            // Receives range of images to send back, and sends back those images from the DB in chronological order
            return new GetResponse
            {
                FileName = img.FileName,
                ContentType = img.ContentType,
                ImageDescription = img.ImageDescription,
                CreatedOn = img.CreatedOn,
                CreatorName = img.CreatorName,
                ImageContent = base64
            };
        }

    }
}
