using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class Entity_ProductoVariante_ProductoImagen : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProductoImagenes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Url = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    ProductoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductoImagenes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductoImagenes_Productos_ProductoId",
                        column: x => x.ProductoId,
                        principalTable: "Productos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductoVariantes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Stock = table.Column<int>(type: "int", nullable: false),
                    Sku = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Talla = table.Column<int>(type: "int", nullable: false),
                    ProductoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductoVariantes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductoVariantes_Productos_ProductoId",
                        column: x => x.ProductoId,
                        principalTable: "Productos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductoImagenes_ProductoId",
                table: "ProductoImagenes",
                column: "ProductoId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductoVariantes_ProductoId",
                table: "ProductoVariantes",
                column: "ProductoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductoImagenes");

            migrationBuilder.DropTable(
                name: "ProductoVariantes");
        }
    }
}
