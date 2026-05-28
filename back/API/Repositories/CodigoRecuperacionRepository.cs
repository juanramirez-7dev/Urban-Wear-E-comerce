using API.Context;
using API.Interfaces.Repositories;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class CodigoRecuperacionRepository : ICodigoRecuperacionRepository
    {
        private readonly AppDbContext _context;
        public CodigoRecuperacionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(CodigoRecuperacion codigoRecuperacion)
        {
            await _context.CodigosRecuperacion.AddAsync(codigoRecuperacion);
            await _context.SaveChangesAsync();
        }
        public async Task<CodigoRecuperacion?> GetCodeByUsuarioIdAsync(Guid usuarioId)
        {
            return await _context.CodigosRecuperacion.FirstOrDefaultAsync(c => c.UserId == usuarioId);
        }

        public async Task UpdateAsync(CodigoRecuperacion codigoRecuperacion)
        {
            _context.CodigosRecuperacion.Update(codigoRecuperacion);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var codigoRecuperacion = await _context.CodigosRecuperacion.FindAsync(id);
            if (codigoRecuperacion != null)
            {
                _context.CodigosRecuperacion.Remove(codigoRecuperacion);
                await _context.SaveChangesAsync();
            }
        }
    }
}
