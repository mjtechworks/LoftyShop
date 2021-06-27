import mongoose from "mongoose"

const reviewSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

const productSchema = mongoose.Schema(
	{
		vendor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Vendor",
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		discount: Number,
		category: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		countInStock: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		numReviews: {
			type: Number,
			required: true,
			default: 0,
		},
		reviews: [reviewSchema],
		totalRatings: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
)

const Product = mongoose.model("Product", productSchema)

export default Product
