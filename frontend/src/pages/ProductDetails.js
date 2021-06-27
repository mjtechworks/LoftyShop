import React, { Fragment, useState, useEffect } from "react"
import "./ProductDetails.css"
import { useDispatch, useSelector } from "react-redux"
import Spinner from "../components/Utils/Spin"
import Related from "../components/ProductDetails/Related"
import HeadingMid from "../components/Typography/HeadingMid"
import HeadingSmall from "../components/Typography/HeadingSmall"
import Button3 from "../components/Utils/Button3"
import ShoppinCart from "../assets/svg/ShoppinCart"
import { getProductDetails, createComment } from "../redux/actions/productActions"
import Message from "../components/Utils/Message"
import { addToCart, removeFromCart } from "../redux/actions/cartActions"
import Review from "../components/ProductDetails/Review"
import { CREATE_COMMENT_CLEAR } from "../redux/constants/productConstant"

function ProductDetails({ match }) {
	const [quantity, changeQuantity] = useState(1)
	const [rating, changeRating] = useState(1)
	const [comment, changeComment] = useState("")

	const quantityChange = (e) => {
		changeQuantity(e.target.value)
	}

	const id = match.params.id

	const dispatch = useDispatch()
	const productDetails = useSelector((state) => state.productDetails)
	const { loading, product, error } = productDetails

	const { loading: reviewLoading, review, error: reviewError } = useSelector(
		(state) => state.commentCreate
	)

	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	useEffect(() => {
		if (review) {
			dispatch({ type: CREATE_COMMENT_CLEAR })
			changeRating(1)
			changeComment("")
		}

		dispatch(getProductDetails(id))

		let currentItem = cartItems.find((item) => item.id === id)

		currentItem && changeQuantity(currentItem.qty)
	}, [dispatch, id, cartItems, review])

	const submitComment = () => {
		dispatch(createComment(id, rating, comment))
	}

	return (
		<div className="product-item">
			<div className="product-item-container">
				{loading ? (
					<Spinner />
				) : error ? (
					<Message color="red-message">{error}</Message>
				) : (
					<>
						<div className="product-item-details">
							<img
								src={
									product.image.startsWith("/uploads")
										? `http://localhost:5000${product.image}`
										: product.image
								}
								alt="product-item"
								className="details-image"
							/>
							<div className="details-item">
								<div className="details-item-text">
									<HeadingMid color="dark">{product.name}</HeadingMid>
								</div>
								<p>{product.description}</p>
								<div className="sold-by">
									<HeadingSmall color="light-grey small">
										sold by: {product.vendor.companyName}
									</HeadingSmall>
								</div>

								<div className="quantity-text">
									<HeadingMid color="dark">price</HeadingMid>
								</div>
								<>
									<div className="item-price">
										<div
											className={`current-price ${
												product.discount && "slash"
											}`}
										>{`$${product.price}.00`}</div>
										{product.discount > 0 && (
											<div className="item-current-price">{`$${product.discount}.00`}</div>
										)}
									</div>
								</>

								<Fragment>
									<div className="quantity-text">
										<HeadingMid color="dark">quantity</HeadingMid>
									</div>
									<div className="item-price">
										<div className="item-quantity">
											{+product.countInStock > 0 ? (
												<select
													className="quantity"
													onChange={quantityChange}
													value={quantity}
												>
													{[...Array(+product.countInStock).keys()].map(
														(item) => {
															return (
																<option
																	key={item + 1}
																	value={item + 1}
																>
																	{item + 1}
																</option>
															)
														}
													)}
												</select>
											) : (
												<h4 className="no-stock"> Out of Stock</h4>
											)}
										</div>
										<div className="item-current-price">{`$${
											product.discount > 0
												? quantity * product.discount
												: product.price * quantity
										}.00`}</div>
									</div>
									<div className="items-button">
										{+product.countInStock > 0 &&
											(cartItems &&
											cartItems.find((item) => item.id === id) ? (
												<div
													className="items-button-1"
													onClick={() => dispatch(removeFromCart(id))}
												>
													<Button3 color="black-button2 flex">
														Added to cart
														<ShoppinCart color="product-cart-icon" />
													</Button3>
												</div>
											) : (
												<div
													className="items-button-1"
													onClick={() =>
														dispatch(addToCart(quantity, id))
													}
												>
													<Button3 color="black-button2 flex">
														Add to cart
														<ShoppinCart color="product-cart-icon" />
													</Button3>
												</div>
											))}

										{cartItems &&
											cartItems.find(
												(item) => item.id === id && item.qty !== quantity
											) &&
											+product.countInStock > 0 && (
												<div
													className="items-button-2"
													onClick={() =>
														dispatch(addToCart(quantity, id))
													}
												>
													<Button3 color="item-button2">
														Update Cart
													</Button3>
												</div>
											)}
									</div>
								</Fragment>
							</div>
						</div>

						<Review
							reviews={product.reviews}
							comment={comment}
							changeComment={changeComment}
							rating={rating}
							changeRating={changeRating}
							submitComment={submitComment}
							reviewError={reviewError}
							reviewLoading={reviewLoading}
						/>
					</>
				)}
				<div className="product-item-review"></div>
				{!loading && !error && <Related product={product} />}
			</div>
		</div>
	)
}

export default ProductDetails
