using API.Models;

namespace API.Interfaces.Repositories
{
    public interface IPedidoRepository
    {
        Task<IEnumerable<Pedido>> GetAllAsync();
        Task<IEnumerable<Pedido>> GetAllByUsuarioIdAsync(Guid id);
        Task<Pedido?> GetByIdAsync(Guid id);
        Task AddAsync(Pedido pedido);
    }
}
