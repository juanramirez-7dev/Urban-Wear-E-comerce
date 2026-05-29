using API.Context;
using API.DTOs.Estadisticas;
using API.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class EstadisticasRepository : IEstadisticasRepository
    {
        private readonly AppDbContext _context;

        public EstadisticasRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> ObtenerCantidadPedidos()
        {
            return await _context.Pedidos.CountAsync();
        }
        public async Task<decimal> ObtenerTotalGenerado()
        {
            return await _context.Pedidos.SumAsync(p => p.Total);
        }
        public async Task<int> ObtenerUsuariosRegistrados()
        {
            return await _context.Usuarios.CountAsync();
        }
        public async Task<int> ObtenerCantidadProductos()
        {
            return  await _context.Productos.CountAsync();
        }
        public async Task<IEnumerable<PedidosPorMesDto>> ObtenerCantidadDePedidosPorMes()
        {
            return await _context.Pedidos.Where(p => p.PedidoFecha.Year == 2026).GroupBy(p => p.PedidoFecha.Month).Select(g => new PedidosPorMesDto
            {
                Mes = g.Key,
                CantidadPedidos = g.Count()
            }).ToListAsync();
        }
        public async Task<IEnumerable<ProductoMasVendidoDto>> ObtenerTop3Productos()
        {
            return await (
                from pi in _context.ItemsPedido

                join pv in _context.ProductoVariantes
                    on pi.ProductoVarianteId equals pv.Id

                join p in _context.Productos
                    on pv.ProductoId equals p.Id

                group pi by new
                {
                    p.Id,
                    p.Nombre,
                    p.ImagenPrincipal,
                    p.Precio
                } into g

                select new ProductoMasVendidoDto
                {
                    Id = g.Key.Id,

                    Nombre = g.Key.Nombre,

                    Imagen = g.Key.ImagenPrincipal,

                    Precio = g.Key.Precio,

                    CantidadVendida = g.Sum(x => x.Cantidad)
                }
            )
            .OrderByDescending(x => x.CantidadVendida)
            .Take(3)
            .ToListAsync();
        }
    }
}
