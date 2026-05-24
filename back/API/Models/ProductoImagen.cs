namespace API.Models
{
    public class ProductoImagen
    {
        public int Id { get; set; }
        public string Url { get; set; } = string.Empty;
        public Guid ProductoId { get; set; }
        public Producto Producto { get; set; } = null!;
    }
}
