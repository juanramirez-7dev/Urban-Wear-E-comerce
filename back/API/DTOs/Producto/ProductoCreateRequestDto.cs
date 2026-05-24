using API.DTOs.Variante;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Producto
{
    public class ProductoCreateRequestDto
    {
        public string Nombre { get; set; } = string.Empty;

        public string Descripcion { get; set; } = string.Empty;

        public double Precio { get; set; }

        public IFormFile ImagenPrincipal { get; set; } = null!;
        public Guid CategoriaId { get; set; }

        public ICollection<IFormFile> Imagenes { get; set; } = new List<IFormFile>();
        public string Variantes { get; set; } = string.Empty; // JSON string que representa una lista de variantes

    }
}
