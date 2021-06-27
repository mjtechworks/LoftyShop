import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getRelatedProducts } from "../../redux/actions/productActions"
import Spinner from "../Utils/Spin"
import Message from "../Utils/Message"
import Underline from "../Typography/Underline"
import ProductCard from "../Card/ProductCard"

function Related({ product }) {
	const dispatch = useDispatch()

	useEffect(() => {
		if (product) {
			dispatch(getRelatedProducts(product.category, product.gender, product._id))
		}
	}, [product, dispatch])

	const relatedProducts = useSelector((state) => state.relatedProduct)
	const { loading, products, error } = relatedProducts

	return loading ? (
		<Spinner />
	) : error ? (
		<Message color="red-message">{error}</Message>
	) : (
		<div className="related-products">
			<div className="related-products-text">
				<Underline>related products</Underline>
			</div>
			<ProductCard products={products} />
		</div>
	)
}

export default Related
