using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Producto
{
    public class ProductoUpdateRequestDto
    {
        [Required(ErrorMessage = "El nombre del producto es requerido")]
        public string Nombre { get; set; } = string.Empty;

        [Required(ErrorMessage = "La descripción del producto es requerida")]
        public string Descripcion { get; set; } = string.Empty;

        [Required(ErrorMessage = "El precio del producto es requerido")]
        public double Precio { get; set; }

        [Required(ErrorMessage = "La imagen principal es requerida")]
        public string ImagenPrincipal { get; set; } = string.Empty;

        [Required(ErrorMessage = "La categoría es requerida")]
        public Guid CategoriaId { get; set; }
    }
}
