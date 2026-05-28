using System.Security.Claims;

namespace API.Interfaces.Services
{
    public interface IJwtService
    {
        string GenerateToken(string userId, string role, string? name = null, string? email = null, string? telefono = null, TimeSpan? expiration = null);
    }
}
