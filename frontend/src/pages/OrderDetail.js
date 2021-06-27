import React, { useEffect } from "react"
import "./checkout.css"
import HeadingBig from "../components/Typography/HeadingBig"
import Payment from "../components/checkout/Payment"
import { useHistory, useRouteMatch } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Message from "../components/Utils/Message"
import { getOrder, markAsPaid, markAsDelivered } from "../redux/actions/orderAction"
import HeadingMid from "../components/Typography/HeadingMid"
import HeadingSmall from "../components/Typography/HeadingSmall"
import Spinner from "../components/Utils/Spin"
import SmallSpin from "../components/Utils/SmallSpin"
import { MARK_PAID_CLEAR, MARK_DELIVERED_CLEAR } from "../redux/constants/orderConstants"

const OrderDetails = () => {
	const history = useHistory()
	const match = useRouteMatch()

	const { user } = useSelector((state) => state.user)
	const { order, loading, error } = useSelector((state) => state.orderDetails)
	const { order: payOrder, loading: payLoading, error: payError } = useSelector(
		(state) => state.markAsPaid
	)
	const { order: deliverOrder, loading: deliverLoading, error: deliverError } = useSelector(
		(state) => state.markAsPaid
	)

	const dispatch = useDispatch()

	useEffect(() => {
		if (!user) {
			history.push("/login")
		} else {
			if (payOrder) {
				dispatch({ type: MARK_PAID_CLEAR })
			}
			if (deliverOrder) {
				dispatch({ type: MARK_DELIVERED_CLEAR })
			}
			dispatch(getOrder(match.params.id))
		}
	}, [dispatch, match, history, user, deliverOrder, payOrder])

	return loading ? (
		<Spinner />
	) : error ? (
		<Message color="red-message">{error}</Message>
	) : (
		<div className="checkout">
			<div className="checkout-container">
				<div className="checkout-heading">
					<HeadingBig>order details</HeadingBig>
				</div>
				<div className="checkout-summary">
					<div className="checkout-subheading">
						<HeadingMid color="black font-normal">1. cart summary</HeadingMid>
					</div>
					<div className="summary-details">
						<div className="summary-heading">
							<HeadingSmall color="dark-grey ">product</HeadingSmall>
							<HeadingSmall color="dark-grey ">total</HeadingSmall>
						</div>
						{order.orders.map((item, i) => {
							return (
								<div className="summary-items" key={i}>
									<p className="summary-item">{item.name}</p>
									<p className="summary-item">{`$${item.qty * item.price}.00`}</p>
								</div>
							)
						})}
						<div className="summary-items">
							<p className="summary-shipping">shipping</p>
							<p className="summary-shipping">
								{order.shippingFee ? `$${order.shippingFee}.00` : "free shipping"}
							</p>
						</div>
						<div className="summary-items">
							<p className="summary-total">total</p>
							<p className="summary-total">{`$${order.totalPrice}.00`}</p>
						</div>
					</div>
				</div>
				<div className="checkout-summary">
					<div className="checkout-subheading">
						<HeadingMid color="black font-normal">
							2. shipping and billing address
						</HeadingMid>
					</div>
					<div className="summary-details">
						<div className="summary-heading">
							<HeadingSmall color="dark-grey ">info</HeadingSmall>
							<HeadingSmall color="dark-grey ">details</HeadingSmall>
						</div>

						<div className="summary-items">
							<p className="summary-item">name</p>
							<p className="summary-total">{order.contactInfo.name}</p>
						</div>
						<div className="summary-items">
							<p className="summary-item">country</p>
							<p className="summary-total">{order.contactInfo.country}</p>
						</div>
						<div className="summary-items">
							<p className="summary-item">street address</p>
							<p className="summary-total">{order.contactInfo.streetAddress}</p>
						</div>
						<div className="summary-items">
							<p className="summary-item">city/state</p>
							<p className="summary-total">{order.contactInfo.city}</p>
						</div>
						<div className="summary-items">
							<p className="summary-item">phone number</p>
							<p className="summary-total">{order.contactInfo.phoneNumber}</p>
						</div>
						<div className="summary-items">
							<p className="summary-item">zipcode</p>
							<p className="summary-total">{order.contactInfo.zip}</p>
						</div>
					</div>
				</div>

				{!order.isPaid ? (
					!user.isAdmin ? (
						<Payment order={order} />
					) : (
						<Message color="red-message" children="not yet paid" />
					)
				) : (
					<div className="checkout-summary">
						<div className="checkout-subheading">
							<HeadingMid color="black font-normal">3. payment details</HeadingMid>
						</div>
						<div className="summary-details">
							<div className="summary-heading">
								<HeadingSmall color="dark-grey ">info</HeadingSmall>
								<HeadingSmall color="dark-grey ">details</HeadingSmall>
							</div>

							<div className="summary-items">
								<p className="summary-item">method</p>
								<p className="summary-total">{order.paymentMethod}</p>
							</div>

							<div className="summary-items">
								<p className="summary-item">date</p>
								<p className="summary-total">{order.paidAt}</p>
							</div>
						</div>
					</div>
				)}

				{order.isDelivered && (
					<div className="checkout-summary">
						<div className="checkout-subheading">
							<HeadingMid color="black font-normal">4. delivery details</HeadingMid>
						</div>
						<div className="summary-details">
							<div className="summary-heading">
								<HeadingSmall color="dark-grey ">info</HeadingSmall>
								<HeadingSmall color="dark-grey ">details</HeadingSmall>
							</div>

							<div className="summary-items">
								<p className="summary-item">date</p>
								<p className="summary-total">{order.deliveredAt}</p>
							</div>
						</div>
					</div>
				)}
				{error && <Message color="red-message">{error}</Message>}
				<div className="checkout-buttons">
					<button className="checkout-button red" onClick={() => history.goBack()}>
						back
					</button>

					{payError && <Message color="red-message">{payError}</Message>}
					{deliverError && <Message color="red-message">{deliverError}</Message>}
					{!order.isPaid && user.isAdmin && (
						<button
							className="checkout-button blue button-relative send-order"
							onClick={() => dispatch(markAsPaid(match.params.id, {}))}
						>
							mark as paid
							{payLoading && (
								<div className="cover-1 ">
									<SmallSpin />
								</div>
							)}
						</button>
					)}
					{order.isPaid && user.isAdmin && !order.isDelivered && (
						<button
							className="checkout-button blue button-relative send-order"
							onClick={() => dispatch(markAsDelivered(match.params.id))}
						>
							mark as delivered
							{deliverLoading && (
								<div className="cover-1 ">
									<SmallSpin />
								</div>
							)}
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export default OrderDetails
