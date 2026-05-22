using API.Interfaces.Repositories;
using API.Interfaces.Services;
using API.Models;

namespace API.Services
{
    public class ProductoService : IProductoService
    {
        private readonly IProductoRepository _repository;
        private readonly ICategoriaRepository _categoriaRepository;

        public ProductoService(IProductoRepository repository,ICategoriaRepository categoryRepository)
        {
            _repository = repository;
            _categoriaRepository = categoryRepository;
        }

        public async Task<IEnumerable<Producto>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<(IEnumerable<Producto> Items, int Total)> GetPagedAsync(int limit, int offset, Guid? categoriaId, decimal? precio)
        {
            return await _repository.GetPagedAsync(limit, offset, categoriaId, precio);
        }

        public async Task<Producto> GetByIdAsync(Guid id)
        {
            var producto = await _repository.GetByIdAsync(id);
            if (producto == null)
            {
                throw new KeyNotFoundException($"No se encontró el producto con el ID {id}");
            }

            return producto;
        }

        public async Task<Producto> AddAsync(Producto producto)
        {
            if (producto.Precio < 0)
            {
                throw new InvalidOperationException("El precio del producto no puede ser negativo.");
            }

            if (producto.CategoriaId == Guid.Empty)
            {
                throw new InvalidOperationException("El producto debe tener un CategoriaId válido.");
            }

            var existing = await _categoriaRepository.GetByIdAsync(producto.CategoriaId);

            if (existing == null)
            {
                throw new KeyNotFoundException($"No existe la categoria con el ID {producto.CategoriaId}");
            }

            producto.Id = Guid.NewGuid();

            await _repository.AddAsync(producto);
            return producto;
        }

        public async Task<Producto> UpdateAsync(Producto producto)
        {
            if (producto.Precio < 0)
            {
                throw new InvalidOperationException("El precio del producto no puede ser negativo.");
            }

            if (producto.CategoriaId == Guid.Empty)
            {
                throw new InvalidOperationException("El producto debe tener un CategoriaId válido.");
            }

            var existing = await _repository.GetByIdAsync(producto.Id);
            if (existing == null)
            {
                throw new KeyNotFoundException($"No se encontró el producto con el ID {producto.Id}");
            }

            existing.Nombre = producto.Nombre;
            existing.Descripcion = producto.Descripcion;
            existing.Precio = producto.Precio;
            existing.ImagenPrincipal = producto.ImagenPrincipal;
            existing.CategoriaId = producto.CategoriaId;

            await _repository.UpdateAsync(existing);
            return existing;
        }

        public async Task DeleteAsync(Guid id)
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null)
            {
                throw new KeyNotFoundException($"No se encontró el producto con el ID {id}");
            }

            await _repository.DeleteAsync(id);
        }
    }
}
