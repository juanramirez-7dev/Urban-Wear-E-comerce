using API.DTOs.CarritoItem;
using API.Models;

namespace API.DTOs.Carrito
{
    public class CarritoResponseDto
    {
        public Guid Id { get; set; }
        public ICollection<CarritoItemResponseDto> Items { get; set; } = new List<CarritoItemResponseDto>();
    }
}
