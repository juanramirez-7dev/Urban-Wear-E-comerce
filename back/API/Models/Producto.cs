namespace API.Models
{
    public class Producto
    {
        public Guid Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public Double Preecio { get; set; }
        public string ImagenPrincipal { get; set; } = string.Empty;
        public Guid CategoriaId { get; set; }
        public Categoria Categoria { get; set; } = null!;

    }
}
