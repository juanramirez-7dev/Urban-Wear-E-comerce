using API.Interfaces.Repositories;
using API.Interfaces.Services;
using API.Models;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

public class FacturaService : IFacturaService
{

    public async Task<byte[]> GenerarFacturaPdfAsync(Pedido pedido)
    {

        var iva = pedido.Total - pedido.Subtotal;

        var document = Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Margin(40);

                page.Size(PageSizes.A4);

                page.DefaultTextStyle(x => x.FontSize(12));

                // HEADER
                page.Header().Element(header =>
                {
                    header.Row(row =>
                    {
                        row.RelativeItem().Column(col =>
                        {
                            col.Item().Text("URBAN")
                                .FontSize(28)
                                .Bold();

                            col.Item().Text("URBAN FASHION GROUP")
                                .FontSize(10);

                            col.Item().Text("MEDELLIN, COL")
                                .FontSize(10);
                        });

                        row.ConstantItem(250).AlignRight().Column(col =>
                        {
                            col.Item().Text("ORDEN ID")
                                .FontSize(20)
                                .Bold();

                            col.Item().Text(pedido.Id.ToString())
                                .FontSize(12);
                        });
                    });
                });

                // CONTENT
                page.Content().PaddingVertical(25).Column(column =>
                {
                    // Fechas + cliente
                    column.Item().Row(row =>
                    {
                        row.RelativeItem().Column(col =>
                        {
                            col.Item().Text("FECHA PEDIDO")
                                .Bold();

                            col.Item().PaddingBottom(20);

                            col.Item().Text(
                                pedido.PedidoFecha.ToString("dd 'de' MMMM 'de' yyyy")
                            );

                            col.Item().PaddingTop(20);

                            col.Item().Text("FECHA ENTREGA")
                                .Bold();

                            col.Item().PaddingBottom(20);

                            col.Item().Text(
                                pedido.FechaEntrega.ToString("dd 'de' MMMM 'de' yyyy")
                            );
                        });

                        row.ConstantItem(320).Border(1).BorderColor(Colors.Grey.Lighten2)
                            .Padding(20)
                            .Column(col =>
                            {
                                col.Item().Text("INFORMACION CLIENTE")
                                    .Bold();

                                col.Item().PaddingTop(15);

                                col.Item().Text(pedido.NombreCliente)
                                    .FontSize(18)
                                    .Bold();

                                col.Item().PaddingTop(10);

                                col.Item().Text(pedido.EmailCliente);

                                col.Item().PaddingTop(5);

                                col.Item().Text(pedido.TelefonoCliente);

                                col.Item().PaddingTop(5);

                                col.Item().Text(pedido.Direccion);
                            });
                    });

                    column.Item().PaddingTop(60);

                    // Tabla productos
                    column.Item().Table(table =>
                    {
                        table.ColumnsDefinition(columns =>
                        {
                            columns.RelativeColumn(5);
                            columns.RelativeColumn(1);
                            columns.RelativeColumn(1);
                            columns.RelativeColumn(2);
                        });

                        // Header
                        table.Header(header =>
                        {
                            header.Cell().Element(CellStyle).Text("PRODUCTO");
                            header.Cell().Element(CellStyle).AlignCenter().Text("TALLA");
                            header.Cell().Element(CellStyle).AlignCenter().Text("QTY");
                            header.Cell().Element(CellStyle).AlignRight().Text("SUBTOTAL");

                            static IContainer CellStyle(IContainer container)
                            {
                                return container
                                    .PaddingVertical(10)
                                    .BorderBottom(1)
                                    .BorderColor(Colors.Black);
                            }
                        });

                        // Items
                        foreach (var item in pedido.ItemsPedido)
                        {
                            table.Cell().PaddingVertical(30)
                                .Text(item.ProductoNombre)
                                .FontSize(18)
                                .Bold();

                            table.Cell().AlignCenter().PaddingVertical(30)
                                .Text(item.Talla.ToString());

                            table.Cell().AlignCenter().PaddingVertical(30)
                                .Text(item.Cantidad.ToString());

                            table.Cell().AlignRight().PaddingVertical(30)
                                .Text($"${item.Subtotal:N0}");
                        }
                    });

                    column.Item().PaddingTop(50);

                    // Totales
                    column.Item().AlignRight().Width(250).Column(col =>
                    {
                        col.Item().Row(row =>
                        {
                            row.RelativeItem().Text("SUBTOTAL");
                            row.ConstantItem(120)
                                .AlignRight()
                                .Text($"$ {pedido.Subtotal:N0}");
                        });

                        col.Item().PaddingTop(15);

                        col.Item().Row(row =>
                        {
                            row.RelativeItem().Text("IVA");
                            row.ConstantItem(120)
                                .AlignRight()
                                .Text($"$ {iva:N0}");
                        });

                        col.Item().PaddingVertical(20)
                            .BorderBottom(1);

                        col.Item().PaddingTop(20);

                        col.Item().Row(row =>
                        {
                            row.RelativeItem().Text("TOTAL")
                                .Bold()
                                .FontSize(20);

                            row.ConstantItem(120)
                                .AlignRight()
                                .Text($"$ {pedido.Total:N0}")
                                .Bold()
                                .FontSize(20);
                        });
                    });
                });
            });
        });

        return document.GeneratePdf();
    }
}