import type { PedidoRequest, PedidoResponse } from "../types/orderTypes";
import type { ErrorResponseType } from "../types/genericTypes";
import { BASE_API_URL } from "../config/api";
import type { StatisticsResponse } from "../types/statisticTypes";

const readErrorMessage = async (response: Response) => {
  try {
    const errorData: ErrorResponseType = await response.json();
    return errorData.message || "Error al procesar el pedido";
  } catch {
    return "Error al procesar el pedido";
  }
};

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
		throw new Error(await readErrorMessage(response));
	}

    return response.json();
  },

  async getPedidoById(id: string, token?: string | null): Promise<PedidoResponse> {
    const response = await fetch(`${BASE_API_URL}/Pedidos/${id}`, {
      headers: token ? { "Authorization": `Bearer ${token}` } : undefined
    })

	if (!response.ok) {
		throw new Error(await readErrorMessage(response));
	}

    return await response.json();
  },

  async getPedidos(token: string): Promise<PedidoResponse[]> {
    const response = await fetch(`${BASE_API_URL}/Pedidos`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

	if (!response.ok) {
		throw new Error(await readErrorMessage(response));
	}

    const data: PedidoResponse[] = await response.json();
    return data
  },

  async downloadInvoice (pedidoId: string) : Promise<void> {

    const response = await fetch(`${BASE_API_URL}/Pedidos/${pedidoId}/factura`)

    if (!response.ok) {
      throw new Error("Error al descargar la factura");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `factura-${pedidoId}.pdf`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
  },

  async getStatistics(token: string) : Promise<StatisticsResponse> {
    const response = await fetch(`${BASE_API_URL}/Pedidos/dashboard`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error("Error al obtener las estadísticas");
    }

    const data: StatisticsResponse = await  response.json()
    return data

  }

}
