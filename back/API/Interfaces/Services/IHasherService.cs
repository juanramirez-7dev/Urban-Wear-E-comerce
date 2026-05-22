namespace API.Interfaces.Services
{
    public interface IHasherService
    {
        string HashPassword(string password);
        bool VerifyPassword(string password, string hash);
    }
}
