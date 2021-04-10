using System;
using Xunit;
using ImageStoreApi.Controllers;
using Microsoft.Extensions.Logging;
using Moq;
using Microsoft.AspNetCore.Mvc;
namespace backendtests
{
    public class UnitTest1
    {
        [Fact]
        public void RootController_ShouldReturnPlaceholder()
        {
            var controller = new RootController(mockILogger());
            var result = controller.Get() as ContentResult;
            Assert.Equal("This is a placeholder response for RootController", result.Content);
        }

        public ILogger<RootController> mockILogger()
        {
            var mock = new Mock<ILogger<RootController>>();
            ILogger<RootController> logger = mock.Object;
            return logger;
        }
    }
}
