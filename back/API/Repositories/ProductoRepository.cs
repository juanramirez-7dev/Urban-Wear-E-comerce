using API.Context;
using API.Interfaces.Repositories;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class ProductoRepository : IProductoRepository
    {
        private readonly AppDbContext _context;

        public ProductoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Producto>> GetAllAsync()
        {
            return await _context.Productos
                .Include(p => p.Categoria)
                .ToListAsync();
        }

        public async Task<(IEnumerable<Producto> Items, int Total)> GetPagedAsync(int limit, int offset, Guid? categoriaId, decimal? min, decimal? max)
        {
            var query = _context.Productos
                .Include(p => p.Categoria)
                .AsQueryable();

            if (categoriaId.HasValue)
            {
                query = query.Where(p => p.CategoriaId == categoriaId);
            }

            if (min.HasValue)
            {
                query = query.Where(p => (decimal)p.Precio >= min);
            }

            if (max.HasValue)
            {
                query = query.Where(p => (decimal)p.Precio <= max);
            }

            var total = await query.CountAsync();

            var items = await query
                .Skip(offset)
                .Take(limit)
                .ToListAsync();

            return (items, total);
        }

        public async Task<Producto?> GetByIdAsync(Guid id)
        {
            return await _context.Productos
                .Include(p => p.Imagenes)
                .Include(p => p.Variantes)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task AddAsync(Producto producto)
        {
            await _context.Productos.AddAsync(producto);
        }

        public async Task UpdateAsync(Producto producto)
        {
            _context.Productos.Update(producto);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto != null)
            {
                _context.Productos.Remove(producto);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Producto>> GetByCategoryIdAsync(Guid Id)
        {
            return await _context.Productos.Where(p => p.CategoriaId == Id).ToListAsync();
        }

    }
}
