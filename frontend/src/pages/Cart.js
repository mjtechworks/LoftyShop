import React, { useState, useEffect } from "react"
import "./Cart.css"
import HeadingSmall from "../components/Typography/HeadingSmall"
import HeadingMid from "../components/Typography/HeadingMid"
import HeadingBig from "../components/Typography/HeadingBig"
import Button from "../components/Utils/Button"
import { useSelector, useDispatch } from "react-redux"
import { addToCart } from "../redux/actions/cartActions"
import { CREATE_ORDER_CLEAR } from "../redux/constants/orderConstants"

const Cart = () => {
	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	const [cartQuantity, changeCartQuantity] = useState(+cartItems.qty)
	const [cartId, changeCartId] = useState("")

	const cartQuantityChange = (e, id) => {
		changeCartQuantity(e.target.value)
		changeCartId(id)
	}

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch({ type: CREATE_ORDER_CLEAR })
		cartId !== "" && dispatch(addToCart(cartQuantity, cartId))
	}, [dispatch, cartQuantity, cartId])

	return cartItems.length > 0 ? (
		<div className="cart">
			<div className="cart-container">
				<div className="cart-heading">
					<div className="cart-heading-1">
						<HeadingSmall>product</HeadingSmall>
					</div>
					<div className="cart-heading-2">
						<HeadingSmall>quantity</HeadingSmall>
					</div>
					<div className="cart-heading-3">
						<HeadingSmall>price</HeadingSmall>
					</div>
					<div className="cart-heading-4">
						<HeadingSmall>subtotal</HeadingSmall>
					</div>
				</div>
				<div className="cart-product-container">
					{cartItems.map((item) => {
						return (
							<div className="cart-product" key={item.id}>
								<div className="cart-product-1">
									<img src={item.image} alt="product" className="cart-image" />
									<div className="name">
										<HeadingMid color="font black font-cart">
											{item.name}
										</HeadingMid>
									</div>
								</div>
								<div className="cart-product-2">
									<select
										id="quantity"
										className="quantity"
										value={item.qty}
										onChange={(e) => cartQuantityChange(e, item.id)}
									>
										{[...Array(item.countInStock).keys()].map((i) => (
											<option key={i} value={i + 1}>
												{i + 1}
											</option>
										))}
									</select>
								</div>
								<div className="cart-product-3">
									<HeadingMid color="black font-cart">
										{`$${item.price}.00`}
									</HeadingMid>
								</div>
								<div className="cart-product-4">
									<HeadingMid color="black font-cart">
										{`$${item.price * item.qty}.00`}
									</HeadingMid>
								</div>
							</div>
						)
					})}
				</div>
				<div className="cart-total">
					<div className="cart-total-tag">
						<HeadingMid color="black">total</HeadingMid>
					</div>
					<div className="cart-total-price">
						<HeadingMid color="black">{`$${cartItems.reduce((prev, curr) => {
							let item =
								curr.discount > 0 ? curr.discount * curr.qty : curr.price * curr.qty
							return prev + item
						}, 0)}.00`}</HeadingMid>
					</div>
				</div>
				<div className="cart-button">
					<div className="cart-button-1">
						<Button link="#" color="red cart-button " arrow="yes">
							back
						</Button>
					</div>
					<div className="cart-button-2">
						<Button link="/checkout" color="blue cart-button">
							checkout
						</Button>
					</div>
				</div>
			</div>
		</div>
	) : (
		<div className="cart-something">
			<HeadingBig color="cart-font">please add something to cart</HeadingBig>
		</div>
	)
}

export default Cart
