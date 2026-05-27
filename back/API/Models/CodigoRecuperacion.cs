using static System.Runtime.InteropServices.JavaScript.JSType;

namespace API.Models
{
    public class CodigoRecuperacion
    {
        public int Id { get; set; }
        public string Codigo { get; set; } = string.Empty;
        public DateTime ExpirationDate { get; set; } = DateTime.Now.AddMinutes(5);

        public Guid UserId { get; set; }
        public Usuario Usuario { get; set; } = null!;
    }
}
