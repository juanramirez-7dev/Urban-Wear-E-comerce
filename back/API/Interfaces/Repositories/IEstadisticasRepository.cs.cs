using API.DTOs.Estadisticas;

namespace API.Interfaces.Repositories
{
    public interface IEstadisticasRepository
    {
        Task<int> ObtenerCantidadPedidos();
        Task<decimal> ObtenerTotalGenerado();
        Task<int> ObtenerUsuariosRegistrados();
        Task<int> ObtenerCantidadProductos();
        Task<IEnumerable<PedidosPorMesDto>> ObtenerCantidadDePedidosPorMes();
        Task<IEnumerable<ProductoMasVendidoDto>> ObtenerTop3Productos();
    }
}
