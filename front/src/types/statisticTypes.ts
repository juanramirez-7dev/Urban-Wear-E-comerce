export interface StatisticsResponse {
  cantidadPedidos: number;
  totalGenerado: number;
  clientesRegistrados: number;
  totalPorProductos: number;
  pedidosPorMes: {
    mes: number;
    cantidadPedidos: number;
  }[];
  topProductosMasVendidos: {
    id: string;
    nombre: string;
    imagen: string;
    precio: number;
    cantidadVendida: number;
  }[];
}