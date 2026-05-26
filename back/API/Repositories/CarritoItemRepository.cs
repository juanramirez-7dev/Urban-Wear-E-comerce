using API.Context;
using API.Interfaces.Repositories;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class CarritoItemRepository : ICarritoItemRepository
    {
        private readonly AppDbContext _context;

        public CarritoItemRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<CarritoItem?> GetByIdAsync(int id)
        {
            return await _context.CarritoItems.FindAsync(id);
        }
        public async Task AddAsync(CarritoItem carritoItem)
        {
            await _context.CarritoItems.AddAsync(carritoItem);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync(CarritoItem carritoItem)
        {
            _context.CarritoItems.Update(carritoItem);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var carritoItem = await _context.CarritoItems.FindAsync(id);
            if (carritoItem != null)
            {
                _context.CarritoItems.Remove(carritoItem);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<ICollection<CarritoItem>> GetByCarritoId(Guid carritoId)
        {
            return await _context.CarritoItems.Where(ci => ci.CarritoId == carritoId).ToListAsync();
        }
    }
}
