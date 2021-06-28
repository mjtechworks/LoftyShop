import {
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAIL,
	SAVE_SHIPPING_DETAILS,
	GET_ORDER_REQUEST,
	GET_ORDER_SUCCESS,
	GET_ORDER_FAIL,
	GET_ALL_ORDERS_REQUEST,
	GET_ALL_ORDERS_SUCCESS,
	MARK_PAID_REQUEST,
	MARK_PAID_SUCCESS,
	MARK_PAID_FAIL,
	MARK_DELIVERED_REQUEST,
	MARK_DELIVERED_FAIL,
} from "../constants/orderConstants"
import axios from "axios"
import { userLogout } from "./userActions"
import { CLEAR_CART } from "../constants/CartConstant"
import { GET_ALL_PRODUCTS_FAIL } from "../constants/productConstant"

export const saveShippingDetails = (details) => (dispatch) => {
	dispatch({ type: SAVE_SHIPPING_DETAILS, payload: details })
	localStorage.setItem("shippingAddress", JSON.stringify(details))
}

export const createOrder = (details) => async (dispatch, getState) => {
	try {
		dispatch({ type: CREATE_ORDER_REQUEST })

		const { user } = getState().user

		const config = {
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${user.token}`,
			},
		}

		const { data } = await axios.post("/api/order/save/order", details, config)

		dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })
		localStorage.removeItem("cartItems")
		dispatch({ type: CLEAR_CART })
	} catch (error) {
		const err =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		console.log(err)

		if (err === "Not authorized, token failed") {
			dispatch(userLogout())
		}
		dispatch({ type: CREATE_ORDER_FAIL, payload: err })
	}
}

export const getOrder = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: GET_ORDER_REQUEST })

		const { user } = getState().user
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		}

		const { data } = await axios.get(`/api/order/${id}`, config)

		dispatch({ type: GET_ORDER_SUCCESS, payload: data })
		console.log(data)
	} catch (error) {
		const err =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		console.log(err)

		if (err === "Not authorized, token failed") {
			dispatch(userLogout())
		} else {
			dispatch({ type: GET_ORDER_FAIL, payload: err })
		}
	}
}

export const getOrders = (currentPage = 1) => async (dispatch, getState) => {
	try {
		dispatch({ type: GET_ALL_ORDERS_REQUEST })

		const { user } = getState().user
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		}

		const { data } = await axios.get(`/api/order/all/orders?currentPage=${currentPage}`, config)

		dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: data })
		console.log(data)
	} catch (error) {
		const err =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		console.log(err)

		if (err === "Not authorized, token failed") {
			dispatch(userLogout())
		} else {
			dispatch({ type: GET_ALL_PRODUCTS_FAIL, payload: err })
		}
	}
}

export const getOrdersAdmin = (currentPage = 1) => async (dispatch, getState) => {
	try {
		dispatch({ type: GET_ALL_ORDERS_REQUEST })

		const { user } = getState().user
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		}

		const { data } = await axios.get(
			`/api/order/all/admin/orders?currentPage=${currentPage}`,
			config
		)

		dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: data })
		console.log(data)
	} catch (error) {
		const err =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		console.log(err)

		if (err === "Not authorized, token failed") {
			dispatch(userLogout())
		} else {
			dispatch({ type: GET_ALL_PRODUCTS_FAIL, payload: err })
		}
	}
}

export const markAsPaid = (id, details) => async (dispatch, getState) => {
	try {
		dispatch({ type: MARK_PAID_REQUEST })

		const { user } = getState().user
		const config = {
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${user.token}`,
			},
		}

		console.log(id)

		const { data } = await axios.post(`/api/order/${id}`, details, config)

		dispatch({ type: MARK_PAID_SUCCESS, payload: data })
		dispatch({ type: GET_ORDER_SUCCESS, payload: data })
		console.log(data)
	} catch (error) {
		const err =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		console.log(err)

		if (err === "Not authorized, token failed") {
			dispatch(userLogout())
		} else {
			dispatch({ type: MARK_PAID_FAIL, payload: err })
		}
	}
}

export const markAsDelivered = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: MARK_DELIVERED_REQUEST })

		const { user } = getState().user
		const config = {
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${user.token}`,
			},
		}

		console.log(id)

		const { data } = await axios.put(`/api/order/${id}`, {}, config)

		dispatch({ type: MARK_PAID_SUCCESS, payload: data })
		dispatch({ type: GET_ORDER_SUCCESS, payload: data })
		console.log(data)
	} catch (error) {
		const err =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		console.log(err)

		if (err === "Not authorized, token failed") {
			dispatch(userLogout())
		} else {
			dispatch({ type: MARK_DELIVERED_FAIL, payload: err })
		}
	}
}
