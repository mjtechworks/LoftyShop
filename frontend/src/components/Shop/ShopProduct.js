import React from "react"
import ShopInput from "../Input/ShopInput"
import HeadingMid from "../Typography/HeadingMid"
import ProductCard from "../Card/ProductCard"
import Spinner from "../Utils/Spin"
import Message from "../Utils/Message"

const ShopProduct = ({
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
	loading,
	error,
	product,
	path,
	changePrevState,
	maxPriceChange,
	minPriceChange,
}) => {
	return (
		<>
			<div className="shop-products">
				<div className="shop-products-filter">
					<div className="text">
						<HeadingMid>filter</HeadingMid>
					</div>
					<ShopInput
						gender={gender}
						prevState={prevState}
						changeGender={changeGender}
						category={category}
						changeCategory={changeCategory}
						vendor={vendor}
						changeVendor={changeVendor}
						vendorsLoading={vendorsLoading}
						vendorsError={vendorsError}
						minPrice={minPrice}
						maxPrice={maxPrice}
						data={data}
						filterProducts={filterProducts}
						path={path}
						changePrevState={changePrevState}
						maxPriceChange={maxPriceChange}
						minPriceChange={minPriceChange}
					/>
				</div>
				<div className="shop-products-items">
					{loading ? (
						<Spinner />
					) : error ? (
						<Message color="red-message">{error}</Message>
					) : (
						<ProductCard products={product} />
					)}
				</div>
			</div>
		</>
	)
}

export default ShopProduct
