using API.DTOs.Estadisticas;
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

        [HttpGet("{id}/factura")]
        public async Task<IActionResult> DescargarFactura(Guid id)
        {
            try
            {
                var pdf = await _service.GenerarFacturaPdfAsync(id);

                return File(
                    pdf,
                    "application/pdf",
                    $"factura-{id}.pdf"
                );
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new
                {
                    message = ex.Message
                });
            }
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<PedidoResponseDto>>> GetAll()
        {
                var pedidos = await _service.GetAllAsync();
                var response = pedidos.Select(p => new PedidoResponseDto
                {
                    Id = p.Id,
                    NombreCliente = p.NombreCliente,
                    EmailCliente = p.EmailCliente,
                    Direccion = p.Direccion,
                    Subtotal= p.Subtotal,
                    Total=p.Total,
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
        public async Task<ActionResult<PedidoResponseDto>> GetById(Guid id)
        {
            try
            {
                var pedido = await _service.GetByIdAsync(id);
                var itemsPedido = await _service.GetItemsByPedidoIdAsync(id);
                var itemsResponse = itemsPedido.Select(i => new PedidoItemResponseDto
                {
                    Id = i.Id,
                    Cantidad = i.Cantidad,
                    Subtotal = i.Subtotal,
                    NombreProducto = i.ProductoNombre,
                    Talla = i.Talla,
                    PedidoId = i.PedidoId
                }).ToList();

                var response = new PedidoResponseDto
                {
                    Id = pedido.Id,
                    NombreCliente = pedido.NombreCliente,
                    EmailCliente = pedido.EmailCliente,
                    TelefonoCliente = pedido.TelefonoCliente,
                    Direccion = pedido.Direccion,
                    PedidoFecha = pedido.PedidoFecha,
                    FechaEntrega = pedido.FechaEntrega,
                    UsuarioId = pedido.UsuarioId,
                    Subtotal = pedido.Subtotal,
                    Total = pedido.Total,
                    ItemsPedido = itemsResponse
                };
                return Ok(response);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{pedidoId}/Item/{Id}")]
        [Authorize(Roles = "Admin,Cliente")]
        public async Task<ActionResult<PedidoItemResponseDto>> GetPedidoItemByIdAsync(int id, Guid pedidoId)
        {
            try
            {
                var item = await _service.GetItemByIdOnPedidoAsync(id, pedidoId);
                var response = new PedidoItemResponseDto
                {
                    Id = item.Id,
                    Cantidad = item.Cantidad,
                    Subtotal = item.Subtotal,
                    NombreProducto = item.ProductoNombre,
                    Talla = item.Talla,
                    PedidoId = item.PedidoId
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
                    Direccion = dto.Direccion,
                    ItemsPedido = dto.ItemsPedido.Select(i => new PedidoItem
                    {
                        Cantidad = i.Cantidad,
                        ProductoVarianteId = i.ProductoVarianteId,
                    }).ToList()
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
                    Subtotal = created.Subtotal,
                    Total = created.Total,
                    ItemsPedido = created.ItemsPedido.Select(i => new PedidoItemResponseDto
                    {
                        Id = i.Id,
                        Cantidad = i.Cantidad,
                        Subtotal = i.Subtotal,
                        NombreProducto = i.ProductoNombre,
                        Talla = i.Talla,
                        PedidoId = i.PedidoId
                    }).ToList()
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
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("dashboard")]
        public async Task<ActionResult<EstadisticasDashboardDto>> ObtenerDashboard()
        {
            var estadisticas = await _service.ObtenerEstadisticasDashboardAsync();

            return Ok(estadisticas);
        }
    }
}
