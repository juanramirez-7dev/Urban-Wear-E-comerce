using API.Enums;
using System.Data.Common;

namespace API.Models
{
    public class ProductoVariante
    {
        public int Id {  get; set;  }
        public int Stock { get; set; }
        public string Sku { get; set; } = string.Empty;
        public Talla Talla { get; set; }
        public Guid ProductoId { get; set; }
        public Producto Producto { get; set; } = null!;
    }
}
