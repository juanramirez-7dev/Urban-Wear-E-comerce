namespace API.DTOs.Categoria
{
    public class CategoriaResponseDto
    {
        public Guid Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
    }
}