using API.DTOs.Usuario;
using API.Interfaces.Services;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet("{id:guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UsuarioResponseDto>> GetById(Guid id)
        {
            try
            {
                var usuario = await _usuarioService.GetByIdAsync(id);
                var response = new UsuarioResponseDto
                {
                    Id = usuario.Id,
                    Nombre = usuario.Nombre,
                    Email = usuario.Email,
                    Telefono = usuario.Telefono
                };
                return Ok(response);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<UsuarioResponseDto>> Register([FromBody] UsuarioRequestDto request)
        {
            try
            {
                var usuario = new Usuario
                {
                    Nombre = request.Nombre,
                    PasswordHash = request.Password,
                    Email = request.Email
                };
                var createdUsuario = await _usuarioService.AddAsync(usuario);

                var response = new UsuarioResponseDto
                {
                    Id = createdUsuario.Id,
                    Nombre = createdUsuario.Nombre,
                    Email = createdUsuario.Email,
                    Telefono = createdUsuario.Telefono
                };
                return CreatedAtAction(nameof(GetById), new { id = createdUsuario.Id }, response);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id:guid}")]
        [Authorize(Roles = "Cliente")]

        public async Task<ActionResult> Update(Guid id, [FromBody] UsuarioRequestDto request)
        {
            try
            {
                var usuario = new Usuario
                {
                    Nombre = request.Nombre,
                    PasswordHash = request.Password,
                    Email = request.Email
                };
                await _usuarioService.UpdateAsync(usuario, id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpDelete("{id:guid}")]
        [Authorize(Roles = "Cliente")]
        public async Task<ActionResult> Delete(Guid id)
        {
            try
            {
                await _usuarioService.DeleteAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
