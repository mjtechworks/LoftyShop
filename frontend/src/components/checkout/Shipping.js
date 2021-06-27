import React from "react"
import HeadingMid from "../Typography/HeadingMid"

const Shipping = ({
	name,
	country,
	changeCountry,
	streetAddress,
	changeStreetAddress,
	changeCity,
	city,
	phoneNumber,
	changePhoneNumber,
	zipcode,
	changeZipcode,
	changeSaveShipping,
	saveShipping,
}) => {
	return (
		<div className="checkout-shipping">
			<div className="checkout-subheading">
				<HeadingMid color="black font-normal">2. shipping and billing address</HeadingMid>
			</div>
			<div className="checkout-address">
				<label htmlFor="name">name</label>
				<input type="text" name="name" id="name" value={name} disabled={true} />
				<label htmlFor="name">country</label>
				<input
					type="text"
					name="country"
					id="country"
					value={country}
					onChange={(e) => changeCountry(e.target.value)}
				/>
				<label htmlFor="name">street address</label>
				<input
					type="text"
					name="streetAddress"
					id="streetAddress"
					value={streetAddress}
					onChange={(e) => changeStreetAddress(e.target.value)}
				/>
				<label htmlFor="name">city and state</label>
				<input
					type="text"
					name="city"
					id="city"
					value={city}
					onChange={(e) => changeCity(e.target.value)}
				/>
				<label htmlFor="name">phone number</label>
				<input
					type="text"
					name="state"
					id="state"
					value={phoneNumber}
					onChange={(e) => changePhoneNumber(e.target.value)}
				/>
				<label htmlFor="name">zipcode</label>
				<input
					type="text"
					name="zipcode"
					id="zipcode"
					value={zipcode}
					onChange={(e) => changeZipcode(e.target.value)}
				/>
				<div className="save-details">
					<input
						type="checkbox"
						name="save"
						id="save"
						onChange={(e) => changeSaveShipping(e.target.checked)}
						checked={saveShipping}
					/>
					<label htmlFor="save">Save Shipping Details</label>
				</div>
			</div>
		</div>
	)
}

export default Shipping
