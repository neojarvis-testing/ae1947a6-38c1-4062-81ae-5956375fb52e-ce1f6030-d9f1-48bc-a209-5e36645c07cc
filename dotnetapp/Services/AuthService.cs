using dotnetapp.Models;
using dotnetapp.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public AuthService(UserManager<ApplicationUser> userManager, 
                           RoleManager<IdentityRole> roleManager, 
                           IConfiguration configuration, 
                           ApplicationDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _context = context;
        }

        public async Task<(int, string)> Registration(User model, string role)
        {
            var userExists = await _userManager.FindByEmailAsync(model.Email);
            if (userExists != null)
                return (0, "User already exists");

            var applicationUser = new ApplicationUser
            {
                Email = model.Email,
                UserName = model.Username,
                Name = model.Username
            };

            var result = await _userManager.CreateAsync(applicationUser, model.Password);
            if (!result.Succeeded)
                return (0, "User creation failed! Please check user details and try again");

            if (!await _roleManager.RoleExistsAsync(role))
                await _roleManager.CreateAsync(new IdentityRole(role));

            await _userManager.AddToRoleAsync(applicationUser, role);
            return (1, "User created successfully!");
        }

        public async Task<(int, object)> Login(LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return (0, "Invalid email");

            var passwordValid = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!passwordValid)
                return (0, "Invalid password");

            var userRoles = await _userManager.GetRolesAsync(user);
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email)
            };

            foreach (var role in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role));
            }

            var token = GenerateToken(authClaims);
            return (1, new { Token = token });
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
            return "GeneratedJWTToken"; 
        }
    }
}
