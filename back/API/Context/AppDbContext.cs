using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Context
{
    public class AppDbContext : DbContext
    {
        public DbSet<Categoria> Categorias { get; set; }

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

            
        }
    }
}
