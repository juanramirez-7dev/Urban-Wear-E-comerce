using API.Context;
using API.Interfaces.Repositories;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class PedidoItemRepository : IPedidoItemRepository
    {
        private readonly AppDbContext _context;
        public PedidoItemRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PedidoItem>> GetItemsByPedidoIdAsync(Guid pedidoId)
        {
            return await _context.ItemsPedido.Where(pi => pi.PedidoId == pedidoId).ToListAsync();
        }
        public async Task<PedidoItem?> GetByIdAsync(int id, Guid idPedido)
        {
            return await _context.ItemsPedido.FirstOrDefaultAsync(pi => pi.Id == id && pi.PedidoId == idPedido);
        }
        public async Task<PedidoItem> AddAsync(PedidoItem item)
        {
            _context.ItemsPedido.Add(item);

            await _context.SaveChangesAsync();

            return item;
        }
    }
}
