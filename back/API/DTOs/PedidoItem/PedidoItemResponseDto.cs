using API.Enums;

namespace API.DTOs.PedidoItem
{
    public class PedidoItemResponseDto
    {
        public int Id { get; set; }
        public string NombreProducto { get; set; } = string.Empty;
        public Talla Talla { get; set; }
        public int Cantidad { get; set; }
        public decimal Subtotal { get; set; }
        public Guid PedidoId { get; set; }
    }
}
