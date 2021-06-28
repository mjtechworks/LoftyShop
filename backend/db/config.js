import mongoose from "mongoose"

const db = async () => {
	try {
		const connect = await mongoose.connect(
			process.env.NODE_ENV === "production"
				? process.env.DB_CONNECTION
				: process.env.DB_CONNECTION_TEST,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
			}
		)
		console.log(`db connected on ${connect.connection.host}`)
	} catch (err) {
		console.error(`Error: ${err.message}`)
		process.exit()
	}
}

export default db
