using API.DTOs.Imagen;
using API.DTOs.Producto;
using API.DTOs.Variante;
using API.Interfaces.Services;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

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
                Precio = p.Precio,
                ImagenPrincipal = p.ImagenPrincipal,
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
        public async Task<ActionResult<ProductoDetalleResponseDto>> GetById(Guid id)
        {
            try
            {
                var producto = await _productoService.GetByIdAsync(id);

                var response = new ProductoDetalleResponseDto
                {
                    Id = producto.Id,
                    Nombre = producto.Nombre,
                    Descripcion = producto.Descripcion,
                    Precio = producto.Precio,
                    ImagenPrincipal = producto.ImagenPrincipal,
                    Imagenes = producto.Imagenes.Select(i => new ProductImageResponseDto
                    {
                        Id = i.Id,
                        Url = i.Url
                    }).ToList(),
                    Variantes = producto.Variantes.Select(v => new ProductoVarianteResponseDto
                    {
                        Id = v.Id,
                        Stock = v.Stock,
                        Talla = v.Talla
                    }).ToList()
                };

                return Ok(response);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<ProductoResponseDto>> Create([FromForm] ProductoCreateRequestDto request)
        {
            try
            {
                var producto = new Producto
                {
                    Nombre = request.Nombre,
                    Descripcion = request.Descripcion,
                    Precio = request.Precio,
                    CategoriaId = request.CategoriaId
                };

                var variantes = JsonSerializer.Deserialize<List<ProductoVarianteRequestDto>>(request.Variantes);
                Console.WriteLine(variantes);
                if (variantes == null || !variantes.Any())
                {
                    throw new InvalidOperationException("Variantes inválidas");
                }

                var variantesEntities = variantes.Select(v => new ProductoVariante
                {
                    Stock = v.Stock,
                    Sku = v.Sku,
                    Talla = v.Talla
                }).ToList();

                var created = await _productoService.AddAsync(producto, request.ImagenPrincipal, request.Imagenes, variantesEntities);

                var response = new ProductoResponseDto
                {
                    Id = created.Id,
                    Nombre = created.Nombre,
                    Precio = created.Precio,
                    ImagenPrincipal = created.ImagenPrincipal
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
        public async Task<ActionResult> Update(Guid id, [FromBody] ProductoUpdateRequestDto request)
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

                await _productoService.UpdateAsync(producto);
                return Ok();
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
