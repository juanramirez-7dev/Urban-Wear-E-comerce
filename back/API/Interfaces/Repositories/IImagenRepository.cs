using API.Models;

namespace API.Interfaces.Repositories
{
    public interface IImagenRepository
    {
        Task AddAsync(ProductoImagen entity);
    }
}
