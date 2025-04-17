using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            try
            {
                var (status, result) = await _authService.Login(model);

                if (status == 0)
                    return BadRequest(result); 

                return Created("", result); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User model, [FromQuery] string role)
        {
            try
            {
                var (status, message) = await _authService.Registration(model, role);

                if (status == 0)
                    return BadRequest(message); 

                return Created("", message); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
