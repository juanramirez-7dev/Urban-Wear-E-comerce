using API.Models;

namespace API.Interfaces.Services
{
    public interface IUsuarioService
    {
        Task<IEnumerable<Usuario>> GetAllAsync();
        Task<Usuario> GetByIdAsync(Guid id);
        Task<Usuario> AddAsync(Usuario usuario);
        Task UpdateAsync(Usuario usuario,Guid id);
        Task DeleteAsync(Guid id);
        Task<Usuario> GetByEmailAsync(string email);
        Task UpdatePasswordAsync(Guid id, string actualPassword, string newPassword);
        Task<CodigoRecuperacion> GenerarCodigoDeRecuperacion(Guid idUser);
        Task<string> VerificarCodigoDeRecuperacion(string email, string resetCode);
        Task ResetPassword(string recoveryToken, string newPassword);
    }
}
