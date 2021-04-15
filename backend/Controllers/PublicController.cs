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

        private readonly IImageService _imageService;

        public PublicController(ILogger<PublicController> logger, IImageService imageService)
        {
            _logger = logger;
            _imageService = imageService;
        }

        public class Range
        {
            public int index { get; set; }
        }

        // Model for the response containing the image data
        public class GetResponse
        {
            public string FileName { get; set; }
            public string ContentType { get; set; }
            public string ImageDescription { get; set; }

            public string ImageId { get; set; }

            public DateTime CreatedOn { get; set; }

            public string CreatorName { get; set; }

            public string CreatorId { get; set; }

            public string ImageContent { get; set; }

            public List<Comment> Comments { get; set; }
        }

        // Deprecated endpoint
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
                ImageId = img.Id,
                CreatedOn = img.CreatedOn,
                CreatorName = img.CreatorName,
                CreatorId = img.CreatorUserId,
                ImageContent = base64
            };
        }

        // Endpoint that returns all the images in the database through a JSON
        [HttpPost]
        public ActionResult<List<GetResponse>> GetAllImages()
        {
            var (img, file) = _imageService.Get();
            List<GetResponse> responseList = new List<GetResponse>(img.Count);
            for (int i = 0; i < img.Count; i++)
            {
                responseList.Add(new GetResponse
                {
                    FileName = img[i].FileName,
                    ContentType = img[i].ContentType,
                    ImageDescription = img[i].ImageDescription,
                    ImageId = img[i].Id,
                    CreatedOn = img[i].CreatedOn,
                    CreatorName = img[i].CreatorName,
                    CreatorId = img[i].CreatorUserId,
                    Comments = img[i].Comments,
                    ImageContent = file[i]
                });
            }
            return responseList;

        }

    }
}
