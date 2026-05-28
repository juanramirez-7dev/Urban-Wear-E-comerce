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
        Task GenerarCodigoDeRecuperacion(string email);
        Task<string> VerificarCodigoDeRecuperacion(string email, string resetCode);
        Task ResetPassword(Guid id, string newPassword);
    }
}
