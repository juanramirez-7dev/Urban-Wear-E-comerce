namespace API.Interfaces.Services
{
    public interface IFileService
    {
        Task<string> SaveFileAsync(IFormFile file);
        Task<string> SaveFileLocalAsync(string filePath);
    }
}
