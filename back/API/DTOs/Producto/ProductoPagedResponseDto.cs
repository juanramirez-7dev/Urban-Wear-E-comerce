namespace API.DTOs.Producto
{
    public class ProductoPagedResponseDto
    {
        public IEnumerable<ProductoResponseDto> Items { get; set; } = Array.Empty<ProductoResponseDto>();
        public int Total { get; set; }
        public int Limit { get; set; }
        public int Offset { get; set; }
    }
}
