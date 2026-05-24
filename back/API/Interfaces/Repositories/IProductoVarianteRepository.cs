using API.Models;

namespace API.Interfaces.Repositories
{
    public interface IProductoVarianteRepository
    {
        Task AddAsync(ProductoVariante enity);
        Task UpdateAsync(ProductoVariante enity);
    }
}
