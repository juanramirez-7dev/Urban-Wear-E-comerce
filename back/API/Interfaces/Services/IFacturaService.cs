using API.Models;

namespace API.Interfaces.Services
{
    public interface IFacturaService
    {
        Task<byte[]> GenerarFacturaPdfAsync(Pedido pedido);
    }
}
