using API.DTOs.Variante;
using API.Interfaces.Services;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/Producto/{id:guid}/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class VarianteController : ControllerBase
    {

        private readonly IVarianteService _varianteService;

        public VarianteController(IVarianteService varianteService)
        {
            _varianteService = varianteService;
        }


        [HttpGet]
        public async Task<ActionResult<ICollection<ProductoVarianteResponseDto>>> GetAll(Guid id)
        {
            var variantes = await _varianteService.GetVariantesAsync(id);
            return Ok(variantes.Select(v => new ProductoVarianteResponseDto
            {
                Id = v.Id,
                Stock = v.Stock,
                Talla = v.Talla
            }).ToList());
        }

        [HttpPost]
        public async Task<ActionResult<ProductoVarianteResponseDto>> Create(Guid id, [FromBody] ProductoVarianteRequestDto request)
        {
            try
            {
                var variante = new ProductoVariante
                {
                    Stock = request.Stock,
                    Sku = request.Sku,
                    Talla = request.Talla,
                    ProductoId = id
                };
                await _varianteService.AddVarianteAsyn(variante);
                return Ok(new ProductoVarianteResponseDto
                {
                    Id = variante.Id,
                    Stock = variante.Stock,
                    Talla = variante.Talla
                });
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

        [HttpPatch("{varianteId:int}/stock")]
        public async Task<ActionResult> UpdateStock(Guid id, int varianteId, [FromBody] UpdateVarianteStockDto request)
        {
            try
            {
                await _varianteService.UpdateVarianteStockAsync(varianteId, id, request.Stock);
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
