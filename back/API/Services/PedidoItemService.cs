using API.Enums;
using API.Interfaces.Repositories;
using API.Interfaces.Services;
using API.Models;

namespace API.Services
{
    public class PedidoItemService : IPedidoItemService
    {
        private readonly IPedidoItemRepository _repository;
        private readonly IPedidoService _pedidoService;
        public PedidoItemService(IPedidoItemRepository repository, IPedidoService pedidoService)
        {
            _repository = repository;
            _pedidoService = pedidoService;
        }

        public async Task<PedidoItem> GetByIdAsync(int id, Guid idPedido)
        {
            var pedido = await _pedidoService.GetByIdAsync(idPedido);
            if (pedido == null)
            {
                throw new KeyNotFoundException("Pedido no encontrado");
            }
            var item = await _repository.GetByIdAsync(id,idPedido);
            if (item == null)
            {
                throw new KeyNotFoundException("Hubo un problema al encontrar el item en el pedido");
            }
            return item;
        }
        public async Task<IEnumerable<PedidoItem>> GetAllByPedidoIdAsync(Guid pedidoId)
        {
            var pedido = await _pedidoService.GetByIdAsync(pedidoId);
            if (pedido == null)
            {
                throw new KeyNotFoundException("Pedido no encontrado");
            }
            var items = await _repository.GetAllByPedidoIdAsync(pedidoId);
            return items;

        }
        public async Task<PedidoItem> AddAsync(PedidoItem item)
        {
            var pedido = await _pedidoService.GetByIdAsync(item.PedidoId);
            if (pedido == null)
            {
                throw new KeyNotFoundException("Pedido no encontrado");
            }
            if (item.Cantidad <= 0)
            {
                throw new ArgumentException("La cantidad debe ser mayor que cero");
            }
            if (item.PrecioUnitario < 0)
            {
                throw new ArgumentException("El precio unitario no puede ser negativo");
            }
            if (string.IsNullOrWhiteSpace(item.ProductoNombre))
            {
                throw new ArgumentException("El nombre del producto no puede estar vacío");
            }
            if (!Enum.IsDefined(typeof(Talla), item.Talla))
            {
                throw new ArgumentException("La talla no es válida");
            }
            item.Subtotal = item.Cantidad * item.PrecioUnitario;
            var newitem = await _repository.AddAsync(item);
            return newitem;
        }
    }
}
