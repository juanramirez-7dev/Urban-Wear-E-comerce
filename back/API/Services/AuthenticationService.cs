using API.DTOs.Authentication;
using API.Interfaces.Repositories;
using API.Interfaces.Services;
using API.Models;

namespace API.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUsuarioRepository _repository;
        private readonly IHasherService _hasherService;
        private readonly JwtService _jwtService;
        public AuthenticationService(IHasherService hasherService, IUsuarioRepository repository, JwtService jwtService)
        {
            _hasherService = hasherService;
            _repository = repository;
            _jwtService = jwtService;
        }

        public async Task<LoginResponseDto> LoginAsync(LoginRequestDto dto)
        {
            var usuario = await _repository.GetByEmailAsync(dto.Email);
            if (usuario == null)
            {
                throw new KeyNotFoundException($"Usuario con el email {dto.Email} no existe.");
            }
            if (!_hasherService.VerifyPassword(dto.Password, usuario.PasswordHash))
            {
                throw new UnauthorizedAccessException($"La contraseña o el correo son incorrectos");
            }
            var token = _jwtService.GenerateToken(usuario.Id.ToString(),usuario.Rol.ToString());

            var response = new LoginResponseDto
            {
                Token = token
            };
            return response;
        }
    }
}
