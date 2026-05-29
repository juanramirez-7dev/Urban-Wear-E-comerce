using API.Context;
using API.DTOs.Estadisticas;
using API.Enums;
using API.Interfaces.Repositories;
using API.Interfaces.Services;
using API.Models;
using API.Repositories;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class PedidoService : IPedidoService
    {
        private readonly IPedidoRepository _repository;
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IProductoVarianteRepository _productoVarianteRepository;
        private readonly IPedidoItemRepository _pedidoItemRepository;
        private readonly IFacturaService _facturaService;
        private readonly IEstadisticasRepository _estadisticasRepository;
        private readonly AppDbContext _context;
        public PedidoService(
            IPedidoRepository repository,
            IUsuarioRepository usuarioRepository,
            IProductoVarianteRepository productoVarianteRepository,
            IPedidoItemRepository pedidoItemRepository,
            AppDbContext context,
            IFacturaService facturaService,
            IEstadisticasRepository estadisticasRepository)
        {
            _repository = repository;
            _usuarioRepository = usuarioRepository;
            _productoVarianteRepository = productoVarianteRepository;
            _context = context;
            _pedidoItemRepository = pedidoItemRepository;
            _facturaService = facturaService;
            _estadisticasRepository = estadisticasRepository;
        }

        public async Task<IEnumerable<Pedido>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }
        public async Task<IEnumerable<Pedido>> GetAllByUsuarioIdAsync(Guid userId)
        {
            var usuario = await _usuarioRepository.GetByIdAsync(userId);
            if (usuario == null)
            {
                throw new KeyNotFoundException("Usuario no encontrado");
            }
            return await _repository.GetAllByUsuarioIdAsync(userId);
        }
        public async Task<Pedido> GetByIdAsync(Guid id)
        {
            var pedido = await _repository.GetByIdAsync(id);
            if (pedido == null)
            {
                throw new KeyNotFoundException("Pedido no encontrado");
            }
            return pedido;
        }
        public async Task<Pedido> AddAsync(Pedido pedido)
        {
            if (string.IsNullOrWhiteSpace(pedido.Direccion))
                throw new ArgumentException("La direccion es requerida");

            if (string.IsNullOrWhiteSpace(pedido.NombreCliente))
                throw new ArgumentException("El nombre es requerido");

            if (string.IsNullOrWhiteSpace(pedido.EmailCliente))
                throw new ArgumentException("El email es requerido");

            var partes = pedido.EmailCliente.Split('@');
            if (partes.Length != 2 || partes[0].Length == 0 || partes[1].Length == 0 || !partes[1].Contains('.'))
            {
                throw new ArgumentException($"El email no es valido");
            }

            if (string.IsNullOrWhiteSpace(pedido.TelefonoCliente))
                throw new ArgumentException("El telefono es requerido");

            if (pedido.ItemsPedido == null || !pedido.ItemsPedido.Any())
                throw new ArgumentException("El pedido debe tener al menos un item");


            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {

                pedido.Id = Guid.NewGuid();
                pedido.PedidoFecha = DateTime.UtcNow;
                pedido.FechaEntrega = pedido.PedidoFecha.AddDays(7);

                foreach (var item in pedido.ItemsPedido)
                {
                    var producto = await _productoVarianteRepository.GetByIdAsync(item.ProductoVarianteId);
                    if (producto == null)
                    {
                        throw new KeyNotFoundException($"Producto variante con ID {item.ProductoVarianteId} no encontrado");
                    }
                    if (item.Cantidad <= 0)
                    {
                        throw new ArgumentException("La cantidad debe ser mayor que cero");
                    }
                    item.ProductoNombre = producto.Producto.Nombre;
                    item.PrecioUnitario = producto.Producto.Precio;
                    item.Talla = producto.Talla;
                    item.PedidoId = pedido.Id;
                    item.Subtotal = item.PrecioUnitario * item.Cantidad;
                    if (!Enum.IsDefined(typeof(Talla), item.Talla))
                    {
                        throw new ArgumentException("La talla no es válida");
                    }
                    if (producto.Stock < item.Cantidad)
                    {
                        throw new InvalidOperationException($"No hay suficiente stock para el producto {producto.Producto.Nombre} en talla {producto.Talla}");
                    }
                    producto.Stock -= item.Cantidad;
                }

                decimal totalCalculado = pedido.ItemsPedido.Sum(i => i.Subtotal);

                pedido.Subtotal = totalCalculado;
                pedido.Total = totalCalculado * 1.19m;


                await _repository.AddAsync(pedido);
                await transaction.CommitAsync();
                return pedido;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
        public async Task<IEnumerable<PedidoItem>> GetItemsByPedidoIdAsync(Guid pedidoId)
        {
            var pedido = await GetByIdAsync(pedidoId);
            if (pedido.ItemsPedido == null || !pedido.ItemsPedido.Any())
            {
                throw new InvalidOperationException("No se encontraron items en este pedido");
            }
            var items = await _pedidoItemRepository.GetItemsByPedidoIdAsync(pedidoId);
            return items;
        }

        public async Task<PedidoItem> GetItemByIdOnPedidoAsync(int id, Guid idPedido)
        {
            var pedido = await GetByIdAsync(idPedido);
            if (pedido == null)
            {
                throw new KeyNotFoundException("Pedido no encontrado");
            }
            var item = await _pedidoItemRepository.GetByIdAsync(id, idPedido);
            if (item == null)
            {
                throw new KeyNotFoundException("Hubo un problema al encontrar el item en el pedido");
            }
            return item;
        }

        public async Task<byte[]> GenerarFacturaPdfAsync(Guid pedidoId)
        {
            var pedido = await _repository.GetByIdAsync(pedidoId);

            if (pedido == null)
            {
                throw new KeyNotFoundException("Pedido no encontrado");
            }

            return await _facturaService.GenerarFacturaPdfAsync(pedido);
        }

        public async Task<EstadisticasDashboardDto> ObtenerEstadisticasDashboardAsync()
        {
            var pedidosAgrupados = await _estadisticasRepository.ObtenerCantidadDePedidosPorMes();

            var pedidosPorMes = Enumerable.Range(1, 12)
            .Select(mes => new PedidosPorMesDto
            {
                Mes = mes,

                CantidadPedidos = pedidosAgrupados
                    .FirstOrDefault(x => x.Mes == mes)
                    ?.CantidadPedidos ?? 0
            })
            .ToList();
            var estadisticas = new EstadisticasDashboardDto
            {
                CantidadPedidos = await _estadisticasRepository.ObtenerCantidadPedidos(),
                TotalGenerado = await _estadisticasRepository.ObtenerTotalGenerado(),
                ClientesRegistrados = await _estadisticasRepository.ObtenerUsuariosRegistrados(),
                TotalPorProductos = await _estadisticasRepository.ObtenerCantidadProductos(),
                TopProductosMasVendidos = (await _estadisticasRepository.ObtenerTop3Productos()).ToList(),
                PedidosPorMes = pedidosPorMes
            };
            return estadisticas;
        }
    }
}
