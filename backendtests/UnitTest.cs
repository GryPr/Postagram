using System;
using Xunit;
using ImageStoreApi.Controllers;
using Microsoft.Extensions.Logging;
using Moq;
using Microsoft.AspNetCore.Mvc;
using ImageStoreApi.Services;
using ImageStoreApi.Models;
using System.Collections.Generic;

namespace backendtests
{
    public class UnitTest
    {
        [Fact]
        public void RootController_ShouldReturnPlaceholder()
        {
            var controller = new RootController(mockILoggerRootController());
            var result = controller.Get() as ContentResult;
            Assert.Equal("This is a placeholder response for RootController", result.Content);
        }

        [Fact]
        public void ImageController_AddComment_ShouldReturnComment()
        {
            var ImageService = new Mock<IImageService>();

            var Comment = new Comment{};

            ImageService.Setup(x => x.AddComment("imageId", "imageId", "imageId", "imageId")).Returns(Comment);

            var ImageController = new ImageController(mockILoggerImageController(), ImageService.Object);
            var result = ImageController.AddComment(new ImageController.AddCommentRequest { });
            
            Assert.Equal(Comment, result);
        }

        [Fact]
        public void PublicController_Post_ShouldReturnList()
        {
            var ImageService = new Mock<IImageService>();

            var img = new List<Image>();
            var file = new List<String>();

            ImageService.Setup(x => x.Get()).Returns((img, file));

            var publicController = new PublicController(mockILoggePublicController(), ImageService.Object);
            var result = publicController.GetAllImages();

            List<PublicController.GetResponse> responseList = new List<PublicController.GetResponse>(0);

            Assert.Equal(responseList, result.Value);
        }

        [Fact]
        public void UserController_Get_ShouldReturnUser()
        {
            var UserService = new Mock<IUserService>();

            var user = new User();

            UserService.Setup(x => x.Get("")).Returns(user);

            var publicController = new UserController(mockILoggeUserController(), UserService.Object);
            var result = publicController.Get("");

            List<PublicController.GetResponse> responseList = new List<PublicController.GetResponse>(0);

            Assert.Equal(user, result.Value);
        }

        public ILogger<RootController> mockILoggerRootController()
        {
            var mock = new Mock<ILogger<RootController>>();
            ILogger<RootController> logger = mock.Object;
            return logger;
        }

        public ILogger<ImageController> mockILoggerImageController()
        {
            var mock = new Mock<ILogger<ImageController>>();
            ILogger<ImageController> logger = mock.Object;
            return logger;
        }

        public ILogger<PublicController> mockILoggePublicController()
        {
            var mock = new Mock<ILogger<PublicController>>();
            ILogger<PublicController> logger = mock.Object;
            return logger;
        }

        public ILogger<UserController> mockILoggeUserController()
        {
            var mock = new Mock<ILogger<UserController>>();
            ILogger<UserController> logger = mock.Object;
            return logger;
        }
    }
}
