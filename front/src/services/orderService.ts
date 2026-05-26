import type { PedidoRequest, PedidoResponse } from "../types/orderTypes";
import type { ErrorResponseType } from "../types/genericTypes";
import { BASE_API_URL } from "../config/api";

export const orderService = {
  async createPedido(
    pedido: PedidoRequest,
    token?: string | null
  ): Promise<PedidoResponse> {
    const response = await fetch(`${BASE_API_URL}/Pedidos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      },
      body: JSON.stringify(pedido)
    });

    if (!response.ok) {
      const errorData: ErrorResponseType = await response.json();
      throw new Error(
        errorData.message || "Error al crear el pedido"
      );
    }

    return response.json();
  }
};
