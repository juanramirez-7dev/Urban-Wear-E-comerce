using API.DTOs.PedidoItem;

namespace API.DTOs.Pedido
{
    public class PedidoRequestDto
    {
        public string NombreCliente { get; set; } = string.Empty;
        public string TelefonoCliente { get; set; } = string.Empty;
        public string EmailCliente { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
        public IEnumerable<PedidoItemRequestDto> ItemsPedido { get; set; } = new List<PedidoItemRequestDto>();

    }
}
