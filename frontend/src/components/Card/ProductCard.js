import React from "react"
import "./ProductCard.css"
import Product from "./Product"
import Message from "../Utils/Message"

function ProductCard({ products, fill }) {
	const fit = `product-card-container ${fill}`

	return (
		<div className="product-card">
			<div className={fit}>
				{products?.length > 0 ? (
					products.map((productItem) => (
						<Product item={productItem} key={productItem._id} />
					))
				) : (
					<Message color="red-message" children="no product" />
				)}
			</div>
		</div>
	)
}

export default ProductCard
