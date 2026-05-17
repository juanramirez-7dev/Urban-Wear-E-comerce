using API.Models;

namespace API.Interfaces.Services
{
    public interface ICategoriaService
    {
        Task<IEnumerable<Categoria>> GetAllAsync();
        Task<Categoria> GetByIdAsync(Guid id);
        Task<Categoria> AddAsync(Categoria categoria);
        Task<Categoria> UpdateAsync(Categoria categoria);
        Task DeleteAsync(Guid id);
    }
}