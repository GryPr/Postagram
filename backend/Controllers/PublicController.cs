using System.Net.Mime;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet]
        public ActionResult<List<Image>> Get([FromBody] Range range)
        {
            // Receives range of images to send back, and sends back those images from the DB in chronological order
            return _imageService.Get(range.index, range.length);
        }

    }
}
