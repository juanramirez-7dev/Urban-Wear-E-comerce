import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteProduct, getProducts } from "../../services/productService"
import { useShopPagination } from "../../hooks/useShopPagination"
import type { ProductPagedResponse } from "../../types/productTypes"
import { ProductInventory } from "../../components/admin/ProductInventory"
import { ShopPagination } from "../../components/shop/ShopPagination"
import { useAuth } from "../../hooks/useAuth"

const ITEMS_PER_PAGE = 8

export default function AdminInventory() {
	const { token } = useAuth()
	const [totalItems, setTotalItems] = useState(0)
	const queryClient = useQueryClient()
	const pagination = useShopPagination({
		itemsPerPage: ITEMS_PER_PAGE,
		totalItems
	})

	const {
		data: productsData,
		isLoading,
		isError
	} = useQuery<ProductPagedResponse>({
		queryKey: [
			"admin-products",
			pagination.page,
			pagination.limit,
			pagination.offset
		],
		queryFn: () =>
			getProducts({
				limit: pagination.limit,
				offset: pagination.offset
			})
	})

	useEffect(() => {
		if (productsData?.total != null && productsData.total !== totalItems) {
			setTotalItems(productsData.total)
		}
	}, [productsData?.total, totalItems])

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
				<button className="bg-primary text-on-primary px-6 py-3 font-label-md text-label-md uppercase tracking-widest hover:opacity-90 transition-opacity">
					Agregar producto
				</button>
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
				page={pagination.page}
				totalPages={pagination.totalPages}
				canPrev={pagination.canPrev}
				canNext={pagination.canNext}
				onPrev={pagination.goPrev}
				onNext={pagination.goNext}
			/>
		</section>
	)
}
