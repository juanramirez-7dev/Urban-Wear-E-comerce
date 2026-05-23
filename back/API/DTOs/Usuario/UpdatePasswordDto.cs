namespace API.DTOs.Usuario
{
    public class UpdatePasswordDto
    {
        public Guid id { get; set; }
        public string CurrentPassword { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }
}
