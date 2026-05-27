using API.Models;

namespace API.Interfaces.Services
{
    public interface IVarianteService
    {
        Task<ICollection<ProductoVariante>> GetVariantesAsync(Guid productoId);
        Task<ProductoVariante?> AddVarianteAsyn(ProductoVariante variante);
        Task UpdateVarianteStockAsync(int varianteId, Guid productoId, int stock);
    }
}
