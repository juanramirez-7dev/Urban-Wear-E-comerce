import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { IconX } from "@tabler/icons-react"
import { LoadingState } from "../../components/ui/LoadingState"
import { useAuth } from "../../hooks/useAuth"
import { getMyPedidos } from "../../services/userService"
import type { PedidoResponse } from "../../types/orderTypes"

const currencyFormatter = new Intl.NumberFormat("es-CO", {
	style: "currency",
	currency: "COP",
	maximumFractionDigits: 0
})

const dateFormatter = new Intl.DateTimeFormat("es-CO", {
	dateStyle: "medium"
})

const formatCurrency = (value: number) => currencyFormatter.format(value)

const formatDate = (value?: string) => {
	if (!value) return "-"

	const parsedDate = new Date(value)
	return Number.isNaN(parsedDate.getTime()) ? "-" : dateFormatter.format(parsedDate)
}

const normalizeUser = (userId: string | null) => {
	if (!userId) {
		return "Invitado"
	}

	return `Usuario ${userId.slice(0, 8).toUpperCase()}`
}

const normalizeOrderId = (orderId: string) => orderId.slice(0, 8).toUpperCase()

const normalizeAddress = (address: string) => address.replace(/\s+/g, " ").trim()

export default function ClientOrders() {
	const { token } = useAuth()
	const [selectedOrder, setSelectedOrder] = useState<PedidoResponse | null>(null)

	const {
		data: orders = [],
		isLoading,
		isError,
		error
	} = useQuery<PedidoResponse[], Error>({
		queryKey: ["client-orders", token],
		queryFn: () => getMyPedidos(token ?? ""),
		enabled: Boolean(token)
	})

	if (isLoading) {
		return <LoadingState label="Cargando pedidos" />
	}

	if (isError) {
		return (
			<section className="rounded-lg border border-outline-variant bg-surface-container-lowest p-8 md:p-10">
				<p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
					Mis órdenes
				</p>
				<h1 className="mt-3 font-display-lg text-display-lg-mobile md:text-display-lg text-primary uppercase">
					No pudimos cargar tu historial
				</h1>
				<p className="mt-4 max-w-2xl font-body-md text-body-md text-secondary">
					{error.message}
				</p>
			</section>
		)
	}

	if (!token) {
		return (
			<section className="rounded-lg border border-outline-variant bg-surface-container-lowest p-8 md:p-10">
				<p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
					Mis órdenes
				</p>
				<h1 className="mt-3 font-display-lg text-display-lg-mobile md:text-display-lg text-primary uppercase">
					Acceso requerido
				</h1>
				<p className="mt-4 max-w-2xl font-body-md text-body-md text-secondary">
					Debes iniciar sesión como cliente para ver tus órdenes.
				</p>
			</section>
		)
	}

	return (
		<section className="space-y-stack-lg">
			<header className="flex flex-col gap-6 border-b border-outline-variant pb-stack-md md:flex-row md:items-end md:justify-between">
				<div className="max-w-3xl space-y-4">
					<p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
						Mis órdenes
					</p>
					<h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary uppercase">
						Historial de compras
					</h1>
					<p className="max-w-2xl font-body-lg text-body-lg text-secondary">
						Consulta tus pedidos registrados y abre el detalle de cada orden cuando lo necesites.
					</p>
				</div>
				<p className="font-label-md text-label-md uppercase tracking-widest text-secondary">
					{orders.length} pedidos
				</p>
			</header>

			<section className="overflow-hidden border border-outline-variant bg-surface-container-lowest">
				<div className="overflow-x-auto">
					<table className="w-full min-w-7xl text-left">
						<thead className="border-b border-outline-variant bg-surface-container-low">
							<tr>
								<th className="px-6 py-4 font-label-sm text-label-sm uppercase tracking-widest text-secondary">Pedido</th>
								<th className="px-6 py-4 font-label-sm text-label-sm uppercase tracking-widest text-secondary">Fecha</th>
								<th className="px-6 py-4 font-label-sm text-label-sm uppercase tracking-widest text-secondary">Entrega</th>
								<th className="px-6 py-4 text-right font-label-sm text-label-sm uppercase tracking-widest text-secondary">Subtotal</th>
								<th className="px-6 py-4 text-right font-label-sm text-label-sm uppercase tracking-widest text-secondary">Total</th>
								<th className="px-6 py-4 text-center font-label-sm text-label-sm uppercase tracking-widest text-secondary">Items</th>
								<th className="px-6 py-4 text-right font-label-sm text-label-sm uppercase tracking-widest text-secondary">Detalle</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-outline-variant">
							{orders.length === 0 ? (
								<tr>
									<td colSpan={7} className="px-6 py-12 text-center font-body-md text-body-md text-secondary">
										No tienes órdenes registradas.
									</td>
								</tr>
							) : (
								orders.map((order) => {
									const itemCount = order.itemsPedido?.length ?? 0

									return (
										<tr key={order.id} className="align-top transition-colors hover:bg-surface-container-low">
											<td className="px-6 py-5">
												<p className="font-headline-sm text-headline-sm text-primary">#{normalizeOrderId(order.id)}</p>
												<p className="mt-1 font-label-sm text-label-sm uppercase tracking-widest text-secondary">{order.id}</p>
											</td>
											<td className="px-6 py-5 font-body-md text-body-md text-primary">{formatDate(order.pedidoFecha)}</td>
											<td className="px-6 py-5 font-body-md text-body-md text-primary">{formatDate(order.fechaEntrega)}</td>
											<td className="px-6 py-5 text-right font-body-md text-body-md text-primary">{formatCurrency(order.subtotal)}</td>
											<td className="px-6 py-5 text-right font-headline-sm text-headline-sm text-primary">{formatCurrency(order.total)}</td>
											<td className="px-6 py-5 text-center font-label-md text-label-md uppercase tracking-widest text-secondary">{itemCount}</td>
											<td className="px-6 py-5 text-right">
												<button
													type="button"
													onClick={() => setSelectedOrder(order)}
													className="border border-outline-variant px-4 py-2 font-label-sm text-label-sm uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-low"
												>
													Ver detalle
												</button>
											</td>
										</tr>
									)
								})
							)}
						</tbody>
					</table>
				</div>
			</section>

			{selectedOrder ? (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
					<div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto border border-outline-variant bg-surface-container-lowest shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
						<div className="flex items-start justify-between gap-6 border-b border-outline-variant p-6 md:p-8">
							<div>
								<p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
									Detalle del pedido
								</p>
								<h2 className="mt-3 font-display-lg text-display-lg-mobile md:text-headline-md text-primary uppercase">
									{selectedOrder.nombreCliente}
								</h2>
								<p className="mt-2 font-body-md text-body-md text-secondary">
									#{normalizeOrderId(selectedOrder.id)} · {selectedOrder.emailCliente}
								</p>
							</div>
							<button
								type="button"
								onClick={() => setSelectedOrder(null)}
								className="inline-flex items-center gap-2 border border-outline-variant px-4 py-2 font-label-sm text-label-sm uppercase tracking-widest text-secondary transition-colors hover:text-primary"
							>
								<IconX className="size-4" />
								Cerrar
							</button>
						</div>

						<div className="grid gap-8 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
							<div className="space-y-6">
								<div className="grid gap-4 md:grid-cols-2">
									<div className="border border-outline-variant bg-surface-container-low p-5">
										<p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Cliente</p>
										<p className="mt-2 font-headline-sm text-headline-sm text-primary">{selectedOrder.nombreCliente}</p>
										<p className="mt-1 font-body-md text-body-md text-secondary">{selectedOrder.telefonoCliente}</p>
										<p className="mt-1 font-body-md text-body-md text-secondary">{selectedOrder.emailCliente}</p>
									</div>
									<div className="border border-outline-variant bg-surface-container-low p-5">
										<p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Fechas</p>
										<p className="mt-2 font-body-md text-body-md text-primary">Pedido: {formatDate(selectedOrder.pedidoFecha)}</p>
										<p className="mt-1 font-body-md text-body-md text-primary">Entrega: {formatDate(selectedOrder.fechaEntrega)}</p>
										<p className="mt-1 font-body-md text-body-md text-secondary">Usuario: {normalizeUser(selectedOrder.usuarioId)}</p>
									</div>
								</div>

								<div className="border border-outline-variant bg-surface-container-low p-5">
									<p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Dirección</p>
									<p className="mt-2 font-body-md text-body-md text-primary">{normalizeAddress(selectedOrder.direccion)}</p>
								</div>

								<div className="border border-outline-variant bg-surface-container-low p-5">
									<div className="flex items-center justify-between gap-4 border-b border-outline-variant pb-4">
										<p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Items del pedido</p>
										<p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">{selectedOrder.itemsPedido.length} items</p>
									</div>
									<div className="mt-4 overflow-x-auto">
										<table className="w-full text-left">
											<thead>
												<tr className="border-b border-outline-variant">
													<th className="py-3 font-label-sm text-label-sm uppercase tracking-widest text-secondary">Producto</th>
													<th className="py-3 text-center font-label-sm text-label-sm uppercase tracking-widest text-secondary">Talla</th>
													<th className="py-3 text-center font-label-sm text-label-sm uppercase tracking-widest text-secondary">Cantidad</th>
													<th className="py-3 text-right font-label-sm text-label-sm uppercase tracking-widest text-secondary">Subtotal</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-outline-variant">
												{selectedOrder.itemsPedido.length === 0 ? (
													<tr>
														<td colSpan={4} className="py-6 text-center font-body-md text-body-md text-secondary">
															No hay items registrados en este pedido.
														</td>
													</tr>
												) : (
													selectedOrder.itemsPedido.map((item) => (
														<tr key={item.id}>
															<td className="py-4 font-body-md text-body-md text-primary">{item.nombreProducto}</td>
															<td className="py-4 text-center font-body-md text-body-md text-primary">{item.talla}</td>
															<td className="py-4 text-center font-body-md text-body-md text-primary">{item.cantidad}</td>
															<td className="py-4 text-right font-body-md text-body-md text-primary">{formatCurrency(item.subtotal)}</td>
														</tr>
													))
												)}
											</tbody>
										</table>
									</div>
								</div>
							</div>

							<div className="space-y-6">
								<div className="border border-outline-variant bg-primary p-6 text-on-primary">
									<p className="font-label-sm text-label-sm uppercase tracking-widest text-on-primary/70">Resumen económico</p>
									<div className="mt-6 space-y-4">
										<div className="flex items-center justify-between gap-4">
											<span className="font-label-md text-label-md uppercase tracking-widest text-on-primary/70">Subtotal</span>
											<span className="font-body-md text-body-md">{formatCurrency(selectedOrder.subtotal)}</span>
										</div>
										<div className="flex items-center justify-between gap-4 border-t border-white/15 pt-4">
											<span className="font-label-md text-label-md uppercase tracking-widest text-on-primary/70">Total</span>
											<span className="font-headline-sm text-headline-sm">{formatCurrency(selectedOrder.total)}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</section>
	)
}