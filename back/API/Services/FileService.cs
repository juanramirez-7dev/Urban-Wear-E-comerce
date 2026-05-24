using API.Interfaces.Services;

namespace API.Services
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _environment;
        private readonly IHttpContextAccessor _httpContext;

        public FileService(
            IWebHostEnvironment environment,
            IHttpContextAccessor httpContext)
        {
            _environment = environment;
            _httpContext = httpContext;
        }

        public async Task<string> SaveFileAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("Archivo inválido");

            string[] allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

            string extension = Path
                .GetExtension(file.FileName)
                .ToLower();

            if (!allowedExtensions.Contains(extension))
                throw new Exception("Tipo de archivo no permitido");

            if (file.Length > 5 * 1024 * 1024)
                throw new Exception("Archivo demasiado grande");

            string rootPath = _environment.WebRootPath ?? "wwwroot";

            string uploadPath = Path.Combine(rootPath, "uploads");

            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            string fileName = $"{Guid.NewGuid()}{extension}";

            string filePath = Path.Combine(uploadPath, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);

            await file.CopyToAsync(stream);

            var request = _httpContext.HttpContext!.Request;

            string baseUrl = $"{request.Scheme}://{request.Host}";

            return $"{baseUrl}/uploads/{fileName}";
        }
    }
}
