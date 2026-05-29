import { useState, type FormEvent } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteProduct, getProducts } from "../../services/productService"
import type { ProductPagedResponse } from "../../types/productTypes"
import { ProductInventory } from "../../components/admin/ProductInventory"
import { ShopPagination } from "../../components/shop/ShopPagination"
import { useAuth } from "../../hooks/useAuth"
import { Link } from "react-router"
import type { Category } from "../../types/categoryTypes"
import {
	createCategory,
	deleteCategory,
	getCategories,
	updateCategory
} from "../../services/categoryService"

const ITEMS_PER_PAGE = 8

export default function AdminInventory() {
	const { token } = useAuth()
	const [page, setPage] = useState(1)
	const [categoryName, setCategoryName] = useState("")
	const [editingCategory, setEditingCategory] = useState<Category | null>(null)
	const [isCategoryFormVisible, setIsCategoryFormVisible] = useState(false)
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

	const {
		data: categories = [],
		isLoading: isLoadingCategories,
		isError: isErrorCategories
	} = useQuery<Category[]>({
		queryKey: ["categories"],
		queryFn: () => getCategories(token),
		enabled: Boolean(token)
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

	const createCategoryMutation = useMutation<Category, Error, string>({
		mutationFn: (name) => createCategory({ nombre: name }, token),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] })
			setCategoryName("")
			setEditingCategory(null)
			setIsCategoryFormVisible(false)
		}
	})

	const updateCategoryMutation = useMutation<
		Category,
		Error,
		{ id: string; name: string }
	>({
		mutationFn: ({ id, name }) => updateCategory(id, { nombre: name }, token),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] })
			setCategoryName("")
			setEditingCategory(null)
			setIsCategoryFormVisible(false)
		}
	})

	const deleteCategoryMutation = useMutation<void, Error, string>({
		mutationFn: (categoryId) => deleteCategory(categoryId, token),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] })
		}
	})

	const isSavingCategory =
		createCategoryMutation.isPending || updateCategoryMutation.isPending

	const resetCategoryFormState = () => {
		createCategoryMutation.reset()
		updateCategoryMutation.reset()
	}

	const handleDelete = (productId: string) => {
		deleteProductMutation.mutate(productId)
	}

	const openCreateCategoryForm = () => {
		resetCategoryFormState()
		setEditingCategory(null)
		setCategoryName("")
		setIsCategoryFormVisible(true)
	}

	const openEditCategoryForm = (category: Category) => {
		resetCategoryFormState()
		setEditingCategory(category)
		setCategoryName(category.nombre)
		setIsCategoryFormVisible(true)
	}

	const closeCategoryForm = () => {
		resetCategoryFormState()
		setEditingCategory(null)
		setCategoryName("")
		setIsCategoryFormVisible(false)
	}

	const handleCategorySubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const normalizedName = categoryName.trim()

		if (!normalizedName) {
			return
		}

		if (editingCategory) {
			updateCategoryMutation.mutate({
				id: editingCategory.id,
				name: normalizedName
			})
			return
		}

		createCategoryMutation.mutate(normalizedName)
	}

	const products = productsData?.items ?? []
	const categoryFormTitle = editingCategory ? "Editar categoria" : "Agregar categoria"

	return (
		<section className="min-h-screen space-y-10">
			<div className="mb-stack-lg">
				<div>
					<h1 className="font-display-lg text-display-lg text-primary uppercase">
						Inventory
					</h1>
					<p className="font-body-md text-secondary mt-2">
						Gestion de inventario y catalogo.
					</p>
				</div>
			</div>

			<section className="border border-outline-variant bg-surface-container-lowest">
				<div className="flex flex-col gap-4 border-b border-outline-variant p-6 md:flex-row md:items-center md:justify-between">
					<div>
						<h2 className="font-headline-sm text-primary uppercase tracking-tight">
							Categorias
						</h2>
						<p className="mt-2 font-body-md text-secondary">
							Gestion de categorias del catalogo.
						</p>
					</div>
					<button
						type="button"
						onClick={openCreateCategoryForm}
						className="bg-primary px-6 py-3 font-label-md text-label-md uppercase tracking-widest text-on-primary transition-opacity hover:opacity-90"
					>
						Agregar categoria
					</button>
				</div>

				<div className="p-6 space-y-6">
					{isCategoryFormVisible ? (
						<form onSubmit={handleCategorySubmit} className="border border-outline-variant p-6">
							<div className="flex flex-col gap-4 md:flex-row md:items-end">
								<div className="flex-1">
									<label className="mb-3 block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
										Nombre
									</label>
									<input
										type="text"
										value={categoryName}
										onChange={(event) => setCategoryName(event.target.value)}
										placeholder="Nueva categoria"
										className="w-full border-b border-outline-variant bg-transparent py-3 font-body-md text-body-md focus:outline-none"
									/>
								</div>
								<div className="flex flex-wrap gap-3">
									<button
										type="submit"
										disabled={isSavingCategory}
										className="bg-primary px-6 py-3 font-label-md text-label-md uppercase tracking-widest text-on-primary transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
									>
										{isSavingCategory ? "Guardando..." : categoryFormTitle}
									</button>
									<button
										type="button"
										onClick={closeCategoryForm}
										className="border border-outline-variant px-6 py-3 font-label-md text-label-md uppercase tracking-widest text-secondary transition-colors hover:text-primary"
									>
										Cancelar
									</button>
								</div>
							</div>
							{createCategoryMutation.isError ? (
								<p className="mt-3 font-body-md text-error">
									{createCategoryMutation.error?.message}
								</p>
							) : null}
							{updateCategoryMutation.isError ? (
								<p className="mt-3 font-body-md text-error">
									{updateCategoryMutation.error?.message}
								</p>
							) : null}
						</form>
					) : null}

					<div className="border border-outline-variant overflow-x-auto">
						<table className="w-full text-left">
							<thead className="border-b border-outline-variant bg-surface-container-low">
								<tr>
									<th className="px-6 py-4 font-label-sm text-secondary uppercase tracking-widest">
										Nombre
									</th>
									<th className="px-6 py-4 font-label-sm text-secondary uppercase tracking-widest">
										Acciones
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-outline-variant">
								{isLoadingCategories ? (
									<tr>
										<td className="px-6 py-6 font-body-md text-secondary" colSpan={2}>
											Cargando categorias...
										</td>
									</tr>
								) : isErrorCategories ? (
									<tr>
										<td className="px-6 py-6 font-body-md text-error" colSpan={2}>
											No pudimos cargar las categorias.
										</td>
									</tr>
								) : categories.length === 0 ? (
									<tr>
										<td className="px-6 py-6 font-body-md text-secondary" colSpan={2}>
											No hay categorias disponibles.
										</td>
									</tr>
								) : (
									categories.map((category) => (
										<tr key={category.id} className="hover:bg-surface-container-low transition-colors">
											<td className="px-6 py-4">
												<p className="font-label-md text-primary">{category.nombre}</p>
											</td>
											<td className="px-6 py-4">
												<div className="flex flex-wrap gap-3">
													<button
														type="button"
														onClick={() => openEditCategoryForm(category)}
														className="border border-outline-variant px-3 py-2 font-label-md text-label-md uppercase tracking-widest text-secondary transition-colors hover:text-primary"
													>
														Editar
													</button>
													<button
														type="button"
														onClick={() => deleteCategoryMutation.mutate(category.id)}
														disabled={deleteCategoryMutation.isPending}
														className="border border-error px-3 py-2 font-label-md text-label-md uppercase tracking-widest text-error transition-colors hover:bg-error-container disabled:cursor-not-allowed disabled:opacity-60"
													>
														{deleteCategoryMutation.isPending ? "Eliminando" : "Eliminar"}
													</button>
												</div>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>

					{deleteCategoryMutation.isError ? (
						<p className="font-body-md text-error">
							{deleteCategoryMutation.error?.message}
						</p>
					) : null}
				</div>
			</section>

			<section className="border border-outline-variant bg-surface-container-lowest">
				<div className="flex flex-col gap-4 border-b border-outline-variant p-6 md:flex-row md:items-end md:justify-between">
					<div>
						<h2 className="font-headline-sm text-primary uppercase tracking-tight">
							Productos
						</h2>
						<p className="mt-2 font-body-md text-secondary">
							Gestion de productos.
						</p>
					</div>
					<Link
						to="/admin/inventory/create"
						className="bg-primary px-6 py-3 font-label-md text-label-md uppercase tracking-widest text-on-primary transition-opacity hover:opacity-90"
					>
						Agregar producto
					</Link>
				</div>

				<div className="p-6 space-y-6">
					<ProductInventory
						products={products}
						isLoading={isLoading}
						isError={isError}
						onDelete={handleDelete}
						isDeleting={deleteProductMutation.isPending}
					/>

					{deleteProductMutation.isError ? (
						<p className="font-body-md text-error">
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
				</div>
			</section>
		</section>
	)
}
