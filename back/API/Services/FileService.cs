using API.Interfaces.Services;

namespace API.Services
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _environment;
        private readonly IConfiguration _configuration;

        public FileService(
            IWebHostEnvironment environment,
            IConfiguration configuration
         )
        {
            _environment = environment;
            _configuration = configuration;
        }

        public async Task<string> SaveFileAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new InvalidOperationException("Archivo inválido");

            string[] allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

            string extension = Path
                .GetExtension(file.FileName)
                .ToLower();

            if (!allowedExtensions.Contains(extension))
                throw new InvalidOperationException("Tipo de archivo no permitido");

            if (file.Length > 5 * 1024 * 1024)
                throw new InvalidOperationException("Archivo demasiado grande");

            return await SaveAsyn(
                    file.OpenReadStream(),
                    Path.GetExtension(file.FileName)
                );
        }

        public async Task<string> SaveFileLocalAsync(string filePath)
        {

            if (!File.Exists(filePath))
                throw new FileNotFoundException("No se encontró la imagen.");

            string[] allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

            string extension = Path
                .GetExtension(filePath)
                .ToLower();

            if (!allowedExtensions.Contains(extension))
                throw new InvalidOperationException("Tipo de archivo no permitido");

            using var stream = new FileStream(
                filePath,
                FileMode.Open
            );

            return await SaveAsyn(
                     stream,
                     Path.GetExtension(filePath)
                 );

        }

        private async Task<string> SaveAsyn(Stream stream, string extension)
        {
            string fileName = $"{Guid.NewGuid()}{extension}";

            string uploadPath = Path.Combine(
                _environment.WebRootPath!,
                "uploads"
            );

            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            string destinationPath = Path.Combine(
                uploadPath,
                fileName
            );

            using var destinationStream = new FileStream(
                destinationPath,
                FileMode.Create
            );

            await stream.CopyToAsync(destinationStream);

            string baseUrl = _configuration["BaseUrl:development"]!;

            return $"{baseUrl}/uploads/{fileName}";
        }

    }
}
