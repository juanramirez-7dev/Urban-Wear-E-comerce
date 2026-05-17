using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Categoria
{
    public class CategoriaUpdateRequestDto
    {
        [Required(ErrorMessage = "El nombre de la categoría es requerido")]
        [StringLength(100, ErrorMessage = "El nombre no puede exceder los 100 caracteres")]
        public string Nombre { get; set; } = string.Empty;
    }
}