using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ImageStoreApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TokenInfoController : ControllerBase
    {

        private readonly ILogger<TokenInfoController> _logger;


        public TokenInfoController(ILogger<TokenInfoController> Logger)
        {
            _logger = Logger;

        }

        // Model of the JWT data returned
        class ApiResponse
        {
            public string UserId { get; set; }
            public string Email { get; set; }
            public string DisplayName { get; set; }
        }

        // Endpoint that returns the data contained in a JWT
        [HttpGet]
        public IActionResult Get()
        {

            ApiResponse resp = new ApiResponse()
            {
                UserId = User.FindFirstValue(ClaimTypes.NameIdentifier),
                Email = User.Claims.Where(e => e.Type == "emails").Select(e => e.Value).SingleOrDefault(),
                DisplayName = User.Claims.Where(e => e.Type == "name").Select(e => e.Value).SingleOrDefault(),
            };


            return Ok(resp);

        }
    }
}
