import React, { useState } from "react"
import HeadingMid from "../Typography/HeadingMid"
import PaypalPayment from "./PaypalPayment"
import PaystackPayment from "./PaystackPayment"

const Payment = ({ order }) => {
	const [payNow, setPayNow] = useState(false)
	return (
		<div className="checkout-payment">
			<div className="checkout-subheading">
				<HeadingMid color="black font-normal">3. payment details</HeadingMid>
			</div>
			<div className="payment-details">
				<div className="payment-radio">
					<input type="radio" name="payment" id="pay-later" />
					<label htmlFor="pay-later">pay on delivery</label>
				</div>
				<div className="payment-radio">
					<input
						type="radio"
						name="payment"
						id="pay-now"
						onChange={(e) => setPayNow(e.target.checked)}
					/>
					<label htmlFor="pay-later">pay now</label>
				</div>
				<div className="card-payment">
					{payNow && (
						<div className="card-payment-details">
							<div className="paystack-button">
								<PaystackPayment payNow={payNow} order={order} />
							</div>
							<div className=" min">
								<PaypalPayment payNow={payNow} order={order} />
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Payment
