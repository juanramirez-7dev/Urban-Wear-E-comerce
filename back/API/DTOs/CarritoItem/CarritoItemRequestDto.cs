using API.Models;

namespace API.DTOs.CarritoItem
{
    public class CarritoItemRequestDto
    {
        public int Cantidad { get; set; }
        public Guid CarritoId { get; set; }
        public int ProductoVarianteId { get; set; }
    }
}
