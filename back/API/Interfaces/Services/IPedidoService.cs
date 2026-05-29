using API.DTOs.Estadisticas;
using API.Models;

namespace API.Interfaces.Services
{
    public interface IPedidoService
    {
        Task<IEnumerable<Pedido>> GetAllAsync();
        Task<IEnumerable<Pedido>> GetAllByUsuarioIdAsync(Guid userId);
        Task<Pedido> GetByIdAsync(Guid id);
        Task<Pedido> AddAsync(Pedido pedido);
        Task<IEnumerable<PedidoItem>> GetItemsByPedidoIdAsync(Guid pedidoId);
        Task<PedidoItem> GetItemByIdOnPedidoAsync(int id, Guid idPedido);
        Task<byte[]> GenerarFacturaPdfAsync(Guid pedidoId);
        Task<EstadisticasDashboardDto> ObtenerEstadisticasDashboardAsync();
    }
}
