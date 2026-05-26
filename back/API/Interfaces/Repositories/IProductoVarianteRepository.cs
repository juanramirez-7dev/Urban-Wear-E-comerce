using API.Models;

namespace API.Interfaces.Repositories
{
    public interface IProductoVarianteRepository
    {
        Task<ProductoVariante?> GetByIdAsync(int id);
        Task AddAsync(ProductoVariante enity);
        Task UpdateAsync(ProductoVariante enity);
    }
}
