import React, { useEffect, useRef, useState } from "react"
import { PaystackButton } from "react-paystack"
import axios from "axios"
import SmallSpin from "../Utils/SmallSpin"
import { useDispatch } from "react-redux"
import { markAsPaid } from "../../redux/actions/orderAction"

const PaystackPayment = ({ order, payNow }) => {
	const dispatch = useDispatch()

	const [stack, setStack] = useState(false)
	const key = useRef("")
	useEffect(() => {
		const data = async () => {
			const { data: id } = await axios.get("/api/config/paystack")
			key.current = id
			setStack(true)
		}
		if (!stack && !order.isPaid && payNow) {
			data()
		}
	}, [order, stack, payNow])

	const config = {
		reference: new Date().getTime(),
		email: order.user.email,
		amount: order.totalPrice * 100 * 411.5,
		publicKey: key.current,
	}

	const handlePaystackSuccessAction = (reference) => {
		reference.paymentMethod = "Paystack"
		reference.email_address = order.user.email
		dispatch(markAsPaid(order._id, reference))
	}

	const componentProps = {
		...config,
		text: (
			<div className="">
				<img
					src="/images/paystack-logo-vector1.png"
					alt="logo"
					style={{ height: "23px" }}
				/>
			</div>
		),
		onSuccess: (reference) => handlePaystackSuccessAction(reference),
	}

	return stack ? <PaystackButton {...componentProps} /> : <SmallSpin />
}

export default PaystackPayment
