using API.DTOs.Categoria;
using API.Interfaces.Services;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriasController : ControllerBase
    {
        private readonly ICategoriaService _categoriaService;

        public CategoriasController(ICategoriaService categoriaService)
        {
            _categoriaService = categoriaService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoriaResponseDto>>> GetAll()
        {
            var categorias = await _categoriaService.GetAllAsync();
            var response = categorias.Select(c => new CategoriaResponseDto
            {
                Id = c.Id,
                Nombre = c.Nombre,
                Slug = c.Slug
            });

            return Ok(response);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<CategoriaResponseDto>> GetById(Guid id)
        {
            try
            {
                var categoria = await _categoriaService.GetByIdAsync(id);
                var response = new CategoriaResponseDto
                {
                    Id = categoria.Id,
                    Nombre = categoria.Nombre,
                    Slug = categoria.Slug
                };

                return Ok(response);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<CategoriaResponseDto>> Create([FromBody] CategoriaCreateRequestDto request)
        {
            try
            {
                var nuevaCategoria = new Categoria
                {
                    Nombre = request.Nombre
                };

                var createdCategoria = await _categoriaService.AddAsync(nuevaCategoria);

                var response = new CategoriaResponseDto
                {
                    Id = createdCategoria.Id,
                    Nombre = createdCategoria.Nombre,
                    Slug = createdCategoria.Slug
                };

                return CreatedAtAction(nameof(GetById), new { id = createdCategoria.Id }, response);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<CategoriaResponseDto>> Update(Guid id, [FromBody] CategoriaUpdateRequestDto request)
        {
            try
            {
                var categoriaAActualizar = new Categoria
                {
                    Id = id,
                    Nombre = request.Nombre
                };

                var updatedCategoria = await _categoriaService.UpdateAsync(categoriaAActualizar);

                var response = new CategoriaResponseDto
                {
                    Id = updatedCategoria.Id,
                    Nombre = updatedCategoria.Nombre,
                    Slug = updatedCategoria.Slug
                };

                return Ok(response);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await _categoriaService.DeleteAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
