namespace API.DTOs.Pedido
{
    public class PedidoResponseDto
    {
        public Guid Id { get; set; }
        public string NombreCliente { get; set; } = string.Empty;
        public string EmailCliente { get; set; } = string.Empty;
        public string TelefonoCliente { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
        public double Subtotal { get; set; }
        public double Total { get; set; }
        public DateTime PedidoFecha { get; set; } = DateTime.UtcNow;
        public DateTime FechaEntrega { get; set; } = DateTime.UtcNow.AddDays(7);

        public Guid? UsuarioId { get; set; }
    }
}
