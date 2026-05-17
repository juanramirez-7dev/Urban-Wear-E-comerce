using API.Models;

namespace API.Interfaces.Repositories
{
    public interface ICategoriaRepository
    {
        Task<IEnumerable<Categoria>> GetAllAsync();
        Task<Categoria?> GetByIdAsync(Guid id);
        Task<Categoria?> GetByNameAsync(string nombre);
        Task AddAsync(Categoria categoria);
        Task UpdateAsync(Categoria categoria);
        Task DeleteAsync(Guid id);
    }
}
