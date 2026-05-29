namespace API.DTOs.Estadisticas
{
    public class ProductoMasVendidoDto
    {
        public Guid Id { get; set; }

        public string Nombre { get; set; } = string.Empty;

        public string Imagen { get; set; } = string.Empty;

        public decimal Precio { get; set; }

        public int CantidadVendida { get; set; }
    }
}
