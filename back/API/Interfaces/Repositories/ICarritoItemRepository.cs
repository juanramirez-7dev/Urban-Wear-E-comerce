using API.Models;

namespace API.Interfaces.Repositories
{
    public interface ICarritoItemRepository
    {
        Task<CarritoItem?> GetByIdAsync(int id);
        Task AddAsync(CarritoItem carritoItem);
        Task UpdateAsync(CarritoItem carritoItem);
        Task DeleteAsync(int id);
        Task<ICollection<CarritoItem>> GetByCarritoId(Guid carritoId);
    }
}
