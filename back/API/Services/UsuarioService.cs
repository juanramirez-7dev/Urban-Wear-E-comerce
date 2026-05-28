using API.Interfaces.Repositories;
using API.Interfaces.Services;
using API.Models;
using System.Security.Claims;
using static QuestPDF.Helpers.Colors;

namespace API.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _repository;
        private readonly IHasherService _hasherService;
        private readonly ICodigoRecuperacionRepository _codigoRecuperacionRepository;
        private readonly IJwtService _jwtService;
        private readonly IEmailService _emailService;
        public UsuarioService(IUsuarioRepository repository, IHasherService hasherService, ICodigoRecuperacionRepository codigoRecuperacionRepository,IJwtService jwtService, IEmailService emailService)
        {
            _repository = repository;
            _hasherService = hasherService;
            _codigoRecuperacionRepository = codigoRecuperacionRepository;
            _jwtService = jwtService;
            _emailService = emailService;
        }
        public async Task<IEnumerable<Usuario>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }
        public async Task<Usuario> GetByIdAsync(Guid id)
        {
            var usuario = await _repository.GetByIdAsync(id);
            if (usuario == null)
            {
                throw new KeyNotFoundException($"Usuario con el ID {id} no existe.");
            }
            return usuario;
        }
        public async Task<Usuario> AddAsync(Usuario usuario)
        {
            var existingUsuario = await _repository.GetByEmailAsync(usuario.Email);
            if (existingUsuario != null)
            {
                throw new InvalidOperationException($"Ya existe un usuario con el email {usuario.Email}.");
            }
            if (usuario.Nombre.Length == 0)
            {
                throw new ArgumentException($"El nombre no puede estar vacio");
            }
            var partes = usuario.Email.Split('@');
            if (partes.Length != 2 || partes[0].Length == 0 || partes[1].Length == 0 || !partes[1].Contains('.'))
            {
                throw new ArgumentException($"El email no es valido");
            }
            if (usuario.PasswordHash.Length < 8)
            {
                throw new ArgumentException($"La contraseña es muy corta");
            }
            if (usuario.Telefono.Length != 10)
            {
                throw new ArgumentException($"Debe ingresar un telefono movil Valido");
            }

            usuario.PasswordHash = _hasherService.HashPassword(usuario.PasswordHash);

            await _repository.AddAsync(usuario);
            return usuario;
        }
        public async Task UpdateAsync(Usuario usuario, Guid id)
        {
            var existingUsuario = await _repository.GetByIdAsync(id);
            if (existingUsuario == null)
            {
                throw new KeyNotFoundException($"Usuario con el ID {id} no existe.");
            }
            if (usuario.Nombre.Length == 0)
            {
                throw new ArgumentException($"El nombre no puede estar vacio");
            }
            var partes = usuario.Email.Split('@');
            if (partes.Length != 2 || partes[0].Length == 0 || partes[1].Length == 0 || !partes[1].Contains('.'))
            {
                throw new ArgumentException($"El email no es valido");
            }
            if (existingUsuario.Email != usuario.Email)
            {
                var emailExistente = await _repository.GetByEmailAsync(usuario.Email);
                if (emailExistente != null)
                {
                    throw new InvalidOperationException($"Ya existe un usuario con el email {usuario.Email}.");
                }
            }
            if (usuario.Telefono.Length != 10 )
            {
                throw new ArgumentException($"Debe ingresar un telefono movil Valido");
            }
            existingUsuario.Nombre = usuario.Nombre;
            existingUsuario.Email = usuario.Email;
            existingUsuario.Telefono = usuario.Telefono;

            await _repository.UpdateAsync(existingUsuario);
        }
        public async Task DeleteAsync(Guid id)
        {
            var existingUsuario = await _repository.GetByIdAsync(id);
            if (existingUsuario == null)
            {
                throw new KeyNotFoundException($"Usuario con el ID {id} no existe.");
            }
            await _repository.DeleteAsync(id);
        }
        public async Task<Usuario> GetByEmailAsync(string email)
        {
            var partes = email.Split('@');
            if (partes.Length != 2 || partes[0].Length == 0 || partes[1].Length == 0 || !partes[1].Contains('.'))
            {
                throw new ArgumentException($"El email no es valido");
            }
            var usuario = await _repository.GetByEmailAsync(email);
            if (usuario == null)
            {
                throw new KeyNotFoundException($"Usuario con el email {email} no existe.");
            }
            return usuario;
        }

        public async Task UpdatePasswordAsync(Guid id, string currentPassword, string newPassword)
        {
            var existingUsuario = await _repository.GetByIdAsync(id);
            if (existingUsuario == null)
            {
                throw new KeyNotFoundException($"Usuario con el ID {id} no existe.");
            }
            if (!_hasherService.VerifyPassword(currentPassword, existingUsuario.PasswordHash))
            {
                throw new InvalidOperationException("Contraseña actual incorrecta.");
            }
            if (newPassword.Length < 8)
            {
                throw new ArgumentException($"La nueva contraseña es muy corta");
            }
            existingUsuario.PasswordHash = _hasherService.HashPassword(newPassword);
            await _repository.UpdateAsync(existingUsuario);
        }

        public async Task GenerarCodigoDeRecuperacion(string email)
        {
            string codigo = new Random().Next(100000, 1000000).ToString();
            var usuario = await _repository.GetByEmailAsync(email);
            if (usuario == null)
            {
                throw new KeyNotFoundException($"Usuario con el email {email} no existe.");
            }
            var existCode = await _codigoRecuperacionRepository.GetCodeByUsuarioIdAsync(usuario.Id);
            if (existCode != null)
            {
                existCode.Codigo = codigo;
                existCode.ExpirationDate = DateTime.UtcNow.AddMinutes(15);
                await _codigoRecuperacionRepository.UpdateAsync(existCode);
                await _emailService.SendEmailAsync(email, "Recuperación de contraseña", $"Tu código de recuperación es: {codigo}");
            }
            else
            {
                var codigoRecuperacion = new CodigoRecuperacion
                {
                    Codigo = codigo,
                    UserId = usuario.Id,
                    ExpirationDate = DateTime.UtcNow.AddMinutes(15)
                };
                await _codigoRecuperacionRepository.AddAsync(codigoRecuperacion);
                await _emailService.SendEmailAsync(email, "Recuperación de contraseña", $"Tu código de recuperación es: {codigo}");
            }
        }

        public async Task<string> VerificarCodigoDeRecuperacion(string email, string resetCode)
        {
            var usuario = await _repository.GetByEmailAsync(email);
            if (usuario == null)
            {
                throw new KeyNotFoundException($"Usuario con el email {email} no existe.");
            }
            var codigoRecuperacion = await _codigoRecuperacionRepository.GetCodeByUsuarioIdAsync(usuario.Id);
            if (codigoRecuperacion == null || codigoRecuperacion.Codigo != resetCode)
            {
                throw new InvalidOperationException("Código de recuperación inválido.");
            }
            if (codigoRecuperacion.ExpirationDate < DateTime.UtcNow)
            {
                throw new InvalidOperationException("El código de recuperación ha expirado.");
            }

            string recoveryToken = _jwtService.GenerateToken(usuario.Id.ToString(), "Recovery", expiration: TimeSpan.FromMinutes(15));
            await _codigoRecuperacionRepository.DeleteAsync(codigoRecuperacion.Id);
            return recoveryToken;
        }

        public async Task ResetPassword(Guid id, string newPassword)
        {
            var existingUsuario = await _repository.GetByIdAsync(id);
            if (existingUsuario == null)
            {
                throw new KeyNotFoundException($"Usuario con el ID {id} no existe.");
            }
            if (newPassword.Length < 8)
            {
                throw new ArgumentException($"La nueva contraseña es muy corta");
            }
            existingUsuario.PasswordHash = _hasherService.HashPassword(newPassword);
            await _repository.UpdateAsync(existingUsuario);
        }
    }
}

