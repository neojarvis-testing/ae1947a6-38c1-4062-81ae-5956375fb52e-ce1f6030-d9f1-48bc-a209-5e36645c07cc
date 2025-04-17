using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace dotnetapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthenticationController(IAuthService authService){
                _authService=authService;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var result = await _authService.Login(model);
            if (result.Item1 == 1)
            {
                return Created("", result.Item2);
            }
            return BadRequest(result.Item2);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User model)
        {
            var result = await _authService.Registration(model, model.UserRole);
            if (result.Item1 == 1)
            {
                return Created("", result.Item2);
            }
            return BadRequest(result.Item2);
        }
    }
}