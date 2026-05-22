using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BookApi.Models;
using Microsoft.IdentityModel.Tokens;

namespace BookApi.Services
{
    public class TokenService
    {
        private readonly IConfiguration _config;

        // IConfiguration låter oss läsa värden från appsettings.json
        public TokenService(IConfiguration config)
        {
            _config = config;
        }

        public string CreateToken(User user)
        {
            // claims är information vi lagrar inuti token
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),   // användarens id
                new Claim(ClaimTypes.Name, user.Username)                   // användarens användarnamn
            };

            // hemlig nyckel för att signera token – lagras i appsettings.json
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["JWT:Key"]!));

            // signeringsalgoritmen
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // bygg token
            var token = new JwtSecurityToken(
                issuer: _config["JWT:Issuer"],          // vem som skapade token
                audience: _config["JWT:Audience"],      // vem token är till för
                claims: claims,
                expires: DateTime.UtcNow.AddHours(8),   // token går ut efter 8 timmar
                signingCredentials: creds
            );

            // returnera token som en sträng – detta är vad Angular tar emot och lagrar
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}