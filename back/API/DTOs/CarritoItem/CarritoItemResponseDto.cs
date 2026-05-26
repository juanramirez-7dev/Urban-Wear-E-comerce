using API.Enums;
using API.Models;

namespace API.DTOs.CarritoItem
{
    public class CarritoItemResponseDto
    {
        public int Id { get; set; }
        public string ImagenPrincipal { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public Talla Talla { get; set; }
        public int Cantidad { get; set; }
        public double Precio { get; set; }
        public int ProductoVarianteId { get; set; }

    }
}
