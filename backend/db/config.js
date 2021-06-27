import mongoose from "mongoose"

const db = async () => {
	try {
		const connect = await mongoose.connect(process.env.DB_CONNECTION, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		console.log(`db connected on ${connect.connection.host}`)
	} catch (err) {
		console.error(`Error: ${err.message}`)
		process.exit()
	}
}

export default db
