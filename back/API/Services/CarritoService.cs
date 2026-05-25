using API.Interfaces.Repositories;
using API.Interfaces.Services;
using API.Models;

namespace API.Services
{
    public class CarritoService: ICarritoService
    {
        private readonly ICarritoRepository _carritoRepository;
        private readonly ICarritoItemRepository _carritoItemRepository;
        private readonly IProductoVarianteRepository _productoVarianteRepository;
        private readonly IUsuarioRepository _usuarioRepository;

        public CarritoService(
                ICarritoRepository carritoRepository, 
                ICarritoItemRepository carritoItemRepository,
                IProductoVarianteRepository productoVarianteRepository,
                IUsuarioRepository usuarioRepository)
        {
            _carritoRepository = carritoRepository;
            _carritoItemRepository = carritoItemRepository;
            _productoVarianteRepository = productoVarianteRepository;
            _usuarioRepository = usuarioRepository;
        }

        public async Task<Carrito> GetCartByUser(Guid userId)
        {
            var usuario = await _usuarioRepository.GetByIdAsync(userId);
            if (usuario == null)
            {
                throw new KeyNotFoundException($"Usuario con id {userId} no encontrado");
            }
            var carrito = await _carritoRepository.GetFullByUserId(usuario.Id);
            if (carrito == null)
            {
                throw new KeyNotFoundException($"El usuario No tiene Carrito");
            }
            return carrito;
        }

        public async Task AddItem(Guid userId, CarritoItem item)
        {
            // verificar que el usuario eciste
            var usuario = await _usuarioRepository.GetByIdAsync(userId);
            if (usuario == null)
            {
                throw new KeyNotFoundException($"Usuario con id {userId} no encontrado");
            }

            // verificar si el carrito del usuario existe, si no existe crear uno nuevo
            var existingUserCart = await _carritoRepository.GetByUserId(usuario.Id);
            if (existingUserCart == null)
            {
                await _carritoRepository.AddAsync(new Carrito
                {
                    Id = Guid.NewGuid(),
                    UsuarioId = usuario.Id
                });
            }

            // traer el carrito del usuario para verificar que el item pertenece al carrito del usuario
            var carrito = await _carritoRepository.GetByUserId(usuario.Id);
            if (carrito == null)
            {
                throw new InvalidOperationException("No se pudo crear o recuperar el carrito del usuario");
            }
            if ( item.CarritoId != Guid.Empty && carrito.Id != item.CarritoId)
            {
                throw new InvalidOperationException("El item no pertenece al carrito del usuario");
            }

            // verificar que el producto variante existe
            var productoVariante = await _productoVarianteRepository.GetByIdAsync(item.ProductoVarianteId);
            if (productoVariante == null)
            {
                throw new KeyNotFoundException($"Producto variante con id {item.ProductoVarianteId} no encontrado");
            }

            // verificar que la variante no este en el carrito
            if (await _carritoRepository.ExistVariantInCart(carrito.Id, item.ProductoVarianteId))
            {
                throw new InvalidOperationException("El item ya está en el carrito");
            }

            item.CarritoId = carrito.Id;
            // añadir el item al carrito
            await _carritoItemRepository.AddAsync(item);

        }
        public async Task DeleteItem(Guid userId, int itemId)
        {
            // verificar que el usuario existe
            var usuario = await _usuarioRepository.GetByIdAsync(userId);
            if (usuario == null)
            {
                throw new KeyNotFoundException($"Usuario con id {userId} no encontrado");
            }

            // verificar que el item existe
            var existingItem = await _carritoItemRepository.GetByIdAsync(itemId);
            if (existingItem == null)
            {
                throw new KeyNotFoundException($"Item con id {itemId} no encontrado");
            }

            // traer el carrito del usuario para verificar que el item pertenece al carrito del usuario
            var carrito = await _carritoRepository.GetByUserId(usuario.Id);
            if (carrito == null)
            {
                throw new InvalidOperationException("No se pudo recuperar el carrito del usuario");
            }
            if (carrito.Id != existingItem.CarritoId)
            {
                throw new InvalidOperationException("El item no pertenece al carrito del usuario");
            }


            var count = await _carritoRepository.CountItemAsync(carrito.Id);
            // si el item es el unico item del carrito, eliminar el carrito, sino solo eliminar el item
            if (count == 1)
            {
                await _carritoRepository.DeleteAsync(carrito.Id);
            }
            else
            {
                await _carritoItemRepository.DeleteAsync(existingItem.Id);
            }

        }
        public async Task UpdateItem(Guid userId, int itemId, int cantidad)
        {
            // verificar que el usuario eciste
            var usuario = await _usuarioRepository.GetByIdAsync(userId);
            if (usuario == null)
            {
                throw new KeyNotFoundException($"Usuario con id {userId} no encontrado");
            }

            // verificar que el item existe
            var existingItem = await _carritoItemRepository.GetByIdAsync(itemId);
            if (existingItem == null)
            {
                throw new KeyNotFoundException($"Item con id {itemId} no encontrado");
            }

            // traer el carrito del usuario para verificar que el item pertenece al carrito del usuario
            var carrito = await _carritoRepository.GetByUserId(usuario.Id);
            if (carrito == null)
            {
                throw new InvalidOperationException("No se pudo recuperar el carrito del usuario");
            }
            if (carrito.Id != existingItem.CarritoId)
            {
                throw new InvalidOperationException("El item no pertenece al carrito del usuario");
            }


            // verificar que la cantidad del item no sea negativa
            if (cantidad < 0)
            {
                throw new InvalidOperationException("La cantidad del item no puede ser negativa");
            }

            int count = await _carritoRepository.CountItemAsync(carrito.Id);
            // si el carrito solo tieene un item y se actualiza su cantidad a 0, se elimina el carrito
            if (count == 1 && existingItem.Cantidad == 0)
            {
                await _carritoRepository.DeleteAsync(carrito.Id);
                return;
            }

            // si el item se actualiza a cantidad 0, se elimina el item
            if (cantidad == 0)
            {
                await _carritoItemRepository.DeleteAsync(existingItem.Id);
                return;
            }

            var variante = await _productoVarianteRepository.GetByIdAsync(existingItem.Id);
            int stockDisponible = variante!.Stock;
            if (cantidad > stockDisponible)
            {
                throw new InvalidOperationException("La cantidad del item excede el stock disponible");
            }

            existingItem.Cantidad = cantidad;
            await _carritoItemRepository.UpdateAsync(existingItem);
        }
    }
}
