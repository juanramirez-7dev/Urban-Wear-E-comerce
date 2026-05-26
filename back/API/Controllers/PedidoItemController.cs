using API.DTOs.PedidoItem;
using API.Interfaces.Services;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidoItemController : ControllerBase
    {
        private readonly IPedidoItemService _service;
        public PedidoItemController(IPedidoItemService service)
        {
            _service = service;
        }

        [HttpGet("pedido/{pedidoId}")]
        [Authorize(Roles = "Admin,Cliente")]
        public async Task<IActionResult> GetAllByPedidoId(Guid pedidoId)
        {
            try
            {
                var items = await _service.GetAllByPedidoIdAsync(pedidoId);
                return Ok(items);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("{id}/pedido/{pedidoId}")]
        [Authorize(Roles = "Admin,Cliente")]
        public IActionResult GetById(int id, Guid pedidoId)
        {
            try
            {
                var item = _service.GetByIdAsync(id, pedidoId);
                return Ok(item);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        
    }
}
