using API.Enums;
using API.Models;

namespace API.Interfaces.Repositories
{
    public interface IProductoVarianteRepository
    {
        Task<ProductoVariante?> GetByIdAsync(int id);
        Task AddAsync(ProductoVariante enity);
        Task UpdateAsync(ProductoVariante enity);
        Task<ICollection<ProductoVariante>> GetAllByProductIdAsyn(Guid productId);
        Task<bool> ExistVarianteWithTalla(int varianteId, Talla talla);
    }
}
