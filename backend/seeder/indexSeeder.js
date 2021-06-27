import Product from "../db/productSchema.js"
import User from "../db/userSchema.js"
import Vendor from "../db/vendorSchema.js"
import { newProducts, newReviews } from "./productSeeder.js"
import { newUsers, newVendor } from "./userSeeder.js"
import db from "../db/config.js"
import dotenv from "dotenv"

dotenv.config()
db()

const createDocuments = async () => {
	try {
		await Product.deleteMany()
		await User.deleteMany()
		await Vendor.deleteMany()

		const ven = await Vendor.create(newVendor)

		console.log("Vendor Added")

		newUsers[2].vendor = ven._id

		const use = await User.insertMany(newUsers)

		console.log("User Added")

		const newReview = newReviews.map((items, i) => {
			return { ...items, name: use[i].name, userId: use[i]._id }
		})

		const newProduct = newProducts.map((items) => {
			return { ...items, vendor: ven._id }
		})

		newProduct[0].reviews = [...newReview]

		newProduct[0].numReviews = newReview.length

		newProduct[0].totalRatings =
			newProduct[0].reviews.reduce((prev, curr) => curr.rating + prev, 0) /
			newProduct[0].numReviews
		await Product.insertMany(newProduct)

		console.log("Products Added")

		process.exit()
	} catch (err) {
		console.error(err)
		process.exit()
	}
}

const deleteMany = async () => {
	try {
		await Product.deleteMany()
		await User.deleteMany()
		await Vendor.deleteMany()
	} catch (error) {
		console.log(error)
		process.exit()
	}
}

createDocuments()
