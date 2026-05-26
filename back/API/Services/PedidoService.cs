using API.Enums;
using API.Interfaces.Repositories;
using API.Interfaces.Services;
using API.Models;

namespace API.Services
{
    public class PedidoService : IPedidoService
    {
        private readonly IPedidoRepository _repository;
        private readonly IUsuarioRepository _usuarioRepository;
        public PedidoService(IPedidoRepository repository, IUsuarioRepository usuarioRepository)
        {
            _repository = repository;
            _usuarioRepository = usuarioRepository;
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
            if(pedido == null)
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

            if (string.IsNullOrWhiteSpace(pedido.TelefonoCliente))
                throw new ArgumentException("El telefono es requerido");

            if (pedido.ItemsPedido == null || !pedido.ItemsPedido.Any())
                throw new ArgumentException("El pedido debe tener al menos un item");

            pedido.Id = Guid.NewGuid();


            pedido.PedidoFecha = DateTime.UtcNow;
            pedido.FechaEntrega = pedido.PedidoFecha.AddDays(7);

            foreach (var item in pedido.ItemsPedido)
            {
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
                item.PedidoId = pedido.Id;
                item.Subtotal = item.PrecioUnitario * item.Cantidad;
            }

            decimal totalCalculado = pedido.ItemsPedido.Sum(i => i.Subtotal);

            pedido.Subtotal = totalCalculado;
            pedido.Total = totalCalculado * 1.19m;

            await _repository.AddAsync(pedido);

            return pedido;
        }
    }
}
