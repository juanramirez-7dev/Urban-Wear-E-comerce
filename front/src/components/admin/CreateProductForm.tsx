import { Link } from "react-router"
import { IconPhotoPlus, IconPlus, IconTrash } from "@tabler/icons-react"
import { adminCreateProductContent } from "../../data/mockData"
import { useCreateProductForm } from "../../hooks/useCreateProductForm"

export default function CreateProductForm() {
	const {
		categories,
		selectedCategory,
		setSelectedCategory,
		variants,
		addVariant,
		removeVariant,
		updateVariant,
		sizeOptions
	} = useCreateProductForm()

	return (
		<section className="min-h-screen text-on-surface">
			<header className="mb-stack-lg flex flex-col gap-6 border-b border-outline-variant pb-8 md:flex-row md:items-end md:justify-between">
				<div className="space-y-1">
					<span className="font-label-sm text-secondary uppercase tracking-widest">
						{adminCreateProductContent.eyebrow}
					</span>
					<h1 className="font-display-lg text-display-lg text-primary">
						{adminCreateProductContent.title}
					</h1>
				</div>
				<div className="flex flex-wrap gap-4">
					<Link
						to="/admin/inventory"
						className="border border-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest transition-colors duration-300 hover:bg-surface-container-low"
					>
						{adminCreateProductContent.cancelLabel}
					</Link>
					<button
						type="button"
						className="bg-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest text-on-primary transition-opacity duration-300 hover:opacity-90"
					>
						{adminCreateProductContent.publishLabel}
					</button>
				</div>
			</header>

			<div className="grid items-start gap-gutter lg:grid-cols-12">
				<div className="space-y-stack-lg lg:col-span-7">
					<section>
						<div className="mb-stack-md">
							<label className="mb-4 block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
								{adminCreateProductContent.productNameLabel}
							</label>
							<input
								className="input-underline font-body-lg text-body-lg"
								type="text"
								placeholder={adminCreateProductContent.productNamePlaceholder}
							/>
						</div>

						<div className="mb-stack-md">
							<label className="mb-4 block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
								{adminCreateProductContent.descriptionLabel}
							</label>
							<textarea
								className="input-underline resize-none p-4 font-body-md text-body-md focus:outline-none"
								rows={6}
								placeholder={adminCreateProductContent.descriptionPlaceholder}
							/>
						</div>

						<div className="w-full md:w-1/2">
							<label className="mb-4 block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
								{adminCreateProductContent.priceLabel}
							</label>
							<div className="relative">
								<span className="absolute left-0 top-1/2 -translate-y-1/2 font-body-lg text-secondary">
									$
								</span>
								<input
									className="input-underline pl-6 font-body-lg text-body-lg"
									type="number"
									placeholder={adminCreateProductContent.pricePlaceholder}
								/>
							</div>
						</div>
					</section>

					<section className="border border-outline-variant bg-surface-container-lowest p-8">
						<div className="mb-6 flex items-center justify-between gap-4">
							<h2 className="font-label-md text-label-md uppercase tracking-widest text-primary">
								{adminCreateProductContent.variantsLabel}
							</h2>
							<span className="text-secondary">
								<IconPlus className="size-5" />
							</span>
						</div>

						<div className="space-y-4" id="variant-container">
							{variants.map((variant) => (
								<div
									key={variant.id}
									className="grid grid-cols-12 items-end gap-4 border-b border-surface-container pb-4 last:border-b-0"
								>
									<div className="col-span-12 md:col-span-5">
										<label className="mb-1 block font-label-sm text-label-sm text-secondary">
											{adminCreateProductContent.sizeLabel}
										</label>
										<select
											className="w-full cursor-pointer border-b border-outline-variant bg-transparent py-2 font-body-md focus:border-black focus:outline-none"
											value={variant.talla}
											onChange={(event) =>
												updateVariant(variant.id, { talla: event.target.value })
											}
										>
											{sizeOptions.map((sizeOption) => (
												<option key={sizeOption} value={sizeOption}>
													{sizeOption}
												</option>
											))}
										</select>
									</div>
									<div className="col-span-12 md:col-span-5">
										<label className="mb-1 block font-label-sm text-label-sm text-secondary">
											{adminCreateProductContent.stockLabel}
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

						<button
							type="button"
							onClick={addVariant}
							className="mt-8 flex items-center gap-2 font-label-md text-label-md uppercase tracking-widest text-primary transition-all hover:underline"
						>
              <span>+</span>
							
							Add Variant
						</button>
					</section>
				</div>

				<div className="space-y-stack-md lg:col-span-5 lg:pl-10">
					<section>
						<label className="mb-4 block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
							{adminCreateProductContent.imageLabel}
						</label>
							<div className="group relative flex aspect-3/4 w-full cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed border-outline-variant bg-surface-container-low transition-colors hover:border-primary">
							<div className="z-10 p-8 text-center transition-opacity group-hover:opacity-0">
								<IconPhotoPlus className="mx-auto mb-4 size-10" />
								<p className="mb-2 font-label-md text-label-md uppercase tracking-wider">
									{adminCreateProductContent.imagePlaceholderTitle}
								</p>
								<p className="font-label-sm text-label-sm text-secondary">
									{adminCreateProductContent.imagePlaceholderHint}
								</p>
							</div>
							<img
								className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
								src={adminCreateProductContent.primaryImageUrl}
								alt={adminCreateProductContent.primaryImageAlt}
							/>
						</div>
					</section>

					<section>
						<label className="mb-4 block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
							{adminCreateProductContent.galleryLabel}
						</label>
						<div className="grid grid-cols-3 gap-4">
							{adminCreateProductContent.galleryImages.map((image) => (
								<div
									key={image.url}
									className="group relative aspect-square overflow-hidden border border-outline-variant bg-surface-container-low transition-all hover:border-primary"
								>
									<img
										className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
										src={image.url}
										alt={image.alt}
									/>
								</div>
							))}
							<div className="flex aspect-square items-center justify-center border border-dashed border-outline-variant transition-all hover:bg-surface-container-high">
								<IconPlus className="size-5 text-secondary" />
							</div>
						</div>
					</section>

					<section className="mt-stack-md">
						<label className="mb-4 block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
							{adminCreateProductContent.categoryLabel}
						</label>
						<div className="flex flex-wrap gap-2">
							{categories.map((category) => {
								const isSelected = category.id === selectedCategory

								return (
									<button
										key={category.id}
										type="button"
										onClick={() => setSelectedCategory(category.id)}
										className={`px-4 py-2 font-label-md text-label-md uppercase tracking-wider transition-all duration-200 ${
											isSelected
												? "border border-primary bg-primary text-on-primary shadow-sm"
												: "border border-outline-variant hover:border-primary hover:bg-surface-container-low"
										}`}
									>
										{category.nombre}
									</button>
								)
							})}
						</div>
					</section>
				</div>
			</div>

			<footer className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-outline-variant pt-10 text-secondary md:flex-row">
				<span className="font-label-sm text-label-sm uppercase tracking-widest">
					{adminCreateProductContent.footer.copyright}
				</span>
				<div className="flex flex-wrap justify-center gap-8">
					{adminCreateProductContent.footer.links.map((link) => (
						<Link
							key={link.label}
							to={link.href}
							className="font-label-sm text-label-sm uppercase tracking-widest transition-colors hover:text-primary"
						>
							{link.label}
						</Link>
					))}
				</div>
			</footer>
		</section>
	)
}