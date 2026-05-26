namespace API.Models
{
    public class Carrito
    {
        public Guid Id { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public Guid UsuarioId { get; set; }
        public Usuario Usuario { get; set; } = null!;
        public ICollection<CarritoItem> Items { get; set; } = new List<CarritoItem>();
    }
}
