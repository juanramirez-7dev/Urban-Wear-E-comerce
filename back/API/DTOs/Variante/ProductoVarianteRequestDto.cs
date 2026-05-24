using API.Enums;

namespace API.DTOs.Variante
{
    public class ProductoVarianteRequestDto
    {
        public int Stock { get; set; }
        public string Sku { get; set; } = string.Empty;
        public Talla Talla { get; set; }
    }
}
