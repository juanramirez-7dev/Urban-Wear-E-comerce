using API.Enums;

namespace API.DTOs.PedidoItem
{
    public class PedidoItemRequestDto
    {
        public int ProductoVarianteId { get; set; }
        public int Cantidad { get; set; } 
    }
}
