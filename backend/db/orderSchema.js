import mongoose from "mongoose"

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		orders: [
			{
				name: { type: String, required: true },
				qty: { type: Number, required: true },
				price: { type: Number, required: true },
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: "Product",
				},
			},
		],
		shippingFee: Number,
		contactInfo: {
			name: {
				type: String,
				required: true,
			},
			streetAddress: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			zip: {
				type: String,
				required: true,
			},
			country: {
				type: String,
				required: true,
			},
			phoneNumber: {
				type: String,
				required: true,
			},
		},
		paymentMethod: {
			type: String,
			required: true,
			default: "pay later",
		},
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: { type: String },
			email_address: { type: String },
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: {
			type: Date,
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		deliveredAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
)

const Order = mongoose.model("Order", orderSchema)

export default Order
