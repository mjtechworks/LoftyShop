import axios from "axios"
import {
	HOME_FEATURED_PRODUCT_REQUEST,
	HOME_FEATURED_PRODUCT_SUCCESS,
	HOME_FEATURED_PRODUCT_FAIL,
	OPTIONS_REQUEST,
	OPTIONS_SUCCESS,
	OPTIONS_FAIL,
	SHOP_PRODUCT_FAIL,
	SHOP_PRODUCT_REQUEST,
	SHOP_PRODUCT_SUCCESS,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	RELATED_PRODUCTS_REQUEST,
	RELATED_PRODUCTS_SUCCESS,
	RELATED_PRODUCTS_FAIL,
	GET_ALL_PRODUCTS_REQUEST,
	GET_ALL_PRODUCTS_SUCCESS,
	GET_ALL_PRODUCTS_FAIL,
	CREATE_COMMENT_REQUEST,
	CREATE_COMMENT_FAIL,
	CREATE_COMMENT_SUCCESS,
	CREATE_PRODUCT_REQUEST,
	CREATE_PRODUCT_SUCCESS,
	CREATE_PRODUCT_FAIL,
	GET_VENDOR_PRODUCT_REQUEST,
	GET_VENDOR_PRODUCT_SUCCESS,
	GET_VENDOR_PRODUCT_CLEAR,
	UPDATE_PRODUCT_REQUEST,
	UPDATE_PRODUCT_SUCCESS,
	UPDATE_PRODUCT_FAIL,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAIL,
	SEARCH_PRODUCT_REQUEST,
	SEARCH_PRODUCT_SUCCESS,
	SEARCH_PRODUCT_FAIL,
} from "../constants/productConstant"
import { userLogout } from "./userActions"

export const homeFeaturedItems = () => async (dispatch) => {
	try {
		dispatch({ type: HOME_FEATURED_PRODUCT_REQUEST })

		const { data } = await axios.get("http://localhost:5000/api/product/featured/home")

		dispatch({ type: HOME_FEATURED_PRODUCT_SUCCESS, payload: data })
	} catch (err) {
		dispatch({
			type: HOME_FEATURED_PRODUCT_FAIL,
			payload:
				err.response.data.message && err.response ? err.response.data.message : err.message,
		})
	}
}

export const getOptions = () => async (dispatch) => {
	try {
		dispatch({ type: OPTIONS_REQUEST })

		const { data } = await axios.get("http://localhost:5000/api/product/options")

		dispatch({ type: OPTIONS_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: OPTIONS_FAIL,
			payload:
				error.response.data.message && error.response
					? error.response.data.message
					: error.message,
		})
	}
}

export const getProducts = (something) => async (dispatch) => {
	try {
		dispatch({ type: SHOP_PRODUCT_REQUEST })

		const { data } = await axios.get(`http://localhost:5000/api/product/shop?${something}`)

		dispatch({ type: SHOP_PRODUCT_SUCCESS, payload: data })
	} catch (error) {
		console.log()
		dispatch({
			type: SHOP_PRODUCT_FAIL,
			payload:
				error.response.data.message && error.response
					? error.response.data.message
					: error.message,
		})
	}
}

export const searchProducts = (word) => async (dispatch) => {
	try {
		dispatch({ type: SEARCH_PRODUCT_REQUEST })

		const { data } = await axios.get(`http://localhost:5000/api/product/search?word=${word}`)

		dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: data })
	} catch (error) {
		console.log()
		dispatch({
			type: SEARCH_PRODUCT_FAIL,
			payload:
				error.response.data.message && error.response
					? error.response.data.message
					: error.message,
		})
	}
}

export const getProductDetails = (id) => async (dispatch) => {
	dispatch({ type: PRODUCT_DETAILS_REQUEST })
	try {
		const {
			data: { product },
		} = await axios.get(`http://localhost:5000/api/product/${id}`)

		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: product })
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const getRelatedProducts = (category, gender, id) => async (dispatch) => {
	try {
		dispatch({ type: RELATED_PRODUCTS_REQUEST })

		const { data } = await axios.get(
			`http://localhost:5000/api/product/related/products?category=${category}&gender=${gender}&id=${id}`
		)

		dispatch({ type: RELATED_PRODUCTS_SUCCESS, payload: data })
	} catch (error) {
		const err =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		dispatch({ type: RELATED_PRODUCTS_FAIL, payload: err })
	}
}

