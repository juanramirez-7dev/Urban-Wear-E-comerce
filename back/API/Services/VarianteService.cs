using API.Interfaces.Repositories;
using API.Interfaces.Services;
using API.Models;

namespace API.Services
{
    public class VarianteService : IVarianteService
    {

        private readonly IProductoVarianteRepository _varianteRepository;
        private readonly IProductoRepository _productoRepository;

        public VarianteService(IProductoVarianteRepository varianteRepository, IProductoRepository productoRepository)
        {
            _varianteRepository = varianteRepository;
            _productoRepository = productoRepository;
        }

        public async Task<ICollection<ProductoVariante>> GetVariantesAsync(Guid productoId)
        {
            return await _varianteRepository.GetAllByProductIdAsyn(productoId);
        }
        public async Task<ProductoVariante?> AddVarianteAsyn(ProductoVariante variante)
        {
            var producto = await _productoRepository.GetByIdAsync(variante.ProductoId);
            if (producto == null)
            {
                throw new KeyNotFoundException("Producto no encontrado");
            }
            if (await _varianteRepository.ExistVarianteWithTalla(variante.Id, variante.Talla))
            {
                throw new InvalidOperationException("La variante con la misma talla ya existe");
            }

            await _varianteRepository.AddAsync(variante);
            return variante;
        }
        public async Task UpdateVarianteStockAsync(int varianteId, Guid productoId, int stock)
        {
            var producto = await _productoRepository.GetByIdAsync(productoId);
            if (producto == null)
            {
                throw new KeyNotFoundException("Producto no encontrado");
            }
            var existingVariante = await _varianteRepository.GetByIdAsync(varianteId);
            if (existingVariante == null)
            {
                throw new KeyNotFoundException("Variante no encontrada");
            }
            if (stock < 0)
            {
                throw new InvalidOperationException("El stock no puede ser negativo");
            }
            existingVariante.Stock = stock;
            await _varianteRepository.UpdateAsync(existingVariante);

        }

    }
}
