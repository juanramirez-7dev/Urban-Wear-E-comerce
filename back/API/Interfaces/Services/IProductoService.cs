using API.Models;

namespace API.Interfaces.Services
{
    public interface IProductoService
    {
        Task<(IEnumerable<Producto> Items, int Total)> GetPagedAsync(int limit, int offset, Guid? categoriaId, decimal? min, decimal? max);
        Task<Producto> GetByIdAsync(Guid id);
        Task<Producto> AddAsync(Producto producto,
                IFormFile ImagenPrincipal,
                ICollection<IFormFile> Imagenes,
                ICollection<ProductoVariante> Variantes);
        Task UpdateAsync(Producto producto);
        Task DeleteAsync(Guid id);
        Task<ICollection<ProductoVariante>> GetVariantesAsync(Guid id);
    }
}
