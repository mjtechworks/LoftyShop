import React from "react"
import "./ProductList.css"
import HeadingBig from "../components/Typography/HeadingBig"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {
	getAllProducts,
	createProduct,
	getVendorAllProducts,
} from "../redux/actions/productActions"
import Spinner from "../components/Utils/Spin"
import Message from "../components/Utils/Message"
import Pagination from "../components/Utils/Pagination"
import { useLocation, useHistory } from "react-router-dom"
import { CREATE_PRODUCT_CLEAR, GET_VENDOR_PRODUCT_CLEAR } from "../redux/constants/productConstant"
import SmallSpin from "../components/Utils/SmallSpin"

const ProductList = () => {
	const history = useHistory()

	const search = useLocation().search
	const dispatch = useDispatch()

	const { user } = useSelector((state) => state.user)
	const { loading: createLoading, product: createProducts, error: createError } = useSelector(
		(state) => state.createProduct
	)

	useEffect(() => {
		dispatch({ type: CREATE_PRODUCT_CLEAR })
		dispatch({ type: GET_VENDOR_PRODUCT_CLEAR })
		if (!user || !(user.isAdmin || user.isVendor)) {
			history.push("/login")
		} else {
			if (createProducts) {
				history.push(`/vendor/products/edit/${createProducts._id}`)
			} else {
				const newPage = search ? search.split("=")[1] : null
				if (user.isAdmin) {
					dispatch(getAllProducts(newPage))
				} else if (user.isVendor) {
					dispatch(getVendorAllProducts(newPage))
				}
			}
		}
	}, [dispatch, search, user, history, createProducts])

	const allProducts = useSelector((state) => state.getAllProductsList)
	const { loading, products, error } = allProducts

	return (
		<div className="productList">
			<div className="productList-container">
				<div className="productList-heading">
					<HeadingBig>
						{products?.products?.length === 0 ? "pls add a product" : "products list"}
					</HeadingBig>
				</div>
				{loading ? (
					<Spinner />
				) : error ? (
					<Message color="red-message">{error}</Message>
				) : products.products.length > 0 ? (
					<>
						<div className="productList-details">
							<div className="productList-details-heading">
								<p>name</p>
								<p>image</p>
								<p>vendor</p>
								<p>category</p>
								<p>price</p>
								<p>gender</p>
								<p>count in stock</p>
								<p>discount</p>
								<p></p>
							</div>
							<div className="productList-details-items">
								{products.products.map((product) => {
									return (
										<div key={product._id} className="productList-details-item">
											<p>{product.name}</p>
											<img src={product.image} alt={product.name} />
											<p>{product.vendor.companyName}</p>
											<p id="pcategory">{product.category}</p>
											<p>{`$${product.price}.00`}</p>
											<p>{product.gender}</p>
											<p>
												{product.countInStock ? product.countInStock : "-"}
											</p>
											<p>
												{product.discount ? `$${product.discount}.00` : "-"}
											</p>
											<button
												onClick={() =>
													history.push(
														`/vendor/products/edit/${product._id}`
													)
												}
											>
												details
											</button>
										</div>
									)
								})}
							</div>
						</div>
						{createError && <Message color="red-message">{createError}</Message>}
						{user.isVendor && (
							<div className="createProduct-button">
								<button
									className="blue productbutton1"
									onClick={() => dispatch(createProduct())}
								>
									create product
									{createLoading && (
										<div className="cover-1 ">
											<SmallSpin />
										</div>
									)}
								</button>
							</div>
						)}
						{+products.totalPages > 1 && (
							<Pagination
								pages={products.totalPages}
								currentPage={products.currentPage}
							/>
						)}
					</>
				) : (
					user.isVendor && (
						<div className="createProduct-button">
							<button
								className="blue productbutton1 button-relative"
								onClick={() => dispatch(createProduct())}
							>
								create product
								{createLoading && (
									<div className="cover-1 ">
										<SmallSpin />
									</div>
								)}
							</button>
						</div>
					)
				)}
			</div>
		</div>
	)
}

export default ProductList
