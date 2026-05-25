using API.Models;

namespace API.Interfaces.Repositories
{
    public interface ICarritoRepository
    {
        Task<Carrito?> GetFullByUserId(Guid userId);
        Task<Carrito?> GetByIdAsync(Guid id);
        Task AddAsync(Carrito carrito);
        Task UpdateAsync(Carrito carrito);
        Task DeleteAsync(Guid id);
        Task<Carrito?> GetByUserId(Guid userId);
        Task<int> CountItemAsync(Guid carritoId);
        Task<bool> ExistVariantInCart(Guid carritoId, int varianteId);
    }
}
