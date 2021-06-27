import { Router } from "express"
import {
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
	updateProduct,
	deleteProduct,
	getAllVendorProducts,
	productSearch,
} from "../controllers/productController.js"
import { protect, admin, vendor, vendorAdmin, user } from "../auth/auth.js"

const router = Router()

router.route("/").post(protect, createProduct).get(protect, vendorAdmin, getProductdetailsVendor)

router.route("/featured/home").get(getHomeFeatured)

router.route("/shop").get(getShopProducts)

router.route("/search").get(productSearch)

router.get("/options", getVendors)

router.get("/cart/:id", getCartProductById)

router.get("/related/products", getRelatedProducts)

router.get("/all/products", protect, admin, getAllProducts)

router.get("/all/vendor/products", protect, vendor, getAllVendorProducts)

router
	.route("/:id")
	.get(getProductById)
	.put(protect, user, createComment)
	.post(protect, vendor, updateProduct)
	.delete(protect, vendorAdmin, deleteProduct)

export default router
