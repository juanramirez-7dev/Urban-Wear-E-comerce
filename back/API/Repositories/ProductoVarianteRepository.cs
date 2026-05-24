using API.Context;
using API.Interfaces.Repositories;
using API.Models;

namespace API.Repositories
{
    public class ProductoVarianteRepository : IProductoVarianteRepository
    {
        private readonly AppDbContext _context;

        public ProductoVarianteRepository(AppDbContext context)
        {
            _context = context;
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
    }
}
