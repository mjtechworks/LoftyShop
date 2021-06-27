import React from "react"
import ProductCard from "../Card/ProductCard"
import "./FeaturedProduc.css"
import Button from "../Utils/Button"
import Underline from "../Typography/Underline"
import { useDispatch, useSelector } from "react-redux"
import Spinner from "../Utils/Spin"
import { useEffect } from "react"
import { homeFeaturedItems } from "../../redux/actions/productActions"
import Message from "../Utils/Message"

function FeaturedProduct({ items }) {
	const dispatch = useDispatch()
	const featuredProduct = useSelector((state) => state.homeFeatured)
	const { products, loading, error } = featuredProduct

	useEffect(() => {
		dispatch(homeFeaturedItems())
	}, [dispatch])

	return (
		<div className="featured-product">
			<div className="featured-product-container">
				<div className="featured-product-heading">
					<Underline>featured products</Underline>
				</div>
				{loading ? (
					<Spinner />
				) : error ? (
					<Message color="red-message" children={error} />
				) : (
					<ProductCard products={products} />
				)}
				<div className="featured-product-button">
					<Button link="/shop" color="blue">
						check products
					</Button>
				</div>
			</div>
		</div>
	)
}

export default FeaturedProduct
