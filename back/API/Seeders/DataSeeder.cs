using API.Context;
using API.Enums;
using API.Interfaces.Services;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Seeders
{
    public static class DataSeeder
    {
        public static async Task SeedAsync(AppDbContext context, IFileService fileService)
        {

            // Solo se ejecuta si no hay Categorias (datos en Db)
            if (await context.Categorias.AnyAsync()) return;

            // Categorias
            var categorias = new List<Categoria>
            {
                new() { Id = Guid.NewGuid(), Nombre = "Camisetas", Slug = "camisetas" },
                new() { Id = Guid.NewGuid(), Nombre = "Hoodies", Slug = "hoodies" },
                new() { Id = Guid.NewGuid(), Nombre = "Pantalones Cargo", Slug = "pantalones-cargo" },
                new() { Id = Guid.NewGuid(), Nombre = "Chaquetas", Slug = "chaquetas" },
                new() { Id = Guid.NewGuid(), Nombre = "Accesorios", Slug = "accesorios" }
            };
            await context.Categorias.AddRangeAsync(categorias);
            await context.SaveChangesAsync();


            // Productos (5 por categoria)
            var productosData = new (string Nombre, string Descripcion, double Precio, string ImagenPath, List<string> Imagenes, List<(int Stock, string Sku, int Talla)> Variantes)[][]
             {
                [
                    ("Camiseta Oversize Negra", "Camiseta urbana oversize color negro con diseño minimalista.", 89900, "camiseta-oversize-negra.png", new() { "camiseta-oversize-negra-1.png", "camiseta-oversize-negra-2.png" }, new() { (12, "CAM-NEG-S", 0), (8, "CAM-NEG-M", 1), (4, "CAM-NEG-L", 2), (0, "CAM-NEG-XL", 3) }),
                    ("Camiseta Graffiti Blanca", "Camiseta streetwear blanca con estampado estilo graffiti.", 94900, "camiseta-graffiti-blanca.png", new() { "camiseta-graffiti-blanca-1.png", "camiseta-graffiti-blanca-2.png" }, new() { (7, "CAM-GRA-S", 0), (10, "CAM-GRA-M", 1), (6, "CAM-GRA-L", 2), (2, "CAM-GRA-XL", 3) }),
                    ("Camiseta Streetwear Gris", "Camiseta gris con corte boxy fit y estilo urbano.", 87900, "camiseta-streetwear-gris.png", new() { "camiseta-streetwear-gris-1.png", "camiseta-streetwear-gris-2.png" }, new() { (3, "CAM-GRI-S", 0), (9, "CAM-GRI-M", 1), (11, "CAM-GRI-L", 2), (1, "CAM-GRI-XL", 3) }),
                    ("Camiseta Boxy Fit Verde", "Camiseta verde oversized ideal para outfits streetwear.", 91900, "camiseta-boxy-fit-verde.png", new() { "camiseta-boxy-fit-verde-1.png", "camiseta-boxy-fit-verde-2.png" }, new() { (5, "CAM-VER-S", 0), (0, "CAM-VER-M", 1), (8, "CAM-VER-L", 2), (4, "CAM-VER-XL", 3) }),
                    ("Camiseta Urban Roja", "Camiseta roja urbana con estampado frontal moderno.", 96900, "camiseta-urban-roja.png", new() { "camiseta-urban-roja-1.png", "camiseta-urban-roja-2.png" }, new() { (6, "CAM-ROJ-S", 0), (13, "CAM-ROJ-M", 1), (5, "CAM-ROJ-L", 2), (0, "CAM-ROJ-XL", 3) })
                ],

                [
                    ("Hoodie Essential Negro", "Hoodie negro básico con ajuste oversize.", 159900, "hoodie-essential-negro.png", new() { "hoodie-essential-negro-1.png", "hoodie-essential-negro-2.png" }, new() { (4, "HOO-NEG-S", 0), (7, "HOO-NEG-M", 1), (3, "HOO-NEG-L", 2), (1, "HOO-NEG-XL", 3) }),
                    ("Hoodie Oversize Gris", "Hoodie gris urbano con capucha amplia.", 164900, "hoodie-oversize-gris.png", new() { "hoodie-oversize-gris-1.png", "hoodie-oversize-gris-2.png" }, new() { (2, "HOO-GRI-S", 0), (8, "HOO-GRI-M", 1), (6, "HOO-GRI-L", 2), (0, "HOO-GRI-XL", 3) }),
                    ("Hoodie Street Blanco", "Hoodie blanco streetwear con estampado frontal.", 169900, "hoodie-street-blanco.png", new() { "hoodie-street-blanco-1.png", "hoodie-street-blanco-2.png" }, new() { (5, "HOO-BLA-S", 0), (9, "HOO-BLA-M", 1), (2, "HOO-BLA-L", 2), (1, "HOO-BLA-XL", 3) }),
                    ("Hoodie Urban Verde", "Hoodie verde militar estilo urbano moderno.", 174900, "hoodie-urban-verde.png", new() { "hoodie-urban-verde-1.png", "hoodie-urban-verde-2.png" }, new() { (3, "HOO-VER-S", 0), (6, "HOO-VER-M", 1), (4, "HOO-VER-L", 2), (0, "HOO-VER-XL", 3) }),
                    ("Hoodie Minimal Beige", "Hoodie beige minimalista con diseño limpio.", 162900, "hoodie-minimal-beige.png", new() { "hoodie-minimal-beige-1.png", "hoodie-minimal-beige-2.png" }, new() { (8, "HOO-BEI-S", 0), (11, "HOO-BEI-M", 1), (5, "HOO-BEI-L", 2), (2, "HOO-BEI-XL", 3) })
                ],

                [
                    ("Cargo Utility Negro", "Pantalón cargo negro con bolsillos utility.", 179900, "cargo-utility-negro.png", new() { "cargo-utility-negro-1.png", "cargo-utility-negro-2.png" }, new() { (9, "CAR-NEG-S", 0), (6, "CAR-NEG-M", 1), (4, "CAR-NEG-L", 2), (1, "CAR-NEG-XL", 3) }),
                    ("Cargo Baggy Verde", "Cargo verde baggy fit estilo streetwear.", 184900, "cargo-baggy-verde.png", new() { "cargo-baggy-verde-1.png", "cargo-baggy-verde-2.png" }, new() { (4, "CAR-VER-S", 0), (8, "CAR-VER-M", 1), (7, "CAR-VER-L", 2), (0, "CAR-VER-XL", 3) }),
                    ("Cargo Street Gris", "Pantalón cargo gris con fit relajado.", 176900, "cargo-street-gris.png", new() { "cargo-street-gris-1.png", "cargo-street-gris-2.png" }, new() { (2, "CAR-GRI-S", 0), (5, "CAR-GRI-M", 1), (6, "CAR-GRI-L", 2), (3, "CAR-GRI-XL", 3) }),
                    ("Cargo Oversize Caqui", "Cargo color caqui con diseño oversized.", 189900, "cargo-oversize-caqui.png", new() { "cargo-oversize-caqui-1.png", "cargo-oversize-caqui-2.png" }, new() { (7, "CAR-CAQ-S", 0), (9, "CAR-CAQ-M", 1), (2, "CAR-CAQ-L", 2), (0, "CAR-CAQ-XL", 3) }),
                    ("Cargo Urban Beige", "Cargo beige urbano con múltiples bolsillos.", 181900, "cargo-urban-beige.png", new() { "cargo-urban-beige-1.png", "cargo-urban-beige-2.png" }, new() { (6, "CAR-BEI-S", 0), (10, "CAR-BEI-M", 1), (5, "CAR-BEI-L", 2), (1, "CAR-BEI-XL", 3) })
                ],

                [
                    ("Chaqueta Denim Azul", "Chaqueta denim azul estilo street clásico.", 219900, "chaqueta-denim-azul.png", new() { "chaqueta-denim-azul-1.png", "chaqueta-denim-azul-2.png" }, new() { (5, "CHA-AZU-S", 0), (8, "CHA-AZU-M", 1), (3, "CHA-AZU-L", 2), (0, "CHA-AZU-XL", 3) }),
                    ("Chaqueta Bomber Negra", "Bomber negra urbana con ajuste oversized.", 239900, "chaqueta-bomber-negra.png", new() { "chaqueta-bomber-negra-1.png", "chaqueta-bomber-negra-2.png" }, new() { (4, "CHA-NEG-S", 0), (6, "CHA-NEG-M", 1), (5, "CHA-NEG-L", 2), (2, "CHA-NEG-XL", 3) }),
                    ("Chaqueta Puffer Gris", "Chaqueta puffer gris acolchada.", 259900, "chaqueta-puffer-gris.png", new() { "chaqueta-puffer-gris-1.png", "chaqueta-puffer-gris-2.png" }, new() { (2, "CHA-GRI-S", 0), (4, "CHA-GRI-M", 1), (1, "CHA-GRI-L", 2), (0, "CHA-GRI-XL", 3) }),
                    ("Chaqueta Street Verde", "Chaqueta verde militar estilo urbano.", 229900, "chaqueta-street-verde.png", new() { "chaqueta-street-verde-1.png", "chaqueta-street-verde-2.png" }, new() { (6, "CHA-VER-S", 0), (7, "CHA-VER-M", 1), (3, "CHA-VER-L", 2), (1, "CHA-VER-XL", 3) }),
                    ("Chaqueta Varsity Roja", "Chaqueta varsity roja estilo college streetwear.", 249900, "chaqueta-varsity-roja.png", new() { "chaqueta-varsity-roja-1.png", "chaqueta-varsity-roja-2.png" }, new() { (3, "CHA-ROJ-S", 0), (5, "CHA-ROJ-M", 1), (4, "CHA-ROJ-L", 2), (0, "CHA-ROJ-XL", 3) })
                ],

                [
                    ("Gorra Urban Negra", "Gorra negra urbana ajustable.", 59900, "gorra-urban-negra.png", new() { "gorra-urban-negra-1.png", "gorra-urban-negra-2.png" }, new() { (15, "ACC-GOR-S", 0), (10, "ACC-GOR-M", 1), (0, "ACC-GOR-L", 2), (0, "ACC-GOR-XL", 3) }),
                    ("Rinonera Street Gris", "Rinonera gris compacta estilo streetwear.", 79900, "rinonera-street-gris.png", new() { "rinonera-street-gris-1.png", "rinonera-street-gris-2.png" }, new() { (9, "ACC-RIN-S", 0), (6, "ACC-RIN-M", 1), (0, "ACC-RIN-L", 2), (0, "ACC-RIN-XL", 3) }),
                    ("Cadena Minimal Plata", "Cadena plateada minimalista urbana.", 69900, "cadena-minimal-plata.png", new() { "cadena-minimal-plata-1.png", "cadena-minimal-plata-2.png" }, new() { (20, "ACC-CAD-S", 0), (12, "ACC-CAD-M", 1), (0, "ACC-CAD-L", 2), (0, "ACC-CAD-XL", 3) }),
                    ("Beanie Oversize Negro", "Beanie negro oversized para outfits urbanos.", 49900, "beanie-oversize-negro.png", new() { "beanie-oversize-negro-1.png", "beanie-oversize-negro-2.png" }, new() { (11, "ACC-BEA-S", 0), (7, "ACC-BEA-M", 1), (0, "ACC-BEA-L", 2), (0, "ACC-BEA-XL", 3) }),
                    ("Mochila Utility Verde", "Mochila verde utility con múltiples compartimientos.", 129900, "mochila-utility-verde.png", new() { "mochila-utility-verde-1.png", "mochila-utility-verde-2.png" }, new() { (4, "ACC-MOC-S", 0), (5, "ACC-MOC-M", 1), (0, "ACC-MOC-L", 2), (0, "ACC-MOC-XL", 3) })
                ]
             };

            var productos =  new List<Producto>();
            var productoImagenes = new List<ProductoImagen>();
            var productoVariantes = new List<ProductoVariante>();

            for (int i = 0; i < categorias.Count; i++)
            {
                foreach (var p in productosData[i])
                {
                    string filePath = Path.Combine(Directory.GetCurrentDirectory(), "SeedImg", p.ImagenPath);
                    string imagenUrl = await fileService.SaveFileLocalAsync(filePath);
                    var productoId = Guid.NewGuid();
                    productos.Add(new Producto
                    {
                        Id = productoId,
                        Nombre = p.Nombre,
                        Descripcion = p.Descripcion,
                        Precio = p.Precio,
                        ImagenPrincipal = imagenUrl,
                        CategoriaId = categorias[i].Id

                    });

                    foreach (string path in p.Imagenes)
                    {
                        string filePathVariante = Path.Combine(Directory.GetCurrentDirectory(), "SeedImg", path);
                        string imagenVarianteUrl = await fileService.SaveFileLocalAsync(filePathVariante);

                        productoImagenes.Add(new ProductoImagen
                        {
                            Url = imagenVarianteUrl,
                            ProductoId = productoId
                        });
                    }

                    foreach (var v in p.Variantes)
                    {
                        productoVariantes.Add(new ProductoVariante
                        {
                            Stock = v.Stock,
                            Sku = v.Sku,
                            Talla = (Talla)v.Talla,
                            ProductoId = productoId
                        });
                    }
                }
            }

            await context.Productos.AddRangeAsync(productos);
            await context.ProductoImagenes.AddRangeAsync(productoImagenes);
            await context.ProductoVariantes.AddRangeAsync(productoVariantes);

            await context.SaveChangesAsync();


        }
    }
}
