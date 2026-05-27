using API.Models;

namespace API.Interfaces.Repositories
{
    public interface ICodigoRecuperacionRepository
    {
        Task AddAsync(CodigoRecuperacion codigoRecuperacion);
        Task<CodigoRecuperacion?> GetCodeByUsuarioIdAsync(Guid usuarioId);
        Task UpdateAsync(CodigoRecuperacion codigoRecuperacion);
    }
}
