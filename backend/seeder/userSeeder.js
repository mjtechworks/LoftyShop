const newUsers = [
	{
		name: "user one",
		email: "userone@gmail.com",
		password: "123456",
		isVendor: false,
		isAdmin: false,
	},
	{
		name: "user two",
		email: "usertwo@gmail.com",
		password: "123456",
		isVendor: false,
		isAdmin: false,
	},
	{
		name: "vendor one",
		email: "vendorone@gmail.com",
		password: "123456",
		isVendor: true,
		isAdmin: false,
	},
	{
		name: "admin one",
		email: "adminone@gmail.com",
		password: "123456",
		isVendor: false,
		isAdmin: true,
	},
]

const newVendor = {
	companyName: "First Vendor",
	image: "/uploads/vendor/brand5.png",
	socialMedia: {
		facebook: "https://facebook.com",
	},
	contactInfo: {
		fullName: "vendor one",
		title: "CEO",
		streetAddress: "A street road somewhere",
		city: "city1",
		zip: 123455,
		country: "some country",
		phoneNumber: 1245690654,
	},
}

export { newUsers, newVendor }
