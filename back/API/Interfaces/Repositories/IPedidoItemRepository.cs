using API.Models;

namespace API.Interfaces.Repositories
{
    public interface IPedidoItemRepository
    {
        Task<IEnumerable<PedidoItem>> GetItemsByPedidoIdAsync(Guid pedidoId);
        Task<PedidoItem?> GetByIdAsync(int id, Guid idPedido);
        Task<PedidoItem> AddAsync(PedidoItem item);
    }
}
