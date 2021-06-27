import React from "react"
import Message from "../Utils/Message"
import SmallSpin from "../Utils/SmallSpin"
import { Range, createSliderWithTooltip } from "rc-slider"
import "rc-slider/assets/index.css"

const ShopInput = ({
	gender,
	prevState,
	changeGender,
	category,
	changeCategory,
	vendor,
	changeVendor,
	vendorsLoading,
	vendorsError,
	minPrice,
	maxPrice,
	data,
	filterProducts,
	path,
	minPriceChange,
	maxPriceChange,
	changePrevState,
}) => {
	const Ranges = createSliderWithTooltip(Range)

	const getValue = (items) => {
		minPriceChange(items[0])
		maxPriceChange(items[1])
		changePrevState((value) => {
			return { ...value, maxPrice: "", minPrice: "" }
		})
	}
	return (
		<>
			<select
				name="gender"
				id="gender"
				value={
					gender === "gender" ? (prevState.gender ? prevState.gender : gender) : gender
				}
				disabled={path === "/shop" ? false : true}
				onChange={changeGender}
			>
				<option value="gender">gender</option>
				<option value="male">male</option>
				<option value="female">female</option>
			</select>
			<select
				name="category"
				id="category"
				value={
					category === "category"
						? prevState.category
							? prevState.category
							: category
						: category
				}
				onChange={changeCategory}
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
			{vendorsLoading ? (
				<SmallSpin />
			) : vendorsError ? (
				<Message color="red-message">{vendorsError}</Message>
			) : (
				<select
					name="vendor"
					id="vendor"
					value={
						vendor === "vendor"
							? prevState.vendor
								? prevState.vendor
								: vendor
							: vendor
					}
					onChange={changeVendor}
				>
					<option value="vendor">Vendor</option>
					{data.map((ven) => (
						<option key={ven._id} value={ven._id}>
							{ven.companyName}
						</option>
					))}
				</select>
			)}

			<div className="ranges">
				<p>{`$${
					minPrice === 0
						? prevState.minPrice
							? prevState.minPrice
							: minPrice
						: minPrice < maxPrice
						? minPrice
						: maxPrice
				}- $${
					maxPrice === 2000
						? prevState.maxPrice
							? prevState.maxPrice
							: maxPrice
						: minPrice > maxPrice
						? minPrice
						: maxPrice
				}`}</p>
				<Ranges
					min={0}
					max={2000}
					step={100}
					draggableTrack={true}
					onAfterChange={getValue}
					defaultValue={[minPrice, maxPrice]}
					className="range3"
				/>
				<input
					type="button"
					value="Apply"
					className="filter-button"
					onClick={filterProducts}
				/>
			</div>
			{/* <Slider /> */}
		</>
	)
}

export default ShopInput
