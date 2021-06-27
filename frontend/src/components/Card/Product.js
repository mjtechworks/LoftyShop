import React from "react"
import "./ProductCard.css"
import HeadingMid from "../Typography/HeadingMid"
import { Link } from "react-router-dom"
import ShoppinCart from "../../assets/svg/ShoppinCart"
import Button3 from "../Utils/Button3"
import Star from "../Utils/Star"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from "../../redux/actions/cartActions"

function Product(props) {
	const {
		image,
		name,
		price,
		_id: id,
		gender,
		totalRatings,
		numReviews,
		vendor,
		discount,
		category,
		countInStock,
	} = props.item

	const dispatch = useDispatch()
	const cartState = useSelector((state) => state.cart.cartItems)
	return (
		<div className="card">
			<figure className="card-image">
				<img className="card-image-item" src={image} alt="product" />
			</figure>
			<div className="product-card-details">
				<Link to={`/vendors/${name}`} className="decoration">
					<p className="product-vendor">sold by: {vendor.companyName} </p>
				</Link>
				<div className="product-name">
					<HeadingMid color="black font">{name}</HeadingMid>
				</div>
				<p className="product-category">{category}</p>
				<div className="card-details-price">
					<p className={`product-price ${discount && "slash"}`}>{"$" + price + ".00"}</p>
					{discount > 0 && <p className="product-discount">{"$" + discount + ".00"}</p>}
				</div>
				<div className="card-details-ratings">
					<Star ratings={totalRatings} />
					<div className="product-card-reviews">
						{numReviews > 0
							? numReviews > 1
								? `${numReviews} reviews `
								: `${numReviews} review`
							: "No reviews"}
					</div>
				</div>
				<div className="card-details-button">
					{countInStock > 0 ? (
						cartState && cartState.find((item) => item.id === id) ? (
							<div
								className="products-button product-button2-left"
								onClick={() => dispatch(removeFromCart(id))}
							>
								<Button3 color="black-button3">
									<span className="button-span">
										<span className="button-span-text">Added to cart</span>
										<ShoppinCart color="product-cart-icon" />
									</span>
								</Button3>
							</div>
						) : (
							<div className="products-button product-button3-left">
								<Button3 color="black-button3">
									<span className="button-span">
										<span
											className="button-span-text"
											onClick={() => dispatch(addToCart(1, id))}
										>
											Add to cart
										</span>
										<ShoppinCart color="product-cart-icon" />
									</span>
								</Button3>
							</div>
						)
					) : (
						<h4 className="n-stock"> Out of Stock</h4>
					)}
					<Link to={`/product/${gender}/${id}`}>
						<div className="product-button product-button3-right">
							<Button3>view item</Button3>
						</div>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Product
