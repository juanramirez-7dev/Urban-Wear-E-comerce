using API.DTOs.Imagen;
using API.DTOs.Variante;

namespace API.DTOs.Producto
{
    public class ProductoDetalleResponseDto
    {
        public Guid Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public decimal Precio { get; set; }
        public string ImagenPrincipal { get; set; } = string.Empty;
        public ICollection<ProductImageResponseDto> Imagenes { get; set; } = new List<ProductImageResponseDto>();
        public ICollection<ProductoVarianteResponseDto> Variantes { get; set; }  = new List<ProductoVarianteResponseDto>();
    }
}
