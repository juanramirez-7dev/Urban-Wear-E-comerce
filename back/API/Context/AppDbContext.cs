using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Context
{
    public class AppDbContext : DbContext
    {
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Producto> Productos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Categoria>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nombre).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Slug).IsRequired().HasMaxLength(150);
                entity.HasIndex(e => e.Slug).IsUnique();
            });

            modelBuilder.Entity<Producto>(entity =>
            {
                entity.HasKey(p => p.Id);
                entity.Property(p => p.Nombre).IsRequired().HasMaxLength(150);
                entity.Property(p => p.Descripcion).IsRequired().HasMaxLength(1000);
                entity.Property(p => p.Precio).IsRequired();
                entity.Property(p => p.ImagenPrincipal).IsRequired().HasMaxLength(500);
                entity.HasOne(p => p.Categoria)
                    .WithMany(c => c.Productos )
                    .HasForeignKey(p => p.CategoriaId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.Property(u => u.Nombre).IsRequired().HasMaxLength(100);
                entity.Property(u => u.Email).IsRequired().HasMaxLength(100);
                entity.Property(u => u.Telefono).IsRequired().HasMaxLength(10);
                entity.Property(u => u.PasswordHash).IsRequired().HasMaxLength(500);
                entity.Property(u => u.Rol).HasMaxLength(20);
            });

            modelBuilder.Entity<Pedido>(entity =>
            {
                entity.HasKey(p => p.Id);
                entity.Property(p=> p.NombreCliente).IsRequired().HasMaxLength(100);
                entity.Property(p => p.EmailCliente).IsRequired().HasMaxLength(100);
                entity.Property(p => p.TelefonoCliente).IsRequired().HasMaxLength(10);
                entity.Property(p => p.Direccion).IsRequired().HasMaxLength(100);
                entity.Property(p => p.Subtotal).IsRequired();
                entity.Property(p => p.Total).IsRequired();
                entity.Property(p => p.PedidoFecha).IsRequired();
                entity.Property(p => p.FechaEntrega).IsRequired();
                entity.Property(p => p.Total).IsRequired();
                entity.HasOne(p => p.Usuario)
                    .WithMany(u => u.Pedidos)
                    .HasForeignKey(p => p.UsuarioId)
                    .OnDelete(DeleteBehavior.SetNull);
            });
        }
    }
}
