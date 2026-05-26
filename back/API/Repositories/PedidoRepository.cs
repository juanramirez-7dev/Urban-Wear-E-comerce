using API.Context;
using API.Interfaces.Repositories;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class PedidoRepository : IPedidoRepository
    {
        private readonly AppDbContext _context;

        public PedidoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Pedido>> GetAllAsync()
        {
            return await _context.Pedidos.Include(p => p.ItemsPedido).ToListAsync();
        }
        public async Task<IEnumerable<Pedido>> GetAllByUsuarioIdAsync(Guid id)
        {
            return await _context.Pedidos.Include(p => p.ItemsPedido).Where(p => p.UsuarioId == id).ToListAsync();
        }
        public async Task<Pedido?> GetByIdAsync(Guid id)
        {
            return await _context.Pedidos.Include(p => p.ItemsPedido).FirstOrDefaultAsync(p => p.Id == id);
        }
        public async Task AddAsync(Pedido pedido)
        {
            await _context.Pedidos.AddAsync(pedido);
            await _context.SaveChangesAsync();
        }
    }
}
