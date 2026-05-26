using API.DTOs.PedidoItem;

namespace API.DTOs.Pedido
{
    public class PedidoResponseDto
    {
        public Guid Id { get; set; }
        public string NombreCliente { get; set; } = string.Empty;
        public string EmailCliente { get; set; } = string.Empty;
        public string TelefonoCliente { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
        public decimal Subtotal { get; set; }
        public decimal Total { get; set; }
        public DateTime PedidoFecha { get; set; } = DateTime.UtcNow;
        public DateTime FechaEntrega { get; set; } = DateTime.UtcNow.AddDays(7);

        public Guid? UsuarioId { get; set; }
        public IEnumerable<PedidoItemResponseDto> ItemsPedido { get; set; } = new List<PedidoItemResponseDto>();
    }
}
