using API.Context;
using API.Interfaces.Repositories;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class CarritoRepository : ICarritoRepository
    {
        private readonly AppDbContext _context;

        public CarritoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Carrito?> GetFullByUserId(Guid userId)
        {
            return await _context.Carritos
                .Include(c => c.Items)
                .ThenInclude(ci => ci.ProductoVariante)
                .ThenInclude(pv => pv.Producto)
                .FirstOrDefaultAsync(c => c.UsuarioId == userId);
        }

        public async Task<Carrito?> GetByIdAsync(Guid id)
        {
            return await _context.Carritos.FindAsync(id);
        }
        public async Task AddAsync(Carrito carrito)
        {
            await _context.Carritos.AddAsync(carrito);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync(Carrito carrito)
        {
            _context.Carritos.Update(carrito);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(Guid id)
        {
            var carrito = await _context.Carritos.FindAsync(id);
            if (carrito != null)
            {
                _context.Carritos.Remove(carrito);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<Carrito?> GetByUserId(Guid userId)
        {
            return await _context.Carritos.FirstOrDefaultAsync(c => c.UsuarioId == userId);
        }
        public async Task<int> CountItemAsync(Guid carritoId)
        {
            return await _context.Carritos
                            .Where(c => c.Id == carritoId)
                            .Select(c => c.Items.Count)
                            .FirstOrDefaultAsync();
        }

        public async Task<bool> ExistVariantInCart(Guid carritoId, int varianteId)
        {
            return await _context.CarritoItems
                            .AnyAsync(ci => ci.CarritoId == carritoId && ci.ProductoVarianteId == varianteId);
        }
    }
}
