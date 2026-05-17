using API.Interfaces.Repositories;
using API.Interfaces.Services;
using API.Models;
using System.Text.RegularExpressions;

namespace API.Services
{
    public class CategoriaService : ICategoriaService
    {
        private readonly ICategoriaRepository _repository;
        private readonly IProductoRepository _productoRepository;

        public CategoriaService(ICategoriaRepository repository, IProductoRepository productoRepository)
        {
            _repository = repository;
            _productoRepository = productoRepository;
        }

        public async Task<IEnumerable<Categoria>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Categoria> GetByIdAsync(Guid id)
        {
            var categoria = await _repository.GetByIdAsync(id);
            if (categoria == null)
            {
                throw new KeyNotFoundException($"No se encontró la categoría con el ID {id}");
            }
            return categoria;
        }

        public async Task<Categoria> AddAsync(Categoria categoria)
        {
            var existingCategory = await _repository.GetByNameAsync(categoria.Nombre);
            if (existingCategory != null)
            {
                throw new InvalidOperationException($"La categoría con el nombre '{categoria.Nombre}' ya existe.");
            }

            categoria.Id = Guid.NewGuid();
            categoria.Slug = GenerateSlug(categoria.Nombre);

            await _repository.AddAsync(categoria);
            return categoria;
        }

        public async Task<Categoria> UpdateAsync(Categoria categoria)
        {
            var existingCategory = await _repository.GetByIdAsync(categoria.Id);
            if (existingCategory == null)
            {
                throw new KeyNotFoundException($"No se encontró la categoría con el ID {categoria.Id}");
            }

            var duplicateCheck = await _repository.GetByNameAsync(categoria.Nombre);
            if (duplicateCheck != null && duplicateCheck.Id != categoria.Id)
            {
                throw new InvalidOperationException($"La categoría con el nombre '{categoria.Nombre}' ya existe.");
            }

            existingCategory.Nombre = categoria.Nombre;
            existingCategory.Slug = GenerateSlug(categoria.Nombre);

            await _repository.UpdateAsync(existingCategory);
            return existingCategory;
        }

        public async Task DeleteAsync(Guid id)
        {
            var existingCategory = await _repository.GetByIdAsync(id);
            if (existingCategory == null)
            {
                throw new KeyNotFoundException($"No se encontró la categoría con el ID {id}");
            }
            var productos = await _productoRepository.GetByCategoryIdAsync(id);
            if (productos.Any())
            {
                throw new InvalidOperationException($"No se puede eliminar la categoría con el ID {id} porque tiene productos asociados.");
            }

            await _repository.DeleteAsync(id);
        }

        private string GenerateSlug(string target)
        {
            var slug = target.Trim().ToLowerInvariant();
            slug = Regex.Replace(slug, @"[^a-z0-9\s-]", "");
            slug = Regex.Replace(slug, @"\s+", "-").Trim('-');
            return slug;
        }
    }
}