using API.Context;
using API.Enums;
using API.Interfaces.Repositories;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class ProductoVarianteRepository : IProductoVarianteRepository
    {
        private readonly AppDbContext _context;

        public ProductoVarianteRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ProductoVariante?> GetByIdAsync(int id)
        {
            return await _context.ProductoVariantes.Include(pv => pv.Producto).FirstOrDefaultAsync(pv => pv.Id == id);
        }
        public async Task AddAsync(ProductoVariante enity)
        {
            await _context.ProductoVariantes.AddAsync(enity);
        }
        public async Task UpdateAsync(ProductoVariante enity)
        {
            _context.ProductoVariantes.Update(enity);
            await _context.SaveChangesAsync();
        }

        public async Task<ICollection<ProductoVariante>> GetAllByProductIdAsyn(Guid productId)
        {
            return await _context.ProductoVariantes.Where(pv => pv.ProductoId == productId).ToListAsync();
        }

        public async Task<bool> ExistVarianteWithTalla(int varianteId, Talla talla)
        {
            return await _context.ProductoVariantes.AnyAsync(pv => pv.Id == varianteId && pv.Talla == talla);
        }
    }
}
