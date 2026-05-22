using Microsoft.AspNetCore.Mvc;
using BookApi.Models;
using BookApi.Services;
using System.Security.Cryptography;
using System.Text;

namespace BookApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]     // URL är api/auth
    public class AuthController : ControllerBase
    {
        // in-memory användarlista – återställs när servern startas om
        private static List<User> _users = new();
        // användar-id räknare
        private static int _nextId = 1;

        private readonly TokenService _tokenService;

        // TokenService injiceras automatiskt av .NET
        public AuthController(TokenService tokenService)
        {
            _tokenService = tokenService;
        }

        // hashar lösenordet så vi aldrig lagrar det i klartext
        private string HashPassword(string password)
        {
            var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }


        // == REGISTRERA ==

        // POST api/auth/register – skapar en ny användare
        [HttpPost("register")]
        public ActionResult Register([FromBody] RegisterRequest request)
        {
            // kolla om användarnamnet redan är taget
            if (_users.Any(u => u.Username == request.Username))
                return BadRequest("Användarnamnet finns redan");

            // skapa ny användare med hashat lösenord
            var user = new User
            {
                Id           = _nextId++,
                Username     = request.Username,
                PasswordHash = HashPassword(request.Password)
            };

            _users.Add(user);
            return Ok(new { message = "Användare registrerad" });
        }


        // == LOGGA IN ==

        // POST api/auth/login – returnerar en JWT-token om inloggningen lyckas
        [HttpPost("login")]
        public ActionResult Login([FromBody] LoginRequest request)
        {
            // hitta användare via användarnamn
            var user = _users.FirstOrDefault(u => u.Username == request.Username);

            // kolla att användaren finns och att lösenordet stämmer
            if (user == null || user.PasswordHash != HashPassword(request.Password))
                return Unauthorized("Felaktigt användarnamn eller lösenord");

            // generera och returnera token – Angular lagrar den och skickar den med varje anrop
            var token = _tokenService.CreateToken(user);
            return Ok(new { token });
        }
    }
}