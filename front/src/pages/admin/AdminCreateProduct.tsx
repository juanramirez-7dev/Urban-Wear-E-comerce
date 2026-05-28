import { Link } from "react-router"
import { useRef } from "react"
import { IconPhotoPlus, IconPlus, IconTrash, IconX } from "@tabler/icons-react"
import { useCreateProductForm } from "../../hooks/useCreateProductForm"
import { LoadingState } from "../../components/ui/LoadingState"

export default function AdminCreateProduct() {
	const primaryImageInputRef = useRef<HTMLInputElement | null>(null)
	const galleryInputRef = useRef<HTMLInputElement | null>(null)

	const {
		categories,
		isLoadingCategories,
		selectedCategory,
		variants,
		addVariant,
		removeVariant,
		updateVariant,
		sizeOptions,
		nombre,
		descripcion,
		precio,
		primaryImage,
		galleryImages,
		validationErrors,
		isSubmitting,
		hasAvailableSizes,
		handleNombreChange,
		handleDescripcionChange,
		handlePrecioChange,
		handlePrimaryImageChange,
		removePrimaryImage,
		handleGalleryChange,
		removeGalleryImage,
		handleCategoryChange,
		handleSubmit
	} = useCreateProductForm()

	return (
		<section className="min-h-screen text-on-surface">
			<form id="create-product-form" className="grid items-start gap-gutter lg:grid-cols-12" onSubmit={handleSubmit}>
				<div className="mb-stack-lg flex flex-col gap-6 border-b border-outline-variant pb-8 lg:col-span-12 md:flex-row md:items-end md:justify-between">
					<div className="space-y-1">
						<span className="font-label-sm text-secondary uppercase tracking-widest">
							Gestion de Inventario
						</span>
						<h1 className="font-display-lg text-display-lg text-primary">
							Crear nuevo producto
						</h1>
					</div>
					<div className="flex flex-wrap gap-4">
						<Link
							to="/admin/inventory"
							className="border border-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest transition-colors duration-300 hover:bg-surface-container-low"
						>
							Cancelar
						</Link>
						<button
							type="submit"
							disabled={isSubmitting}
							className="bg-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest text-on-primary transition-opacity duration-300 hover:opacity-90"
						>
							{isSubmitting ? "Publicando..." : "Publicar Producto"}
						</button>
					</div>
				</div>
				<div className="space-y-stack-lg lg:col-span-7">
					<section>
						<div className="mb-stack-md">
							<label className="mb-4 block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
								Nombre
							</label>
							<input
								className="input-underline font-body-lg text-body-lg"
								type="text"
								placeholder="Obersize Hoodie"
								value={nombre}
								onChange={(event) => handleNombreChange(event.target.value)}
							/>
							{validationErrors.nombre ? (
								<p className="mt-2 font-label-sm text-label-sm text-error">{validationErrors.nombre}</p>
							) : null}
						</div>

						<div className="mb-stack-md">
							<label className="mb-4 block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
								Descripción
							</label>
							<textarea
								className="input-underline resize-none p-4 font-body-md text-body-md focus:outline-none"
								rows={6}
								placeholder="Descripción detallada del producto"
								value={descripcion}
								onChange={(event) => handleDescripcionChange(event.target.value)}
							/>
							{validationErrors.descripcion ? (
								<p className="mt-2 font-label-sm text-label-sm text-error">{validationErrors.descripcion}</p>
							) : null}
						</div>

						<div className="w-full md:w-1/2">
							<label className="mb-4 block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
								Precio
							</label>
							<div className="relative">
								<span className="absolute left-0 top-1/2 -translate-y-1/2 font-body-lg text-secondary">
									$
								</span>
								<input
									className="input-underline pl-6 font-body-lg text-body-lg"
									type="number"
									placeholder="0.00"
									value={precio}
									onChange={(event) => handlePrecioChange(event.target.value)}
								/>
							</div>
							{validationErrors.precio ? (
								<p className="mt-2 font-label-sm text-label-sm text-error">{validationErrors.precio}</p>
							) : null}
						</div>
						{validationErrors.categoria ? (
							<p className="mt-4 font-label-sm text-label-sm text-error">{validationErrors.categoria}</p>
						) : null}
					</section>

					<section className="border border-outline-variant bg-surface-container-lowest p-8">
						<div className="mb-6 flex items-center justify-between gap-4">
							<h2 className="font-label-md text-label-md uppercase tracking-widest text-primary">
								Variantes
							</h2>
						</div>

						<div className="space-y-4" id="variant-container">
							{variants.map((variant) => (
								<div
									key={variant.id}
									className="grid grid-cols-12 items-end gap-4 border-b border-surface-container pb-4 last:border-b-0"
								>
									<div className="col-span-12 md:col-span-5">
										<label className="mb-1 block font-label-sm text-label-sm text-secondary">
											Talla
										</label>
										<select
											className="w-full cursor-pointer border-b border-outline-variant bg-transparent py-2 font-body-md focus:border-black focus:outline-none"
											value={variant.talla}
											onChange={(event) =>
												updateVariant(variant.id,  { talla: event.target.value })
											}
										>
											{sizeOptions.map((sizeOption) => (
												<option
													key={sizeOption}
													value={sizeOption}
													disabled={
														sizeOption !== variant.talla &&
														variants.some((otherVariant) => otherVariant.id !== variant.id && otherVariant.talla === sizeOption)
													}
												>
													{sizeOption}
												</option>
											))}
										</select>
									</div>
									<div className="col-span-12 md:col-span-5">
										<label className="mb-1 block font-label-sm text-label-sm text-secondary">
											Stock
										</label>
										<input
											className="w-full border-b border-outline-variant bg-transparent py-2 font-body-md focus:border-black focus:outline-none"
											type="number"
											value={variant.stock}
											onChange={(event) =>
												updateVariant(variant.id, {
													stock: Number(event.target.value)
												})
											}
										/>
									</div>
									<div className="col-span-12 flex justify-end md:col-span-2 md:pt-5">
										<button
											type="button"
											onClick={() => removeVariant(variant.id)}
											className="text-error transition-opacity hover:opacity-70"
											aria-label="Remove variant"
										>
											<IconTrash className="size-5" />
										</button>
									</div>
								</div>
							))}
						</div>
						{validationErrors.variants ? (
							<p className="mt-4 font-label-sm text-label-sm text-error">{validationErrors.variants}</p>
						) : null}

						<button
							type="button"
							onClick={addVariant}
							disabled={!hasAvailableSizes}
							className="mt-8 flex items-center gap-2 font-label-md text-label-md uppercase tracking-widest text-primary transition-all hover:underline disabled:cursor-not-allowed disabled:opacity-40"
						>
								<IconPlus className="size-5" />
							Add Variant
						</button>
					</section>
				</div>

				<div className="space-y-stack-md lg:col-span-5 lg:pl-10">
					<section>
						<label className="mb-4 block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
							Imagen Principal
						</label>
						<input
							ref={primaryImageInputRef}
							type="file"
							accept="image/*"
							className="hidden"
							onChange={(event) => handlePrimaryImageChange(event.target.files?.[0] ?? null)}
						/>
						{primaryImage ? (
							<div className="group relative overflow-hidden border border-outline-variant bg-transparent">
								<img
									className="h-130 w-full object-cover"
									src={primaryImage.previewUrl}
									alt="Imagen principal seleccionada"
								/>
								<button
									type="button"
									onClick={removePrimaryImage}
									className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center border border-outline-variant bg-surface-container-low text-on-surface transition-colors hover:border-primary hover:bg-surface-container-high"
									aria-label="Eliminar imagen principal"
								>
									<IconX className="size-5" />
								</button>
							</div>
						) : (
							<button
								type="button"
								onClick={() => primaryImageInputRef.current?.click()}
								className="group relative flex aspect-3/4 w-full cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed border-outline-variant bg-transparent transition-colors hover:border-primary"
							>
								<div className="z-10 p-8 text-center">
									<IconPhotoPlus className="mx-auto mb-4 size-10" />
									<p className="mb-2 font-label-md text-label-md uppercase tracking-wider">
										Click para subir imagen
									</p>
									<p className="font-label-sm text-label-sm text-secondary">
										PNG
									</p>
								</div>
							</button>
						)}
						{validationErrors.imagenPrincipal ? (
							<p className="mt-2 font-label-sm text-label-sm text-error">{validationErrors.imagenPrincipal}</p>
						) : null}
					</section>

					<section>
						<label className="mb-4 block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
							Galeria de Imagenes
						</label>
						<input
							ref={galleryInputRef}
							type="file"
							accept="image/*"
							multiple
							className="hidden"
							onChange={(event) => {
								handleGalleryChange(event.target.files ?? [])
								event.currentTarget.value = ""
							}}
						/>
						<div className="grid grid-cols-3 gap-4">
							{galleryImages.map((image) => (
								<div
									key={image.id}
									className="group relative aspect-square overflow-hidden border border-outline-variant bg-transparent"
								>
									<img
										className="absolute inset-0 h-full w-full object-cover"
										src={image.previewUrl}
										alt={image.file.name}
									/>
									<button
										type="button"
										onClick={() => removeGalleryImage(image.id)}
										className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center border border-outline-variant bg-surface-container-low text-on-surface opacity-0 transition-opacity group-hover:opacity-100"
										aria-label="Eliminar imagen de galería"
									>
										<IconX className="size-4" />
									</button>
								</div>
							))}
							<button
								type="button"
								onClick={() => galleryInputRef.current?.click()}
								className="flex aspect-square items-center justify-center border border-dashed border-outline-variant bg-transparent transition-all hover:bg-surface-container-high"
							>
								<IconPlus className="size-5 text-secondary" />
							</button>
						</div>
					</section>

					<section className="mt-stack-md">
						<label className="mb-4 block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
              Categoria
						</label>
						<div className="flex flex-wrap gap-2">
              {
                isLoadingCategories ? (
                  <LoadingState
                    size="sm"
                    label="Loading categories"
                    className="items-start py-4"
                  />
                ) : categories.length === 0 ? (
                  <p className="font-body-md text-secondary">
                    No categories available.
                  </p>
                ) : (
                  categories.map((category) => {
                    const isSelected = category.id === selectedCategory

                    return (
                      <button
                        key={category.id}
                        type="button"
								onClick={() => handleCategoryChange(category.id)}
                        className={`px-4 py-2 font-label-md text-label-md uppercase tracking-wider transition-all duration-200 ${
                          isSelected
                            ? "border border-primary bg-primary text-on-primary shadow-sm"
                            : "border border-outline-variant hover:border-primary hover:bg-surface-container-low"
                        }`}
                      >
                        {category.nombre}
                      </button>
                    )
                  })
                )
              }
						</div>
						{validationErrors.submit ? (
							<p className="mt-4 font-label-sm text-label-sm text-error">{validationErrors.submit}</p>
						) : null}
					</section>
				</div>
			</form>
		</section>
	)
}