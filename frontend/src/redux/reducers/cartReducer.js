import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../constants/CartConstant"

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			const product = action.payload
			const itemInCart = state.cartItems.find((x) => x.id === product.id)
			if (itemInCart) {
				return {
					...state,
					cartItems: state.cartItems.map((x) => (x.id === itemInCart.id ? product : x)),
				}
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, product],
				}
			}
		case REMOVE_FROM_CART:
			return {
				...state,
				cartItems: state.cartItems.filter((x) => x.id !== action.payload),
			}
		case CLEAR_CART:
			return { cartItems: [] }
		default:
			return state
	}
}
