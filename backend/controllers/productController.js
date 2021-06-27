import asyncHandler from "express-async-handler"
import Product from "../db/productSchema.js"
import Vendor from "../db/vendorSchema.js"

// @desc get featured products for home page
// @route GET /api/product/featured/home
// @access public
const getHomeFeatured = asyncHandler(async (req, res) => {
	let featuredProduct = await Product.find({ discount: { $gte: 0 } })
		.limit(5)
		.sort({ createdAt: "desc" })
	featuredProduct = await Vendor.populate(featuredProduct, { path: "vendor" })
	if (!featuredProduct) {
		throw new Error({ message: "no featured products available" })
	}
	res.status(200).json(featuredProduct)
})

// @desc get all products
// @route GET /api/product/shop
// @access public
const getShopProducts = asyncHandler(async (req, res) => {
	const { vendor, category, gender, minPrice, maxPrice, currentPage } = req.query

	const price = {}
	if (minPrice && minPrice !== "") {
		price.$gte = minPrice
	}

	if (maxPrice && maxPrice !== "") {
		price.$lte = maxPrice
	}

	const search = {}
	if (vendor && vendor !== "") search.vendor = vendor
	if (category && category !== "") search.category = category
	if (gender && gender !== "") search.gender = gender
	if ((minPrice && minPrice !== "") || (maxPrice && maxPrice !== "")) search.price = price

	let pageLimit = 10

	let skip = pageLimit * (+currentPage - 1)

	let shopProducts = await Product.find(search)
		.skip(skip)
		.limit(pageLimit)
		.sort({ createdAt: "desc" })

	shopProducts = await Vendor.populate(shopProducts, { path: "vendor" })

	let count = await Product.countDocuments(search)

	let pages = Math.ceil(count / pageLimit)

	res.status(200).json({ shopProducts, currentPage, pages })
})

// @desc get filter options
// @route GET /api/product/options
// @access public
const getVendors = asyncHandler(async (req, res) => {
	const vendorOptions = await Vendor.find().select("companyName")

	res.json(vendorOptions)
})

// @desc search products
// @route GET /api/product/search
// @access public
const productSearch = asyncHandler(async (req, res) => {
	const searchResult = await Product.find({
		name: {
			$regex: req.query.word,
			$options: "i",
		},
	})
		.select("name _id gender")
		.limit(4)

	res.status(200).json(searchResult)
})

// @desc get product by id
// @route GET api/product/:id
// @access public
const getProductById = asyncHandler(async (req, res) => {
	const { id } = req.params

	const product = await Product.findById(id).populate()
	await Vendor.populate(product, { path: "vendor", select: "companyName image" })

	if (!product) {
		res.status(500)
		throw new Error("Product does not exist")
	} else {
		res.status(200).json({ product })
	}
})

// @desc get cartProduct by id
// @route GET /api/product/cart/:id
//access public
const getCartProductById = asyncHandler(async (req, res) => {
	const id = req.params.id

	const product = await Product.findById(id).select("name image price discount countInStock")

	if (!product) {
		res.status(500)
		throw new Error("Product does not exist")
	} else {
		res.status(200).json({ product })
	}
})

// @desc get related products
// @route GET api/product/related/products
// @access public
const getRelatedProducts = asyncHandler(async (req, res) => {
	const { category, gender, id } = req.query

	const relatedProduct = await Product.find({ gender, _id: { $ne: id } })
		.sort({
			category: { $eq: category } ? 1 : -1,
		})
		.limit(4)
	await Vendor.populate(relatedProduct, { path: "vendor", select: "companyName image" })

	if (!relatedProduct) {
		res.status(500)
		throw new Error("No related products")
	} else {
		res.status(200).json(relatedProduct)
	}
})

// @desc get all products
// @route GET /api/product/all/product
// @access admin
const getAllProducts = asyncHandler(async (req, res) => {
	const { currentPage } = req.query

	const pageLimit = 10

	const skip = (+currentPage - 1) * pageLimit

	const totalNumber = await Product.countDocuments()

	const products = await Product.find({}).skip(skip).limit(pageLimit).sort({ createdAt: "desc" })
	await Vendor.populate(products, { path: "vendor", select: "companyName" })

	const totalPages = Math.ceil(totalNumber / pageLimit)

	res.status(200).json({ products, totalPages, currentPage })
})

