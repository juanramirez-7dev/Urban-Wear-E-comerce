namespace API.DTOs.Producto
{
    public class ProductoResponseDto
    {
        public Guid Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public double Precio { get; set; }
        public string ImagenPrincipal { get; set; } = string.Empty;
        public Guid CategoriaId { get; set; }
        public string CategoriaNombre { get; set; } = string.Empty;
    }
}
