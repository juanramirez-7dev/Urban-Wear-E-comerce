using API.Enums;

namespace API.DTOs.Authentication
{
    public class LoginResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public RolUsuario Rol { get; set; } 
    }
}
