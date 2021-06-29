import React, { useEffect, useState } from "react"
import "./productEdit.css"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useRouteMatch } from "react-router-dom"
import {
	getVendorProductDetails,
	updateProductDetails,
	deleteProductDetails,
} from "../redux/actions/productActions"
import Spinner from "../components/Utils/Spin"
import Message from "../components/Utils/Message"
import HeadingBig from "../components/Typography/HeadingBig"
import SmallSpin from "../components/Utils/SmallSpin"
import axios from "axios"
import { UPDATE_PRODUCT_CLEAR, DELETE_PRODUCT_CLEAR } from "../redux/constants/productConstant"

const ProductEdit = () => {
	const dispatch = useDispatch()

	const { user } = useSelector((state) => state.user)
	const { loading, product, error } = useSelector((state) => state.productVendorDetails)

	const { loading: updateLoading, success: updateSuccess, error: updateError } = useSelector(
		(state) => state.productUpdateDetails
	)

	const { loading: deleteloading, success: deleteSuccess, error: deleteError } = useSelector(
		(state) => state.productDeleteDetails
	)

	const [name, changeName] = useState("")
	const [image, changeImage] = useState("")
	const [gender, changeGender] = useState("")
	const [category, changeCategory] = useState("")
	const [price, changePrice] = useState(0)
	const [discount, changeDiscount] = useState(0)
	const [description, changeDescription] = useState("")
	const [countInStock, changeCountInStock] = useState(0)

	const [imageLoading, changeImageLoading] = useState(false)
	const [imageError, changeImageError] = useState(false)

	const history = useHistory()
	const match = useRouteMatch()

	useEffect(() => {
		if (!user || !user.isVendor) {
			history.push("/login")
		} else {
			if (updateSuccess) {
				dispatch({ type: UPDATE_PRODUCT_CLEAR })
				history.push("/vendor/products")
			}
			if (deleteSuccess) {
				dispatch({ type: DELETE_PRODUCT_CLEAR })
				history.push("/vendor/products")
			}
			if (!product) {
				dispatch(getVendorProductDetails(match.params.id))
			} else {
				changeName(product.name)
				changeImage(product.image)
				changeGender(product.gender)
				changeCategory(product.category)
				changePrice(product.price)
				changeDiscount(product.discount)
				changeDescription(product.description)
				changeCountInStock(product.countInStock)
			}
		}
	}, [dispatch, history, user, match, product, deleteSuccess, updateSuccess])

	const showError = (e) => {
		changeImageError(e)
		setTimeout(() => changeImageError(null), 3000)
	}

	const sendImage = async (e) => {
		const image = e.target.files[0]
		const formData = new FormData()
		formData.append("image", image)

		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}

		changeImageLoading(true)
		try {
			const { data } = await axios.post("/api/upload/", formData, config)

			changeImage(data)
		} catch (error) {
			showError(`image Upload failed - ${error}`)
		}
		changeImageLoading(false)
	}

	const saveProduct = (id) => {
		const details = {
			name,
			image,
			price,
			category,
			gender,
			countInStock,
			discount,
			description,
		}

		dispatch(updateProductDetails(details, product._id))
	}

	return product ? (
		<div className="productEdit">
			<div className="productEdit-container">
				<div className="productEdit-heading">
					<HeadingBig>edit product</HeadingBig>
				</div>
				<div className="productEdit-inputs">
					<div className="productEdit-input">
						<label htmlFor="name">name</label>
						<input
							type="text"
							name="name"
							id="name"
							value={name}
							onChange={(e) => changeName(e.target.value)}
						/>
					</div>
					<div className="images-Preview">
						<div className="images-Preview-container">
							<div className="images-preview-sub">
								<img src={image} alt="" id="image" />
								{imageLoading && (
									<div className="cover-image1">
										<SmallSpin />
									</div>
								)}
							</div>
						</div>
						<label htmlFor="choose-image">choose image</label>
						<input
							type="file"
							id="choose-image"
							name="img"
							accept="image/png, image/jpeg ,image/png"
							onChange={sendImage}
						/>
					</div>
					{imageError && <Message color="red-message" children={imageError} />}
					<div className="productEdit-input">
						<label htmlFor="genders">gender</label>
						<select
							name="gender"
							id="genders"
							value={gender}
							onChange={(e) => changeGender(e.target.value)}
						>
							<option value="gender">Gender</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					</div>
					<div className="productEdit-input">
						<label htmlFor="categorys">category</label>
						<select
							name="category"
							id="categorys"
							value={category}
							onChange={(e) => changeCategory(e.target.value)}
						>
							<option value="category">category</option>
							{gender === "female" ? null : (
								<>
									<option value="shirts">shirts</option>
									<option value="trousers">trousers</option>
									<option value="accessories">accessories</option>
									<option value="shoes">shoes</option>
								</>
							)}
							{gender === "male" ? null : (
								<>
									<option value="dresses">dresses</option>
									<option value="tops">tops</option>
									<option value="trousers">trousers</option>
									<option value="skirts">skirts</option>
									<option value="accessories">accessories</option>
									<option value="shoes">shoes</option>
								</>
							)}
						</select>
					</div>
					<div className="productEdit-input">
						<label htmlFor="price">price</label>
						<input
							type="number"
							name="price"
							id="price"
							min="0"
							value={price}
							onChange={(e) => changePrice(e.target.value)}
						/>
					</div>
					<div className="productEdit-input">
						<label htmlFor="discount">discount</label>
						<input
							type="number"
							name="discount"
							min="0"
							id="discount"
							value={discount}
							onChange={(e) => changeDiscount(e.target.value)}
						/>
					</div>
					<div className="productEdit-input">
						<label htmlFor="description">description</label>
						<textarea
							name="description"
							id="description"
							cols="30"
							rows="10"
							value={description}
							onChange={(e) => changeDescription(e.target.value)}
						></textarea>
					</div>
					<div className="productEdit-input">
						<label htmlFor="countInStock">count in Stock</label>
						<input
							type="number"
							name="countInStock"
							id="countInStock"
							value={countInStock}
							min="0"
							onChange={(e) => changeCountInStock(e.target.value)}
						/>
					</div>
				</div>
				{(updateError || deleteError) && (
					<Message
						color="red-message"
						children={updateError ? updateError : deleteError}
					/>
				)}
				<div className="productEdit-buttons">
					{user.isVendor && (
						<button
							className="productEdit-button blue button-relative"
							onClick={saveProduct}
						>
							save product{" "}
							{updateLoading && (
								<div className="cover-1 ">
									<SmallSpin />
								</div>
							)}
						</button>
					)}
					<button
						className="productEdit-button red button-relative"
						onClick={() => dispatch(deleteProductDetails(product._id))}
					>
						delete product{" "}
						{deleteloading && (
							<div className="cover-1 ">
								<SmallSpin />
							</div>
						)}
					</button>
				</div>
			</div>
		</div>
	) : loading ? (
		<Spinner />
	) : (
		<Message color="red-message">{error}</Message>
	)
}

export default ProductEdit
