using API.Context;
using API.Interfaces.Repositories;
using API.Models;

namespace API.Repositories
{
    public class ImagenRepository : IImagenRepository
    {
        private readonly AppDbContext _context;

        public ImagenRepository(AppDbContext context)
        {
            _context = context;
        }


        public async Task AddAsync(ProductoImagen entity)
        {
            await _context.ProductoImagenes.AddAsync(entity);
            
        }
    }
}
