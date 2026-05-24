namespace API.DTOs.Producto
{
    public class ProductoResponseDto
    {
        public Guid Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public double Precio { get; set; }
        public string ImagenPrincipal { get; set; } = string.Empty;   
    }
}
