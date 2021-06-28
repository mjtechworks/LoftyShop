import axios from "axios"
import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/CartConstant"

export const addToCart = (qty, id) => async (dispatch, getState) => {
	const {
		data: { product },
	} = await axios.get(`/api/product/cart/${id}`)
	dispatch({
		type: ADD_TO_CART,
		payload: {
			id: product._id,
			name: product.name,
			image: product.image,
			price: product.price,
			discount: product.discount,
			countInStock: product.countInStock,
			qty,
		},
	})
	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
	dispatch({
		type: REMOVE_FROM_CART,
		payload: id,
	})

	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}
