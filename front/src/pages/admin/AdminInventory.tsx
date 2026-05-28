import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteProduct, getProducts } from "../../services/productService"
import type { ProductPagedResponse } from "../../types/productTypes"
import { ProductInventory } from "../../components/admin/ProductInventory"
import { ShopPagination } from "../../components/shop/ShopPagination"
import { useAuth } from "../../hooks/useAuth"
import { Link } from "react-router"

const ITEMS_PER_PAGE = 8

export default function AdminInventory() {
	const { token } = useAuth()
	const [page, setPage] = useState(1)
	const queryClient = useQueryClient()
	const limit = ITEMS_PER_PAGE
	const offset = (page - 1) * limit

	const {
		data: productsData,
		isLoading,
		isError
	} = useQuery<ProductPagedResponse>({
		queryKey: ["admin-products", page, limit, offset],
		queryFn: () =>
			getProducts({
				limit,
				offset
			})
	})

	const totalItems = productsData?.total ?? 0
	const totalPages = Math.max(1, Math.ceil(totalItems / limit))
	const canPrev = page > 1
	const canNext = page < totalPages
	const goPrev = () => setPage((currentPage) => Math.max(1, currentPage - 1))
	const goNext = () =>
		setPage((currentPage) => Math.min(totalPages, currentPage + 1))

	const deleteProductMutation = useMutation<void, Error, string>({
		mutationFn: (productId) => deleteProduct(productId, token),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-products"] })
		}
	})

	const handleDelete = (productId: string) => {
		deleteProductMutation.mutate(productId)
	}

	const products = productsData?.items ?? []

	return (
		<section className="min-h-screen">
			<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-stack-lg">
				<div>
					<h1 className="font-display-lg text-display-lg text-primary uppercase">
						Inventory
					</h1>
					<p className="font-body-md text-secondary mt-2">
						Gestion de productos y catalogo.
					</p>
				</div>
				<Link
					to="/admin/inventory/create"
					className="bg-primary px-6 py-3 font-label-md text-label-md uppercase tracking-widest text-on-primary transition-opacity hover:opacity-90"
				>
					Agregar producto
				</Link>
			</div>

			<ProductInventory
				products={products}
				isLoading={isLoading}
				isError={isError}
				onDelete={handleDelete}
				isDeleting={deleteProductMutation.isPending}
			/>

			{deleteProductMutation.isError ? (
				<p className="mt-4 font-body-md text-error">
					{deleteProductMutation.error?.message}
				</p>
			) : null}

			<ShopPagination
				page={page}
				totalPages={totalPages}
				canPrev={canPrev}
				canNext={canNext}
				onPrev={goPrev}
				onNext={goNext}
			/>
		</section>
	)
}
