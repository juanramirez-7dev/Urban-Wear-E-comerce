namespace API.Models
{
    public class CarritoItem
    { 
        public int Id { get; set; }
        public int Cantidad { get; set; }
        public Guid CarritoId { get; set; }
        public int ProductoVarianteId { get; set; }
        public Carrito Carrito { get; set; } = null!;
        public ProductoVariante ProductoVariante { get; set; } = null!;
    }
}
