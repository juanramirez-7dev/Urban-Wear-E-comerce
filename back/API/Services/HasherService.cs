using API.Interfaces.Services;

namespace API.Services
{
    public class HasherService : IHasherService
    {
        private int workFactor = 12;
        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password, workFactor, enhancedEntropy: true);
        }
        public bool VerifyPassword(string password, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(password, hash, enhancedEntropy: true);
        }
    }
}
