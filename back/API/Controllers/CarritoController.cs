using API.DTOs.Carrito;
using API.DTOs.CarritoItem;
using API.Interfaces.Services;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Cliente")]
    public class CarritoController : ControllerBase
    {
        private readonly ICarritoService _service;
        protected Guid UserId => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        public CarritoController(ICarritoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<CarritoResponseDto>> GetCart()
        {
            try
            {

                var carrito = await _service.GetCartByUser(UserId);
                return Ok(new CarritoResponseDto
                {
                    Id = carrito.Id,
                    Items = carrito.Items.Select(i => new CarritoItemResponseDto
                    {
                        Id = i.Id,
                        ImagenPrincipal = i.ProductoVariante.Producto.ImagenPrincipal,
                        Nombre = i.ProductoVariante.Producto.Nombre,
                        Talla = i.ProductoVariante.Talla,
                        Cantidad = i.Cantidad,
                        Precio = i.ProductoVariante.Producto.Precio,
                        ProductoVarianteId = i.ProductoVarianteId
                    }).ToList()
                });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }

        }

        [HttpPost("item")]
        public async Task<ActionResult> AddItem([FromBody] CarritoItemRequestDto itemDto)
        {
            try
            {
                var item = new CarritoItem
                {
                    CarritoId = itemDto.CarritoId,
                    ProductoVarianteId = itemDto.ProductoVarianteId,
                    Cantidad = itemDto.Cantidad
                };
                await _service.AddItem(UserId, item);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
        }

        [HttpDelete("item/{itemId}")]
        public async Task<ActionResult> DeleteItem(int itemId)
        {
            try
            {
                await _service.DeleteItem(UserId, itemId);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
        }

        [HttpPatch("item/{itemId}/cantidad")]
        public async Task<ActionResult> UpdateItem(int itemId, [FromBody] UpdateCuantityDto dto)
        {
            try
            {
                await _service.UpdateItem(UserId, itemId, dto.Cantidad);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> ClearCart()
        {
            try
            {
                await _service.DeleteAsync(UserId);
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
    }
}