// @desc get all products
// @route GET /api/product/all/vendor/product
// @access vendor
const getAllVendorProducts = asyncHandler(async (req, res) => {
	const { currentPage } = req.query

	const pageLimit = 10

	const skip = (+currentPage - 1) * pageLimit

	const totalNumber = await Product.countDocuments({ vendor: req.user.vendor })

	const products = await Product.find({ vendor: req.user.vendor })
		.skip(skip)
		.limit(pageLimit)
		.sort({ createdAt: "desc" })

	await Vendor.populate(products, { path: "vendor", select: "companyName" })

	const totalPages = Math.ceil(totalNumber / pageLimit)

	res.status(200).json({ products, totalPages, currentPage })
})

// @desc post a comment
// @route PUT /api/product/:id
// @access public
const createComment = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body
	const { id } = req.params
	const product = await Product.findById(id)
	if (product) {
		const hasComment = product.reviews.find(
			(it) => it.userId.toString() === req.user._id.toString()
		)

		if (!hasComment) {
			const review = {
				name: req.user.name,
				rating: Number(rating),
				comment,
				userId: req.user._id,
			}

			product.reviews.push(review)
			product.numReviews = product.reviews.length
			product.totalRatings = (
				product.reviews.reduce((prev, curr) => prev + curr.rating, 0) / product.numReviews
			).toFixed(1)

			const newProduct = await product.save()
			res.status(201).json(newProduct)
		} else {
			res.status(500)
			throw new Error("you've already commented on this product")
		}
	} else {
		res.status(404)
		throw new Error("Product does not exist")
	}
})

// @desc create product
// @route POST /api/product/
// @access vendor
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		vendor: req.user.vendor,
		name: "sample",
		image: "/images/No_image.png",
		price: 0,
		category: "shoes",
		gender: "male",
		countInStock: 0,
		discount: 0,
		description: "Sample Sample Sample",
	})

	const createdProduct = await product.save()

	res.status(201).json(createdProduct)
})

// @desc get product details by id
// @route GET /
//access vendor/admin
const getProductdetailsVendor = asyncHandler(async (req, res) => {
	const id = req.query.id

	const product = await Product.findById(id)

	if (!product) {
		res.status(404)
		throw new Error("Product does not exist")
	} else {
		res.status(200).json(product)
	}
})

// @desc update a product by id
// @route POST /:id
//access vendor
const updateProduct = asyncHandler(async (req, res) => {
	const id = req.params.id

	const { name, image, price, category, gender, countInStock, discount, description } = req.body

	const product = await Product.findById(id)

	if (!product) {
		res.status(404)
		throw new Error("Product does not exist")
	} else {
		if (product.vendor.toString() === req.user.vendor.toString()) {
			product.name = name
			product.image = image
			product.price = price
			;(product.category = category), (product.gender = gender)
			product.countInStock = countInStock
			;(product.discount = discount), (product.description = description)
			const newProduct = await product.save()
			res.status(201).json("Successfully updated the product")
		} else {
			res.status(500)
			throw new Error("Not authorised to edit this product")
		}
	}
})

// @desc get cartProduct by id
// @route GET /:id
//access vendor/admin
const deleteProduct = asyncHandler(async (req, res) => {
	const id = req.params.id

	const product = await Product.findById(id)

	if (!product) {
		res.status(404)
		throw new Error("Product does not exist")
	} else {
		await product.remove()
		res.status(200).json("Product Successfully removed")
	}
})

export {
	getHomeFeatured,
	getShopProducts,
	getVendors,
	getProductById,
	getCartProductById,
	getRelatedProducts,
	getAllProducts,
	createComment,
	createProduct,
	getProductdetailsVendor,
	deleteProduct,
	updateProduct,
	getAllVendorProducts,
	productSearch,
}
