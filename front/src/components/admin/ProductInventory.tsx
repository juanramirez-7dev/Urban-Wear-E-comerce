import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { LoadingState } from "../ui/LoadingState"
import type { Product, ProductoVariante } from "../../types/productTypes"
import {
	getProductVariants,
	updateVariantStock
} from "../../services/variantService"
import { useAuth } from "../../hooks/useAuth"

export interface ProductInventoryProps {
	readonly products: ReadonlyArray<Product>
	readonly isLoading: boolean
	readonly isError: boolean
	readonly onDelete: (productId: string) => void
	readonly isDeleting: boolean
}

const formatPrice = (value: number) => `$${value.toLocaleString("es-ES")}`

export function ProductInventory({
	products,
	isLoading,
	isError,
	onDelete,
	isDeleting
}: Readonly<ProductInventoryProps>) {
	const { token } = useAuth()
	const [selectedProductId, setSelectedProductId] = useState<string | null>(
		null
	)
	const queryClient = useQueryClient()

	const variantsQuery = useQuery<ProductoVariante[]>({
		queryKey: ["product-variants", selectedProductId],
		queryFn: () => getProductVariants(selectedProductId as string, token),
		enabled: !!selectedProductId
	})

	const updateStockMutation = useMutation<
		void,
		Error,
		{ productId: string; variantId: string; stock: number }
	>({
		mutationFn: ({ productId, variantId, stock }) =>
			updateVariantStock(productId, variantId, stock, token),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["product-variants"] })
		}
	})

	const selectedProduct = selectedProductId
		? products.find((product) => product.id === selectedProductId)
		: null
	if (isLoading) {
		return <LoadingState label="Loading products" />
	}

	if (isError) {
		return (
			<p className="font-body-md text-secondary">
				No pudimos cargar los productos.
			</p>
		)
	}

	if (products.length === 0) {
		return (
			<p className="font-body-md text-secondary">No hay productos disponibles.</p>
		)
	}

	return (
		<section className="bg-surface-container-lowest border border-outline-variant overflow-hidden">
			<div className="overflow-x-auto">
				<table className="w-full text-left">
					<thead className="bg-surface-container-low border-b border-outline-variant">
						<tr>
							<th className="px-6 py-4 font-label-sm text-secondary uppercase tracking-widest">
								Producto
							</th>
							<th className="px-6 py-4 font-label-sm text-secondary uppercase tracking-widest">
								Categoria
							</th>
							<th className="px-6 py-4 font-label-sm text-secondary uppercase tracking-widest">
								Precio
							</th>
							<th className="px-6 py-4 font-label-sm text-secondary uppercase tracking-widest">
								Stock
							</th>
							<th className="px-6 py-4 font-label-sm text-secondary uppercase tracking-widest">
								Acciones
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-outline-variant">
						{products.map((product) => (
							<tr
								key={product.id}
								className="hover:bg-surface-container-low transition-colors"
							>
								<td className="px-6 py-4">
									<div className="flex items-center gap-4">
										<div className="h-14 w-14 overflow-hidden bg-surface-container-low">
											<img
												className="h-full w-full object-cover"
												src={product.imagenPrincipal}
												alt={product.nombre}
											/>
										</div>
										<div>
											<p className="font-label-md text-primary">
												{product.nombre}
											</p>
											<p className="font-label-sm text-secondary">
												{product.id}
											</p>
										</div>
									</div>
								</td>
								<td className="px-6 py-4 font-body-md text-secondary">
									{product.categoriaNombre}
								</td>
								<td className="px-6 py-4 font-label-md text-primary">
									{formatPrice(product.precio)}
								</td>
								<td className="px-6 py-4">
									<button
										type="button"
										onClick={() => setSelectedProductId(product.id)}
										className="border border-outline-variant px-3 py-2 text-sm font-label-md uppercase tracking-widest text-secondary transition-colors hover:text-primary"
									>
										Ver stock
									</button>
								</td>
								<td className="px-6 py-4">
									<button
										type="button"
										onClick={() => onDelete(product.id)}
										disabled={isDeleting}
										className="border border-error px-3 py-2 text-sm font-label-md uppercase tracking-widest text-error transition-colors hover:bg-error-container"
									>
										{isDeleting ? "Eliminando" : "Eliminar"}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{selectedProductId ? (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
					onClick={() => setSelectedProductId(null)}
				>
					<div
						className="w-full max-w-2xl rounded-lg border border-outline-variant bg-surface-container-lowest p-6"
						onClick={(event) => event.stopPropagation()}
					>
						<div className="flex items-start justify-between gap-6 border-b border-outline-variant pb-4">
							<div>
								<h2 className="font-headline-sm text-primary uppercase tracking-tight">
									Stock por talla
								</h2>
								<p className="font-body-md text-secondary mt-2">
									{selectedProduct?.nombre ?? "Producto"}
								</p>
							</div>
							<button
								type="button"
								onClick={() => setSelectedProductId(null)}
								className="border border-outline-variant px-3 py-2 text-sm font-label-md uppercase tracking-widest text-secondary transition-colors hover:text-primary"
							>
								Cerrar
							</button>
						</div>

						{variantsQuery.isLoading ? (
							<p className="mt-6 font-body-md text-secondary">
								Cargando tallas...
							</p>
						) : variantsQuery.isError ? (
							<p className="mt-6 font-body-md text-error">
								{variantsQuery.error?.message}
							</p>
						) : (variantsQuery.data ?? []).length === 0 ? (
							<p className="mt-6 font-body-md text-secondary">
								No hay tallas disponibles.
							</p>
						) : (
							<div className="mt-6 space-y-4">
								{(variantsQuery.data ?? []).map((variant) => (
									<div
										key={variant.id}
										className="flex flex-col gap-4 border border-outline-variant px-4 py-3 md:flex-row md:items-center md:justify-between"
									>
										<div>
											<p className="font-label-md text-primary">
												Talla {variant.talla}
											</p>
											<p className="font-body-md text-secondary">
												Stock actual: {variant.stock}
											</p>
										</div>
										<div className="flex items-center gap-3">
											<button
												type="button"
												disabled={
													updateStockMutation.isPending || variant.stock <= 0
												}
												onClick={() =>
													updateStockMutation.mutate({
														productId: selectedProductId,
														variantId: variant.id,
														stock: Math.max(0, variant.stock - 1)
													})
												}
												className="border border-outline-variant px-3 py-2 text-sm font-label-md uppercase tracking-widest text-secondary transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
											>
												-
											</button>
											<button
												type="button"
												disabled={updateStockMutation.isPending}
												onClick={() =>
													updateStockMutation.mutate({
														productId: selectedProductId,
														variantId: variant.id,
														stock: variant.stock + 1
													})
												}
												className="border border-outline-variant px-3 py-2 text-sm font-label-md uppercase tracking-widest text-secondary transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
											>
												+
											</button>
										</div>
									</div>
								))}

								{updateStockMutation.isError ? (
									<p className="font-body-md text-error">
										{updateStockMutation.error?.message}
									</p>
								) : null}
							</div>
						)}
					</div>
				</div>
			) : null}
		</section>
	)
}
