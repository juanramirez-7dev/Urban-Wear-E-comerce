using API.Enums;

namespace API.DTOs.Variante
{
    public class ProductoVarianteResponseDto
    {
        public int Id { get; set; }
        public int Stock { get; set; }
        public Talla Talla { get; set; }
    }
}