export const getAllProducts = (currentPage = 1) => async (dispatch, getState) => {
	try {
		dispatch({ type: GET_ALL_PRODUCTS_REQUEST })

		const { user } = getState().user

		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		}

		const { data } = await axios.get(
			`http://localhost:5000/api/product/all/products?currentPage=${currentPage}`,
			config
		)

		dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data })
	} catch (error) {
		const err =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		console.log(err)
		if (err === "Not authorized, token failed") {
			dispatch(userLogout())
		}
		dispatch({ type: GET_ALL_PRODUCTS_FAIL, payload: err })
	}
}

export const getVendorAllProducts = (currentPage = 1) => async (dispatch, getState) => {
	try {
		dispatch({ type: GET_ALL_PRODUCTS_REQUEST })

		const { user } = getState().user

		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		}

		const { data } = await axios.get(
			`http://localhost:5000/api/product/all/vendor/products?currentPage=${currentPage}`,
			config
		)

		dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data })
	} catch (error) {
		const err =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		console.log(err)
		if (err === "Not authorized, token failed") {
			dispatch(userLogout())
		}
		dispatch({ type: GET_ALL_PRODUCTS_FAIL, payload: err })
	}
}

export const createComment = (id, rating, comment) => async (dispatch, getState) => {
	try {
		dispatch({ type: CREATE_COMMENT_REQUEST })
		const { user } = getState().user

		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		}

		const review = { rating, comment }

		await axios.put(`http://localhost:5000/api/product/${id}`, review, config)
		dispatch({ type: CREATE_COMMENT_SUCCESS })
	} catch (error) {
		const err =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		if (err === "Not authorized, token failed") {
			dispatch(userLogout())
		}
		console.log(err)
		dispatch({ type: CREATE_COMMENT_FAIL, payload: err })
	}
}

export const createProduct = () => async (dispatch, getState) => {
	try {
		dispatch({ type: CREATE_PRODUCT_REQUEST })
		const { user } = getState().user

		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		}

		const { data } = await axios.post(`http://localhost:5000/api/product/`, {}, config)

		dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data })
		console.log(data)
	} catch (error) {
		const err =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		if (err === "Not authorized, token failed") {
			dispatch(userLogout())
		}
		console.log(err)
		dispatch({ type: CREATE_PRODUCT_FAIL, payload: err })
	}
}

export const getVendorProductDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: GET_VENDOR_PRODUCT_REQUEST })

		const { user } = getState().user

		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		}

		const { data } = await axios.get(`http://localhost:5000/api/product/?id=${id}`, config)
		console.log(data)

		dispatch({ type: GET_VENDOR_PRODUCT_SUCCESS, payload: data })
	} catch (error) {
		const err =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		console.log(err)

		if (err === "Not authorized, token failed") {
			dispatch(userLogout())
		}
		dispatch({
			type: GET_VENDOR_PRODUCT_CLEAR,
			payload: err,
		})
	}
}

export const updateProductDetails = (details, id) => async (dispatch, getState) => {
	try {
		dispatch({ type: UPDATE_PRODUCT_REQUEST })

		const { user } = getState().user

		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
				"Content-Type": "application/json",
			},
		}

		const { data } = await axios.post(
			`http://localhost:5000/api/product/${id}`,
			details,
			config
		)
		console.log(data)

		dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data })
	} catch (error) {
		const err =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		console.log(err)

		if (err === "Not authorized, token failed") {
			dispatch(userLogout())
		}
		dispatch({
			type: UPDATE_PRODUCT_FAIL,
			payload: err,
		})
	}
}

export const deleteProductDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: DELETE_PRODUCT_REQUEST })

		const { user } = getState().user

		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		}

		const { data } = await axios.delete(`http://localhost:5000/api/product/${id}`, config)
		console.log(data)

		dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data })
	} catch (error) {
		const err =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		console.log(err)

		if (err === "Not authorized, token failed") {
			dispatch(userLogout())
		}
		dispatch({
			type: DELETE_PRODUCT_FAIL,
			payload: err,
		})
	}
}
