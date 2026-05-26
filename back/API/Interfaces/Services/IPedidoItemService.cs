using API.Models;

namespace API.Interfaces.Services
{
    public interface IPedidoItemService
    {
        Task<IEnumerable<PedidoItem>> GetAllByPedidoIdAsync(Guid pedidoId);
        Task<PedidoItem> GetByIdAsync(int id,Guid idPedido);
        Task<PedidoItem> AddAsync(PedidoItem item);
    }
}
