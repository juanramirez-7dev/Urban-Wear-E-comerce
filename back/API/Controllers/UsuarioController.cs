using API.DTOs.Usuario;
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
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        private readonly IEmailService _emailService;
        public UsuarioController(IUsuarioService usuarioService, IEmailService emailService)
        {
            _usuarioService = usuarioService;
            _emailService = emailService;
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
                    Telefono = request.Telefono,
                    Email = request.Email,
                    PasswordHash = request.Password 

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

        public async Task<ActionResult> Update(Guid id, [FromBody] UsuarioUpdateRequestDto request)
        {
            try
            {
                var usuario = new Usuario
                {
                    Nombre = request.Nombre,
                    Email = request.Email,
                    Telefono = request.Telefono
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
            catch (InvalidOperationException ex)
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

        [HttpPatch("password")]
        [Authorize(Roles = "Cliente")]
        public async Task<ActionResult> UpdatePassword(UpdatePasswordDto request)
        {
            try
            {
                Guid userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
                await _usuarioService.UpdatePasswordAsync(userId, request.CurrentPassword, request.NewPassword);
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
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("recuperar-password")]
        public async Task<ActionResult> RequestPasswordRecovery(string email)
        {
            try
            {
                var usuario = await _usuarioService.GetByEmailAsync(email);
                var codigo = await _usuarioService.GenerarCodigoDeRecuperacion(usuario.Id);
                await _emailService.SendEmailAsync(usuario.Email, "Recuperación de contraseña", $"Tu código de recuperación es: {codigo.Codigo}");
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
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
