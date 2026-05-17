using API.Models;

namespace API.Interfaces.Repositories
{
    public interface IProductoRepository
    {
        Task<IEnumerable<Producto>> GetAllAsync();
        Task<(IEnumerable<Producto> Items, int Total)> GetPagedAsync(int limit, int offset, Guid? categoriaId, decimal? precio);
        Task<Producto?> GetByIdAsync(Guid id);
        Task AddAsync(Producto producto);
        Task UpdateAsync(Producto producto);
        Task DeleteAsync(Guid id);
        Task<IEnumerable<Producto>> GetByCategoryIdAsync(Guid Id);
    }
}
