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


        public TokenInfoController(ILogger<TokenInfoController> logger)
        {
            _logger = logger;

        }

        // Model of the JWT data returned
        class APIResponse
        {
            public string userId { get; set; }
            public string email { get; set; }
            public string displayName { get; set; }
        }

        // Endpoint that returns the data contained in a JWT
        [HttpGet]
        public IActionResult Get()
        {

            APIResponse resp = new APIResponse()
            {
                userId = User.FindFirstValue(ClaimTypes.NameIdentifier),
                email = User.Claims.Where(e => e.Type == "emails").Select(e => e.Value).SingleOrDefault(),
                displayName = User.Claims.Where(e => e.Type == "name").Select(e => e.Value).SingleOrDefault(),
            };


            return Ok(resp);

        }
    }
}
