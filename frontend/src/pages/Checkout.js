import React, { useState } from "react"
import "./checkout.css"
import HeadingBig from "../components/Typography/HeadingBig"
import CartSummary from "../components/checkout/CartSummary"
import Shipping from "../components/checkout/Shipping"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { saveShippingDetails, createOrder } from "../redux/actions/orderAction"
import SmallSpin from "../components/Utils/SmallSpin"
import Message from "../components/Utils/Message"

const Checkout = () => {
	const history = useHistory()

	const { user } = useSelector((state) => state.user)
	const cart = useSelector((state) => state.cart.cartItems)
	const { order, loading, error } = useSelector((state) => state.orderCreate)

	const { shipping } = useSelector((state) => state.shippingDetails)

	const dispatch = useDispatch()

	const [name, changeName] = useState("")
	const [country, changeCountry] = useState("")
	const [streetAddress, changeStreetAddress] = useState("")
	const [city, changeCity] = useState("")
	const [phoneNumber, changePhoneNumber] = useState("")
	const [zipcode, changeZipcode] = useState("")
	const [saveShipping, changeSaveShipping] = useState(false)

	const currentPrice = cart.reduce((prev, curr) => {
		let item = curr.discount ? curr.discount * curr.qty : curr.price * curr.qty
		return prev + item
	}, 0)

	const shippingCost = currentPrice > 700 && Math.ceil((currentPrice * 2.5) / 100)

	const total = currentPrice + shippingCost

	useEffect(() => {
		if (!user) {
			history.push("/login?redirect=/checkout")
		} else {
			if (!cart.length > 0) {
				history.push("/cart")
			} else {
				changeName(user.name)

				if (shipping) {
					changeCountry(shipping.country)
					changeStreetAddress(shipping.streetAddress)
					changeCity(shipping.city)
					changeZipcode(shipping.zip)
					changePhoneNumber(shipping.phoneNumber)
					changeSaveShipping(true)
				}
				if (order) {
					history.push(`/order/${order._id}`)
				}
			}
		}
	}, [user, shipping, order, history, cart])

	const filterCart = () => {
		let things = []
		cart.map((i) => {
			return things.push({
				name: i.name,
				qty: +i.qty,
				price: i.discount ? i.discount : i.price,
				product: i.id,
			})
		})
		return things
	}

	const sendOrder = () => {
		let items = {}
		items["orders"] = filterCart()
		items["contactInfo"] = {
			name,
			streetAddress,
			city,
			zip: zipcode,
			country,
			phoneNumber,
		}
		items["totalPrice"] = currentPrice
		items["shippingFee"] = shippingCost && shippingCost

		if (saveShipping) {
			dispatch(saveShippingDetails(items.contactInfo))
		}
		dispatch(createOrder(items))
	}

	return (
		<div className="checkout">
			<div className="checkout-container">
				<div className="checkout-heading">
					<HeadingBig>checkout</HeadingBig>
				</div>
				<CartSummary shippingCost={shippingCost} total={total} />
				<Shipping
					changeCity={changeCity}
					changeCountry={changeCountry}
					changePhoneNumber={changePhoneNumber}
					changeStreetAddress={changeStreetAddress}
					changeZipcode={changeZipcode}
					city={city}
					country={country}
					name={name}
					phoneNumber={phoneNumber}
					streetAddress={streetAddress}
					zipcode={zipcode}
					saveShipping={saveShipping}
					changeSaveShipping={changeSaveShipping}
				/>
				{error && <Message color="red-message">{error}</Message>}
				<div className="checkout-buttons">
					<button className="checkout-button red" onClick={() => history.goBack()}>
						back
					</button>

					<button
						className="checkout-button blue button-relative send-order"
						onClick={sendOrder}
					>
						place order
						{loading && (
							<div className="cover-1 ">
								<SmallSpin />
							</div>
						)}
					</button>
				</div>
			</div>
		</div>
	)
}

export default Checkout
