using API.DTOs.Authentication;
using API.Interfaces.Repositories;
using API.Interfaces.Services;
using API.Models;
using System.Security.Claims;

namespace API.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUsuarioRepository _repository;
        private readonly IHasherService _hasherService;
        private readonly IJwtService _jwtService;
        public AuthenticationService(IHasherService hasherService, IUsuarioRepository repository, IJwtService jwtService)
        {
            _hasherService = hasherService;
            _repository = repository;
            _jwtService = jwtService;
        }

        public async Task<LoginResponseDto> LoginAsync(LoginRequestDto dto)
        {
            var partes = dto.Email.Split('@');
            if (partes.Length != 2 || partes[0].Length == 0 || partes[1].Length == 0 || !partes[1].Contains('.'))
            {
                throw new ArgumentException($"El email no es valido");
            }
            var usuario = await _repository.GetByEmailAsync(dto.Email);
            if (usuario == null)
            {
                throw new KeyNotFoundException($"Usuario con el email {dto.Email} no existe.");
            }
            if (!_hasherService.VerifyPassword(dto.Password, usuario.PasswordHash))
            {
                throw new UnauthorizedAccessException($"La contraseña o el correo son incorrectos");
            }
            var token = _jwtService.GenerateToken(usuario.Id.ToString(), usuario.Rol.ToString(), usuario.Nombre, usuario.Email, usuario.Telefono);

            var response = new LoginResponseDto
            {
                Token = token,
                Rol = usuario.Rol
            };
            return response;
        }

        public AuthUserDto meMethod(string? id,string? nombre,string? email, string? role, string? telefono)
        {

            if (!Guid.TryParse(id, out var userId))
            {
                throw new UnauthorizedAccessException($"Usuario con Id no valido");
            }
            if (string.IsNullOrEmpty(nombre) || string.IsNullOrEmpty(email) || string.IsNullOrEmpty(role)||string.IsNullOrEmpty(telefono))
            {
                throw new UnauthorizedAccessException($"Usuario con datos incompletos");
            }

            AuthUserDto userAuth = new AuthUserDto
            {
                Id = userId,
                Name = nombre,
                Email = email,
                Role = role.ToString(),
                Telefono = telefono
            };
            return userAuth;
        }
    }
}
