import React, { useEffect, useState } from "react"
import { PayPalButton } from "react-paypal-button-v2"
import axios from "axios"
import SmallSpin from "../Utils/SmallSpin"
import { useDispatch } from "react-redux"
import { markAsPaid } from "../../redux/actions/orderAction"

const PaypalPayment = ({ order, payNow }) => {
	const dispatch = useDispatch()

	const [sdk, setSdk] = useState(false)

	useEffect(() => {
		const addPaypal = async () => {
			const { data: clientId } = await axios.get("/api/config/paypal")

			const script = document.createElement("script")
			script.type = "text/javascript"
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
			script.async = true
			script.onload = () => {
				setSdk(true)
			}
			document.body.appendChild(script)
		}
		if (!window.paypal && !order.isPaid && payNow) {
			addPaypal()
		} else {
			setSdk(true)
		}
	}, [order, payNow])

	const successPaymentHandler = (paymentResult) => {
		paymentResult.paymentMethod = "Paypal"
		dispatch(markAsPaid(order._id, paymentResult))
	}

	return sdk ? (
		<PayPalButton
			style={{ size: "responsive", zIndex: "-1" }}
			amount={order.totalPrice}
			onSuccess={successPaymentHandler}
		/>
	) : (
		<SmallSpin />
	)
}

export default PaypalPayment
