using API.Models;

namespace API.Interfaces.Services
{
    public interface ICarritoService
    {
        Task<Carrito> GetCartByUser(Guid userId);
        Task AddItem(Guid userId, CarritoItem item);
        Task DeleteItem(Guid userId, int itemId);
        Task UpdateItem(Guid userId, int itemId, int cantidad);
    }
}
