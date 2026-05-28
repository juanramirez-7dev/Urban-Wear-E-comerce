
import { Link, useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { orderService } from "../services/orderService"
import type { PedidoResponse } from "../types/orderTypes"
import { useAuth } from "../hooks/useAuth"
import { LoadingState } from "../components/ui/LoadingState"

const formatCurrency = (value: number) => {
	return new Intl.NumberFormat("es-CO", {
		style: "currency",
		currency: "COP",
		maximumFractionDigits: 0
	}).format(value)
}

const formatDate = (value?: string) => {
	if (!value) return "-"
	const parsedDate = new Date(value)
	if (Number.isNaN(parsedDate.getTime())) return "-"
	return new Intl.DateTimeFormat("es-CO", { dateStyle: "long" }).format(parsedDate)
}

const estimateDelivery = (value?: string) => {
	if (!value) return "-"
	const parsedDate = new Date(value)
	if (Number.isNaN(parsedDate.getTime())) return "-"
	parsedDate.setDate(parsedDate.getDate() + 4)
	return new Intl.DateTimeFormat("es-CO", { dateStyle: "long" }).format(parsedDate)
}

export default function BillPage() {
	const { token } = useAuth()
	const params = useParams()

	const pedidoId = params.id ?? ""

	const {
		data: pedido,
		isLoading,
		isError
	} = useQuery<PedidoResponse, Error>({
		queryKey: ["pedido", pedidoId],
		queryFn: () => orderService.getPedidoById(pedidoId, token),
		enabled: Boolean(pedidoId)
	})

  const handleDownloadPDF = () => {
    try {
      orderService.downloadInvoice(pedidoId)
    } catch (error) {
      console.log(error);
    }
  }

	if (isLoading) {
		return (
			<main className="mx-auto max-w-container-max px-margin-mobile pb-stack-lg pt-24 md:px-margin-desktop">
				<LoadingState label="Cargando factura" />
			</main>
		)
	}

	if (isError || !pedido) {
		return (
			<main className="mx-auto max-w-container-max px-margin-mobile pb-stack-lg pt-24 md:px-margin-desktop">
				<section className="border border-outline-variant bg-surface-container-lowest p-8 text-center md:p-12">
					<p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Factura de Pedido - URBAN</p>
					<h1 className="mt-3 font-display-lg text-display-lg-mobile md:text-display-lg text-primary">
						No se pudo cargar la factura
					</h1>
				</section>
			</main>
		)
	}

	const orderItems = pedido.itemsPedido ?? []
	const iva = pedido.total - pedido.subtotal

	return (
		<main className="mx-auto max-w-container-max px-margin-mobile pb-stack-lg pt-24 md:px-margin-desktop">
			<div className="mb-stack-lg flex flex-col justify-between gap-gutter md:flex-row md:items-end">
				<div>
					<h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary">Orden Confirmada</h1>
					<p className="mt-2 font-body-lg text-body-lg text-secondary">
						Gracias por tu compra. Los detalles de tu orden se encuentran a continuacion
					</p>
				</div>
				<button
					type="button"
					disabled = {isLoading || isError}
					className=" bg-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest text-on-primary opacity-80"
          onClick={handleDownloadPDF}
				>
					Download PDF
				</button>
			</div>

			<section className="border border-outline-variant bg-surface-container-lowest p-8 md:p-12">
				<div className="mb-stack-md flex flex-col justify-between gap-8 border-b border-outline-variant pb-stack-md md:flex-row md:items-start">
					<div>
						<div className="font-headline-md text-headline-md text-primary tracking-tight">URBAN</div>
						<p className="mt-2 font-label-sm text-label-sm uppercase tracking-widest text-secondary">URBAN FASHION GROUP</p>
						<p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">MEDELLIN, COL</p>
					</div>
					<div className="text-left md:text-right">
						<h2 className="font-headline-md text-headline-md uppercase text-primary">ORDEN ID</h2>
						<p className="font-body-md text-body-md text-secondary">{pedido.id}</p>
					</div>
				</div>

				<div className="mb-stack-lg grid grid-cols-1 gap-10 md:grid-cols-2">
					<div className="grid grid-cols-2 gap-8">
						<div>
							<h4 className="mb-stack-sm font-label-md text-label-md uppercase text-primary">Fecha Pedido</h4>
							<p className="font-body-md text-body-md text-primary">{formatDate(pedido.pedidoFecha)}</p>
						</div>
						<div>
							<h4 className="mb-stack-sm font-label-md text-label-md uppercase text-primary">Fecha Entrega</h4>
							<p className="font-body-md text-body-md text-primary">{estimateDelivery(pedido.fechaEntrega)}</p>
						</div>
					</div>

					<div className="rounded-lg border border-outline-variant bg-surface-container-low p-6">
						<h4 className="mb-stack-sm font-label-md text-label-md uppercase text-primary">Informacion Cliente</h4>
						<p className="font-headline-sm text-headline-sm text-primary">{pedido.nombreCliente}</p>
						<p className="mt-1 font-body-md text-body-md text-secondary">{pedido.emailCliente}</p>
						<p className="mt-1 font-body-md text-body-md text-secondary">{pedido.telefonoCliente }</p>
						<p className="mt-3 font-body-md text-body-md text-secondary">{pedido.direccion}</p>
					</div>
				</div>

				<div className="mb-stack-lg overflow-x-auto">
					<table className="w-full border-collapse text-left">
						<thead>
							<tr className="border-b border-primary">
								<th className="py-4 font-label-md text-label-md uppercase tracking-widest text-primary">Producto</th>
								<th className="py-4 text-center font-label-md text-label-md uppercase tracking-widest text-primary">Talla</th>
								<th className="py-4 text-center font-label-md text-label-md uppercase tracking-widest text-primary">Qty</th>
								<th className="py-4 text-right font-label-md text-label-md uppercase tracking-widest text-primary">Subtotal</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-outline-variant">
							{orderItems.length === 0 ? (
								<tr>
									<td colSpan={4} className="py-8 text-center font-body-md text-body-md text-secondary">
										Este pedido no tiene items registrados.
									</td>
								</tr>
							) : (
								orderItems.map((item) => (
									<tr key={`${item.id}-${item.cantidad}`}>
										<td className="py-6 font-headline-sm text-headline-sm text-primary"> {item.nombreProducto}</td>
										<td className="py-6 text-center font-body-md text-body-md text-primary">{item.talla}</td>
										<td className="py-6 text-center font-body-md text-body-md text-primary">{item.cantidad}</td>
										<td className="py-6 text-right font-body-md text-body-md text-primary">{item.subtotal}</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				<div className="flex flex-col items-end gap-3 border-t border-outline-variant pt-6">
					<div className="flex w-full max-w-[320px] justify-between">
						<span className="font-label-md text-label-md uppercase text-secondary">Subtotal</span>
						<span className="font-body-md text-body-md text-primary">{formatCurrency(pedido.subtotal)}</span>
					</div>
					<div className="flex w-full max-w-[320px] justify-between">
						<span className="font-label-md text-label-md uppercase text-secondary">IVA</span>
						<span className="font-body-md text-body-md text-primary">{formatCurrency(iva)}</span>
					</div>
					<div className="mt-2 flex w-full max-w-[320px] justify-between border-t border-primary pt-4">
						<span className="font-headline-sm text-headline-sm uppercase text-primary">Total</span>
						<span className="font-headline-md text-headline-md text-primary">{formatCurrency(pedido.total)}</span>
					</div>
				</div>

				<div className="mt-16 border-t border-outline-variant pt-8 text-center">
					<p className="mb-4 font-label-sm text-label-sm uppercase tracking-widest text-secondary">
						Devoluciones y consultas? Contactanos a nuestro correo de soporte.
					</p>
					<Link
						to="/shop"
						className="inline-flex items-center justify-center border border-outline-variant px-6 py-3 font-label-md text-label-md uppercase tracking-widest text-primary transition-colors hover:border-primary"
					>
						Seguir comprando
					</Link>
				</div>
			</section>
		</main>
	)
}