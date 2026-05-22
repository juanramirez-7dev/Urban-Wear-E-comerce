using API.DTOs.Producto;
using API.Interfaces.Services;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly IProductoService _productoService;

        public ProductosController(IProductoService productoService)
        {
            _productoService = productoService;
        }

        [HttpGet]
        public async Task<ActionResult<ProductoPagedResponseDto>> GetAll([FromQuery] int limit = 10, [FromQuery] int offset = 0, [FromQuery] Guid? categoriaId = null, [FromQuery] decimal? precio = null)
        {
            if (limit <= 0)
            {
                return BadRequest(new { message = "El parámetro limit debe ser mayor a 0." });
            }

            if (offset < 0)
            {
                return BadRequest(new { message = "El parámetro offset no puede ser negativo." });
            }

            var result = await _productoService.GetPagedAsync(limit, offset, categoriaId, precio);

            var items = result.Items.Select(p => new ProductoResponseDto
            {
                Id = p.Id,
                Nombre = p.Nombre,
                Descripcion = p.Descripcion,
                Precio = p.Precio,
                ImagenPrincipal = p.ImagenPrincipal,
                CategoriaId = p.CategoriaId,
                CategoriaNombre = p.Categoria?.Nombre ?? string.Empty
            });

            var response = new ProductoPagedResponseDto
            {
                Items = items,
                Total = result.Total,
                Limit = limit,
                Offset = offset
            };

            return Ok(response);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<ProductoResponseDto>> GetById(Guid id)
        {
            try
            {
                var producto = await _productoService.GetByIdAsync(id);

                var response = new ProductoResponseDto
                {
                    Id = producto.Id,
                    Nombre = producto.Nombre,
                    Descripcion = producto.Descripcion,
                    Precio = producto.Precio,
                    ImagenPrincipal = producto.ImagenPrincipal,
                    CategoriaId = producto.CategoriaId,
                    CategoriaNombre = producto.Categoria?.Nombre ?? string.Empty
                };

                return Ok(response);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ProductoResponseDto>> Create([FromBody] ProductoCreateRequestDto request)
        {
            try
            {
                var producto = new Producto
                {
                    Nombre = request.Nombre,
                    Descripcion = request.Descripcion,
                    Precio = request.Precio,
                    ImagenPrincipal = request.ImagenPrincipal,
                    CategoriaId = request.CategoriaId
                };

                var created = await _productoService.AddAsync(producto);

                var response = new ProductoResponseDto
                {
                    Id = created.Id,
                    Nombre = created.Nombre,
                    Descripcion = created.Descripcion,
                    Precio = created.Precio,
                    ImagenPrincipal = created.ImagenPrincipal,
                    CategoriaId = created.CategoriaId,
                    CategoriaNombre = created.Categoria?.Nombre ?? string.Empty
                };

                return CreatedAtAction(nameof(GetById), new { id = created.Id }, response);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpPut("{id:guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ProductoResponseDto>> Update(Guid id, [FromBody] ProductoUpdateRequestDto request)
        {
            try
            {
                var producto = new Producto
                {
                    Id = id,
                    Nombre = request.Nombre,
                    Descripcion = request.Descripcion,
                    Precio = request.Precio,
                    ImagenPrincipal = request.ImagenPrincipal,
                    CategoriaId = request.CategoriaId
                };

                var updated = await _productoService.UpdateAsync(producto);

                var response = new ProductoResponseDto
                {
                    Id = updated.Id,
                    Nombre = updated.Nombre,
                    Descripcion = updated.Descripcion,
                    Precio = updated.Precio,
                    ImagenPrincipal = updated.ImagenPrincipal,
                    CategoriaId = updated.CategoriaId,
                    CategoriaNombre = updated.Categoria?.Nombre ?? string.Empty
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
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await _productoService.DeleteAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
