using System.Net.Mime;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web.Resource;
using ImageStoreApi.Services;
using ImageStoreApi.Models;

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
            public int length { get; set; }
        }

        public class GetResponse
        {
            public string FileName { get; set; }
            public string ContentType { get; set; }
            public string ImageDescription { get; set; }

            public DateTime CreatedOn { get; set; }

            public string CreatorName { get; set; }

            public byte[] ImageContent { get; set; }
        }

        [HttpGet]
        public ActionResult<GetResponse> Get([FromBody] Range range)
        {
            var (img, file) = _imageService.Get(range.index);
            byte[] bytes;
            using (var streamReader = new MemoryStream())
            {
                file.CopyTo(streamReader);
                bytes = streamReader.ToArray();

            }
            // Receives range of images to send back, and sends back those images from the DB in chronological order
            return new GetResponse
            {
                FileName = img.FileName,
                ContentType = img.ContentType,
                ImageDescription = img.ImageDescription,
                CreatedOn = img.CreatedOn,
                ImageContent = bytes
            };
        }

    }
}
