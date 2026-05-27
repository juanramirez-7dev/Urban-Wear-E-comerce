namespace API.DTOs.Producto
{
    public class ProductoResponseDto
    {
        public Guid Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public decimal Precio { get; set; }
        public string ImagenPrincipal { get; set; } = string.Empty;  
        public string CategoriaNombre { get; set; } = string.Empty;
    }
}
