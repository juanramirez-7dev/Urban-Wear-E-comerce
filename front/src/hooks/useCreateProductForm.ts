import { useEffect, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { Category } from "../types/categoryTypes"
import type { ProductoVarianteRequest, Talla } from "../types/productTypes"
import { getCategories } from "../services/categoryService"
import { createProduct } from "../services/productService"
import { useNavigate } from "react-router"

export interface CreateProductVariant {
	readonly id: string
	readonly talla: string
	readonly stock: number
}

interface SelectedImage {
	readonly id: string
	readonly file: File
	readonly previewUrl: string
}

type CreateProductFormErrors = Partial<{
	nombre: string
	descripcion: string
	precio: string
	categoria: string
	imagenPrincipal: string
	variants: string
	submit: string
}>

export interface UseCreateProductFormResult {
	readonly categories: Category[]
	readonly isLoadingCategories: boolean
	readonly selectedCategory: string
	readonly setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
	readonly variants: ReadonlyArray<CreateProductVariant>
	readonly addVariant: () => void
	readonly removeVariant: (variantId: string) => void
	readonly updateVariant: (
		variantId: string,
		changes: Partial<Pick<CreateProductVariant, "talla" | "stock">>
	) => void
	readonly sizeOptions: ReadonlyArray<string>
	readonly availableSizes: ReadonlyArray<string>
	readonly hasAvailableSizes: boolean
	readonly nombre: string
	readonly descripcion: string
	readonly precio: string
	readonly primaryImage: SelectedImage | null
	readonly galleryImages: ReadonlyArray<SelectedImage>
	readonly validationErrors: CreateProductFormErrors
	readonly isSubmitting: boolean
	readonly handleNombreChange: (value: string) => void
	readonly handleDescripcionChange: (value: string) => void
	readonly handlePrecioChange: (value: string) => void
	readonly handlePrimaryImageChange: (file: File | null) => void
	readonly removePrimaryImage: () => void
	readonly handleGalleryChange: (files: FileList | File[]) => void
	readonly removeGalleryImage: (imageId: string) => void
	readonly handleCategoryChange: (categoryId: string) => void
	readonly handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
}

const createVariantId = () => `variant-${Math.random().toString(36).slice(2, 10)}`
const createImageId = () => `image-${Math.random().toString(36).slice(2, 10)}`
const normalizeSize = (size: string) => size.trim().toUpperCase()

export function useCreateProductForm(): UseCreateProductFormResult {
  const { data: categories = [], isLoading: isLoadingCategories } =
    useQuery<Category[]>({
      queryKey: ["categories"],
      queryFn: getCategories
    });

	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const productMutation = useMutation<void, Error, FormData>({
		mutationFn: (productData) => createProduct(productData),
    onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-products"] })
      navigate("/admin/inventory")
    }
  })

	const [selectedCategory, setSelectedCategory] = useState<string>(
		""
	)
	const [nombre, setNombre] = useState<string>("")
	const [descripcion, setDescripcion] = useState<string>("")
	const [precio, setPrecio] = useState<string>("")
	const [primaryImage, setPrimaryImage] = useState<SelectedImage | null>(null)
	const [galleryImages, setGalleryImages] = useState<SelectedImage[]>([])
	const [validationErrors, setValidationErrors] = useState<CreateProductFormErrors>({})

	const initialVariants: CreateProductVariant[] = [
		{ id: crypto.randomUUID(), talla: "L", stock: 12 },
		{ id: crypto.randomUUID(), talla: "M", stock: 8 }
  ]
  const sizeOptions: Talla[] = ["S", "M", "L", "XL"]

	const [variants, setVariants] = useState<CreateProductVariant[]>(
		initialVariants.map((variant) => ({
			id: variant.id,
			talla: variant.talla,
			stock: variant.stock
		}))
	)

	const getTakenSizes = (currentVariants: ReadonlyArray<CreateProductVariant>) =>
		currentVariants.map((variant) => normalizeSize(variant.talla))

	const getAvailableSizes = (currentVariants: ReadonlyArray<CreateProductVariant>) =>
		sizeOptions.filter((sizeOption) => !getTakenSizes(currentVariants).includes(sizeOption))

	useEffect(() => {
		return () => {
			if (primaryImage) {
				URL.revokeObjectURL(primaryImage.previewUrl)
			}

			galleryImages.forEach((image) => {
				URL.revokeObjectURL(image.previewUrl)
			})
		}
	}, [galleryImages, primaryImage])


	const addVariant = () => {
		setVariants((currentVariants) => {
			const availableSizes = getAvailableSizes(currentVariants)
			if (availableSizes.length === 0) {
				setValidationErrors((currentErrors) => ({
					...currentErrors,
					variants: "Ya no hay tallas disponibles para agregar."
				}))
				return currentVariants
			}

			const nextSize = availableSizes[0]

			setValidationErrors((currentErrors) => ({
				...currentErrors,
				variants: undefined,
				submit: undefined
			}))

			return [
				...currentVariants,
				{ id: createVariantId(), talla: nextSize, stock: 0 }
			]
		})
	}

	const removeVariant = (variantId: string) => {
		setVariants((currentVariants) =>
			currentVariants.filter((variant) => variant.id !== variantId)

		)
	}

	const updateVariant = (
		variantId: string,
		changes: Partial<Pick<ProductoVarianteRequest, "talla" | "stock">>
	) => {
		setVariants((currentVariants) =>
			currentVariants.map((variant) => {
				if (variant.id !== variantId) {
					return variant
				}

				if (changes.talla != null) {
					const nextSize = normalizeSize(changes.talla)
					const sizeAlreadyUsed = currentVariants.some(
						(otherVariant) => otherVariant.id !== variantId && normalizeSize(otherVariant.talla) === nextSize
					)

					if (sizeAlreadyUsed) {
						setValidationErrors((currentErrors) => ({
							...currentErrors,
							variants: "No puedes repetir una talla en más de una variante."
						}))
						return variant
					}
				}

				setValidationErrors((currentErrors) => ({
					...currentErrors,
					variants: undefined,
					submit: undefined
				}))

				return { ...variant, ...changes }
			})
		)
	}

	const availableSizes = getAvailableSizes(variants)
	const hasAvailableSizes = availableSizes.length > 0

	const handleNombreChange = (value: string) => {
		setNombre(value)
		setValidationErrors((currentErrors) => ({ ...currentErrors, nombre: undefined, submit: undefined }))
	}

	const handleDescripcionChange = (value: string) => {
		setDescripcion(value)
		setValidationErrors((currentErrors) => ({ ...currentErrors, descripcion: undefined, submit: undefined }))
	}

	const handlePrecioChange = (value: string) => {
		setPrecio(value)
		setValidationErrors((currentErrors) => ({ ...currentErrors, precio: undefined, submit: undefined }))
	}

	const handlePrimaryImageChange = (file: File | null) => {
		setPrimaryImage((currentImage) => {
			if (currentImage) {
				URL.revokeObjectURL(currentImage.previewUrl)
			}

			if (!file) {
				return null
			}

			return {
				id: createImageId(),
				file,
				previewUrl: URL.createObjectURL(file)
			}
		})
		setValidationErrors((currentErrors) => ({ ...currentErrors, imagenPrincipal: undefined, submit: undefined }))
	}

	const removePrimaryImage = () => {
		setPrimaryImage((currentImage) => {
			if (currentImage) {
				URL.revokeObjectURL(currentImage.previewUrl)
			}
			return null
		})
	}

	const handleGalleryChange = (files: FileList | File[]) => {
		const selectedFiles = Array.from(files)
		const nextImages = selectedFiles.map((file) => ({
			id: createImageId(),
			file,
			previewUrl: URL.createObjectURL(file)
		}))

		setGalleryImages((currentImages) => [...currentImages, ...nextImages])
	}

	const removeGalleryImage = (imageId: string) => {
		setGalleryImages((currentImages) => {
			const imageToRemove = currentImages.find((image) => image.id === imageId)
			if (imageToRemove) {
				URL.revokeObjectURL(imageToRemove.previewUrl)
			}

			return currentImages.filter((image) => image.id !== imageId)
		})
	}

	const handleCategoryChange = (categoryId: string) => {
		setSelectedCategory(categoryId)
		setValidationErrors((currentErrors) => ({ ...currentErrors, categoria: undefined, submit: undefined }))
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const nextErrors: CreateProductFormErrors = {}
		const parsedPrice = Number(precio)
		const trimmedNombre = nombre.trim()
		const trimmedDescripcion = descripcion.trim()
		const normalizedSizes = variants.map((variant) => normalizeSize(variant.talla))
		const hasDuplicateSizes = new Set(normalizedSizes).size !== normalizedSizes.length

		if (!trimmedNombre) nextErrors.nombre = "El nombre es obligatorio."
		if (!trimmedDescripcion) nextErrors.descripcion = "La descripción es obligatoria."
		if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
			nextErrors.precio = "Ingresa un precio mayor a 0."
		}
		if (!selectedCategory) nextErrors.categoria = "Selecciona una categoría."
		if (!primaryImage) nextErrors.imagenPrincipal = "Sube una imagen principal."
		if (variants.length === 0) nextErrors.variants = "Agrega al menos una variante."
		if (variants.some((variant) => !variant.talla || !Number.isFinite(variant.stock) || variant.stock < 0)) {
			nextErrors.variants = "Revisa la talla y el stock de las variantes."
		}
		if (hasDuplicateSizes) {
			nextErrors.variants = "No pueden existir tallas repetidas en las variantes."
		}

		setValidationErrors(nextErrors)

		if (Object.keys(nextErrors).length > 0) {
			return
		}

		const selectedPrimaryImage = primaryImage
		if (!selectedPrimaryImage) {
			return
		}

		const formData = new FormData()
		formData.append("nombre", trimmedNombre)
		formData.append("descripcion", trimmedDescripcion)
		formData.append("precio", String(parsedPrice))
		formData.append("categoriaId", selectedCategory)
		formData.append("imagenPrincipal", selectedPrimaryImage.file)

		galleryImages.forEach((image) => {
			formData.append("imagenes", image.file)
		})

		formData.append(
			"variantes",
			JSON.stringify(
				variants.map((variant) => ({
					talla: variant.talla,
					stock: variant.stock
				}))
			)
		)

		await productMutation.mutateAsync(formData)
	}

	return {
		categories,
		isLoadingCategories,
		selectedCategory,
		setSelectedCategory,
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
		isSubmitting: productMutation.isPending,
		handleNombreChange,
		handleDescripcionChange,
		handlePrecioChange,
		handlePrimaryImageChange,
		removePrimaryImage,
		handleGalleryChange,
		removeGalleryImage,
		handleCategoryChange,
		availableSizes,
		hasAvailableSizes,
		handleSubmit
	}
}