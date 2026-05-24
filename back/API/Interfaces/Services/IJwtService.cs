namespace API.Interfaces.Services
{
    public interface IJwtService
    {
        string GenerateToken(string userId, string role, string name, string email);
    }
}
