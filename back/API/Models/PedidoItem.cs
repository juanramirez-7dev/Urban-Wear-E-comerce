using API.Enums;
namespace API.Models
{
    public class PedidoItem
    {
        public int Id { get; set; }
        public string ProductoNombre { get; set; } = string.Empty;
        public decimal PrecioUnitario { get; set; }
        public int Cantidad { get; set; }
        public decimal Subtotal { get; set; }
        public Talla Talla { get; set; }
        public int ProductoVarianteId { get; set; }

        public Guid PedidoId { get; set; }
        public Pedido Pedido { get; set; } = null!;

    }
}
