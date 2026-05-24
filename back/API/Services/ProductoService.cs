using API.Context;
using API.Interfaces.Repositories;
using API.Interfaces.Services;
using API.Models;

namespace API.Services
{
    public class ProductoService : IProductoService
    {
        private readonly IProductoRepository _repository;
        private readonly ICategoriaRepository _categoriaRepository;
        private readonly IProductoVarianteRepository _varianteRepository;
        private readonly IFileService _fileService;
        private readonly IImagenRepository _imagenrepository;
        private readonly AppDbContext _context;

        public ProductoService(
                IProductoRepository repository,
                ICategoriaRepository categoryRepository,
                IProductoVarianteRepository varianteRepository,
                IFileService fileService,
                IImagenRepository imagenrepository,
                AppDbContext context
            )
        {
            _repository = repository;
            _categoriaRepository = categoryRepository;
            _fileService = fileService;
            _varianteRepository = varianteRepository;
            _imagenrepository = imagenrepository;
            _context = context;
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

        public async Task<Producto> AddAsync(
                Producto producto,
                IFormFile ImagenPrincipal,
                ICollection<IFormFile> Imagenes,
                ICollection<ProductoVariante> Variantes

            )
        {
            if (producto.Precio < 0)
            {
                throw new InvalidOperationException("El precio del producto no puede ser negativo.");
            }

            var existing = await _categoriaRepository.GetByIdAsync(producto.CategoriaId);

            if (existing == null)
            {
                throw new KeyNotFoundException($"No existe la categoria con el ID {producto.CategoriaId}");
            }

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // Guardar el producto
                var productoId = Guid.NewGuid();
                string imagenPrincipalUrl = await _fileService.SaveFileAsync(ImagenPrincipal);
                producto.Id = productoId;
                producto.ImagenPrincipal = imagenPrincipalUrl;
                await _repository.AddAsync(producto);

                // Guardar las imágenes del producto
                foreach (var file in Imagenes)
                {
                    string url = await _fileService.SaveFileAsync(file);
                    var productoImagen = new ProductoImagen
                    {
                        Url = url,
                        ProductoId = productoId
                    };
                    await _imagenrepository.AddAsync(productoImagen);
                }

                // Guardar las variantes del producto
                foreach (var variante in Variantes)
                {
                    variante.ProductoId = productoId;
                    await _varianteRepository.AddAsync(variante);
                }
                    
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return producto;

            }
            catch (InvalidOperationException)
            {
                await transaction.RollbackAsync();
                throw;
            }

        }

        public async Task UpdateAsync(Producto producto)
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
