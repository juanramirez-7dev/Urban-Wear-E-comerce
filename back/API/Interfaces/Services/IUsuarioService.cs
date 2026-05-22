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
    }
}
