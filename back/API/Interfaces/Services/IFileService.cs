namespace API.Interfaces.Services
{
    public interface IFileService
    {
        Task<string> SaveFileAsync(IFormFile file);
    }
}
