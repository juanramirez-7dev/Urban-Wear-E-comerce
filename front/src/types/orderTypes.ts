interface PedidoItemRequest {
  productoVarianteId: string;
  cantidad: number;
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
  nombreCliente?: string;
  telefonoCliente?: string;
  emailCliente?: string;
  direccion?: string;
  itemsPedido?: PedidoItemRequest[];
  total?: number;
  estado?: string;
  creadoEn?: string;
}

export type {
  PedidoItemRequest,
  PedidoRequest,
  PedidoResponse
};
