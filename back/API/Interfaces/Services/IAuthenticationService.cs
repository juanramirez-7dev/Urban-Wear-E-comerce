using API.DTOs.Authentication;
using API.Models;

namespace API.Interfaces.Services
{
    public interface IAuthenticationService
    {
        Task<LoginResponseDto> LoginAsync(LoginRequestDto dto);
        AuthUserDto meMethod(string? id, string? nombre, string? email, string? role);
    }
}
