using API.DTOs.Pedido;
using API.DTOs.PedidoItem;
using API.Interfaces.Services;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.TagHelpers;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidosController : ControllerBase
    {
        private readonly IPedidoService _service;
        public PedidosController(IPedidoService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<Pedido>>> GetAll()
        {
            try
            {
                var pedidos = await _service.GetAllAsync();
                return Ok(pedidos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener los pedidos: {ex.Message}");
            }
        }

        [HttpGet("my-orders")]
        [Authorize(Roles = "Cliente")]
        public async Task<ActionResult<IEnumerable<PedidoResponseDto>>> GetMyOrders()
        {
            try
            {
                var userId = User.FindFirst(
                    System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

                if (!Guid.TryParse(userId, out var usuarioId))
                {
                    return Unauthorized("Usuario no autenticado");
                }

                var pedidos = await _service.GetAllByUsuarioIdAsync(usuarioId);
                var response = pedidos.Select(p => new PedidoResponseDto
                {
                    Id = p.Id,
                    NombreCliente = p.NombreCliente,
                    EmailCliente = p.EmailCliente,
                    Direccion = p.Direccion,
                    TelefonoCliente = p.TelefonoCliente,
                    PedidoFecha = p.PedidoFecha,
                    FechaEntrega = p.FechaEntrega,
                    UsuarioId = p.UsuarioId,
                    ItemsPedido = p.ItemsPedido.Select(i => new PedidoItemResponseDto
                    {
                        Id = i.Id,
                        Cantidad = i.Cantidad,
                        Subtotal = i.Subtotal,
                        NombreProducto = i.ProductoNombre,
                        Talla = i.Talla,
                        PedidoId = i.PedidoId
                    }).ToList()
                });
                return Ok(response);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("{id:guid}")]
        [Authorize(Roles ="Admin")]
        public async Task<ActionResult<PedidoResponseDto>> GetById(Guid id)
        {
            try
            {
                var pedido = await _service.GetByIdAsync(id);
                var response = new PedidoResponseDto
                {
                    Id = pedido.Id,
                    NombreCliente = pedido.NombreCliente,
                    EmailCliente = pedido.EmailCliente,
                    Direccion = pedido.Direccion,
                    TelefonoCliente = pedido.TelefonoCliente,
                    PedidoFecha = pedido.PedidoFecha,
                    FechaEntrega = pedido.FechaEntrega,
                    UsuarioId = pedido.UsuarioId,

                };
                return Ok(response);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<PedidoResponseDto>> Create(PedidoRequestDto dto)
        {
            try
            {
                Guid? usuarioId = null;

                var userIdClaim = User.FindFirst(
                    System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                if (Guid.TryParse(userIdClaim, out var parsedUserId))
                {
                    usuarioId = parsedUserId;
                }

                var createdPedido = new Pedido
                {
                    UsuarioId = usuarioId,
                    NombreCliente = dto.NombreCliente,
                    EmailCliente = dto.EmailCliente,
                    TelefonoCliente = dto.TelefonoCliente,
                    Direccion = dto.Direccion
                };
                var created = await _service.AddAsync(createdPedido);

                return CreatedAtAction(nameof(GetById), new { id = created.Id }, new PedidoResponseDto
                {
                    Id = created.Id,
                    NombreCliente = created.NombreCliente,
                    EmailCliente = created.EmailCliente,
                    Direccion = created.Direccion,
                    TelefonoCliente = created.TelefonoCliente,
                    PedidoFecha = created.PedidoFecha,
                    FechaEntrega = created.FechaEntrega,
                    UsuarioId = created.UsuarioId,
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
