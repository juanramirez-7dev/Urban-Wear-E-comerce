interface PedidoItemRequest {
  productoVarianteId: string;
  cantidad: number;
}

interface PedidoItemResponse {
  id: string;
  nombreProducto: string;
  talla: string;
  cantidad: number;
  subtotal: number;
  pedidoId: string;
}

interface PedidoRequest {
  nombreCliente: string;
  telefonoCliente: string;
  emailCliente: string;
  direccion: string;
  itemsPedido: PedidoItemRequest[];
}

interface PedidoResponse {
  id: string;
  nombreCliente: string;
  telefonoCliente: string;
  emailCliente: string;
  direccion: string;
  subtotal: number;
  total: number;
  pedidoFecha: string;
  fechaEntrega: string;
  usuarioId: string | null;
  itemsPedido: PedidoItemResponse[];
}

export type {
  PedidoItemRequest,
  PedidoItemResponse,
  PedidoRequest,
  PedidoResponse
};
