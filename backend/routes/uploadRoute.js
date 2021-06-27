import express from "express"
import multer from "multer"
import path from "path"

const router = express.Router()

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "./uploads")
	},
	filename(req, file, cb) {
		cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
	},
})

const checkFileType = (file, cb) => {
	const fileTypes = /jpg|jpeg|png/
	const extname = fileTypes.test(path.extname(file.originalname))
	const mimetype = fileTypes.test(file.mimetype)

	if (extname && mimetype) {
		return cb(null, true)
	} else return cb("Images Only")
}

const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb)
	},
})

router.post("/", upload.single("image"), (req, res) => {
	res.send(`/${req.file.path}`)
})

export default router
