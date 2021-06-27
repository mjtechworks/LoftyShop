import mongoose from "mongoose"

const vendorSchema = mongoose.Schema(
	{
		companyName: {
			type: String,
			required: true,
			unique: true,
		},
		image: {
			type: String,
			required: true,
		},
		socialMedia: {
			facebook: String,
			instagram: String,
			twitter: String,
			pinterest: String,
		},
		contactInfo: {
			fullName: {
				type: String,
				required: true,
			},
			title: {
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
	},
	{
		timestamps: true,
	}
)

const Vendor = mongoose.model("Vendor", vendorSchema)

export default Vendor
