using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
 
namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;
 
        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }
 
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
 
            var (statusCode, message) = await _authService.Registration(model, model.UserRole);
            if (statusCode == 400)
            {
                return BadRequest(new { Message = message });
            }
 
            return StatusCode(statusCode, new { Message = message });
        }
<<<<<<< HEAD

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User model, [FromQuery] string role)
=======
 
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
>>>>>>> 77dfd911f1a02e5e795f5525eae66031341788c5
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
 
            var (statusCode, result) = await _authService.Login(model);
            if (statusCode == 400)
            {
                return BadRequest(new { Message = result });
            }
 
            return Ok(result);
        }
    }
}