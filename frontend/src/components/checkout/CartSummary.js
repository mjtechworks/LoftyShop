import React from "react"
import { useSelector } from "react-redux"
import HeadingMid from "../Typography/HeadingMid"
import HeadingSmall from "../Typography/HeadingSmall"

const CartSummary = ({ currentPrice, total, shippingCost }) => {
	const cart = useSelector((state) => state.cart.cartItems)

	return (
		<div>
			<div className="checkout-summary">
				<div className="checkout-subheading">
					<HeadingMid color="black font-normal">1. cart summary</HeadingMid>
				</div>
				<div className="summary-details">
					<div className="summary-heading">
						<HeadingSmall color="dark-grey ">product</HeadingSmall>
						<HeadingSmall color="dark-grey ">total</HeadingSmall>
					</div>
					{cart.map((item, i) => {
						return (
							<div className="summary-items" key={i}>
								<p className="summary-item">{item.name}</p>
								<p className="summary-item">
									{`$${
										item.discount
											? item.qty * item.discount
											: item.qty * item.price
									}.00`}
								</p>
							</div>
						)
					})}
					<div className="summary-items">
						<p className="summary-shipping">shipping</p>
						<p className="summary-shipping">
							{shippingCost ? `$${shippingCost}.00` : "free shipping"}
						</p>
					</div>
					<div className="summary-items">
						<p className="summary-total">total</p>
						<p className="summary-total">{`$${total}.00`}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CartSummary
