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

        public PublicController(ILogger<PublicController> Logger, IImageService ImageService)
        {
            _logger = Logger;
            _imageService = ImageService;
        }

        public class Range
        {
            public int Index { get; set; }
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
        public ActionResult<GetResponse> Get([FromBody] Range Range)
        {
            var (Img, File) = _imageService.Get(Range.Index);
            byte[] Bytes = File.ToArray();
            string Base64 = Convert.ToBase64String(Bytes);
            // Receives range of images to send back, and sends back those images from the DB in chronological order
            return new GetResponse
            {
                FileName = Img.FileName,
                ContentType = Img.ContentType,
                ImageDescription = Img.ImageDescription,
                ImageId = Img.Id,
                CreatedOn = Img.CreatedOn,
                CreatorName = Img.CreatorName,
                CreatorId = Img.CreatorUserId,
                ImageContent = Base64
            };
        }

        // Endpoint that returns all the images in the database through a JSON
        [HttpPost]
        public ActionResult<List<GetResponse>> GetAllImages()
        {
            var (Img, File) = _imageService.Get();
            List<GetResponse> ResponseList = new List<GetResponse>(Img.Count);
            for (int i = 0; i < Img.Count; i++)
            {
                ResponseList.Add(new GetResponse
                {
                    FileName = Img[i].FileName,
                    ContentType = Img[i].ContentType,
                    ImageDescription = Img[i].ImageDescription,
                    ImageId = Img[i].Id,
                    CreatedOn = Img[i].CreatedOn,
                    CreatorName = Img[i].CreatorName,
                    CreatorId = Img[i].CreatorUserId,
                    Comments = Img[i].Comments,
                    ImageContent = File[i]
                });
            }
            return ResponseList;

        }

        // Endpoint that returns all the images in the database through a JSON
        [Route("/[controller]/GetUserImages")]
        [HttpPost]
        public ActionResult<List<GetResponse>> GetUserImages(string CreatorUserId)
        {
            var (Img, File) = _imageService.GetUserImages(CreatorUserId);
            List<GetResponse> ResponseList = new List<GetResponse>(Img.Count);
            for (int i = 0; i < Img.Count; i++)
            {
                ResponseList.Add(new GetResponse
                {
                    FileName = Img[i].FileName,
                    ContentType = Img[i].ContentType,
                    ImageDescription = Img[i].ImageDescription,
                    ImageId = Img[i].Id,
                    CreatedOn = Img[i].CreatedOn,
                    CreatorName = Img[i].CreatorName,
                    CreatorId = Img[i].CreatorUserId,
                    Comments = Img[i].Comments,
                    ImageContent = File[i]
                });
            }
            return ResponseList;

        }

    }
}
