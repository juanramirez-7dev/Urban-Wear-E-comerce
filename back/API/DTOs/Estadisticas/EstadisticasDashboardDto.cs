namespace API.DTOs.Estadisticas
{
    public class EstadisticasDashboardDto
    {
        public int CantidadPedidos { get; set; }

        public decimal TotalGenerado { get; set; }

        public int ClientesRegistrados { get; set; }

        public int TotalPorProductos { get; set; }

        public List<PedidosPorMesDto> PedidosPorMes { get; set; } = [];

        public List<ProductoMasVendidoDto> TopProductosMasVendidos { get; set; } = [];
    }
}
