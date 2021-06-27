import {
	SAVE_SHIPPING_DETAILS,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAIL,
	CREATE_ORDER_CLEAR,
	GET_ORDER_REQUEST,
	GET_ORDER_SUCCESS,
	GET_ORDER_FAIL,
	GET_ORDER_CLEAR,
	GET_ALL_ORDERS_REQUEST,
	GET_ALL_ORDERS_SUCCESS,
	GET_ALL_ORDERS_FAIL,
	GET_ALL_ORDERS_CLEAR,
	MARK_PAID_REQUEST,
	MARK_PAID_SUCCESS,
	MARK_PAID_FAIL,
	MARK_PAID_CLEAR,
	MARK_DELIVERED_REQUEST,
	MARK_DELIVERED_SUCCESS,
	MARK_DELIVERED_FAIL,
	MARK_DELIVERED_CLEAR,
} from "../constants/orderConstants"

export const shippingDetailsReducer = (state = {}, action) => {
	switch (action.type) {
		case SAVE_SHIPPING_DETAILS:
			return {
				shipping: action.payload,
			}

		default:
			return state
	}
}

export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_ORDER_REQUEST:
			return { loading: true }

		case CREATE_ORDER_SUCCESS:
			return { loading: false, order: action.payload }

		case CREATE_ORDER_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case CREATE_ORDER_CLEAR:
			return {}

		default:
			return state
	}
}

export const orderDetailsReducer = (state = { loading: true }, action) => {
	switch (action.type) {
		case GET_ORDER_REQUEST:
			return { loading: true }

		case GET_ORDER_SUCCESS:
			return { loading: false, order: action.payload }

		case GET_ORDER_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case GET_ORDER_CLEAR:
			return { loading: true }

		default:
			return state
	}
}

export const getOrderListReducer = (state = { loading: true }, action) => {
	switch (action.type) {
		case GET_ALL_ORDERS_REQUEST:
			return { loading: true }

		case GET_ALL_ORDERS_SUCCESS:
			return {
				loading: false,
				orders: action.payload.order,
				currentPage: action.payload.currentPage,
				totalPages: action.payload.totalPages,
			}

		case GET_ALL_ORDERS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case GET_ALL_ORDERS_CLEAR:
			return { loading: true }

		default:
			return state
	}
}

export const markAsPaidReducer = (state = {}, action) => {
	switch (action.type) {
		case MARK_PAID_REQUEST:
			return { loading: true }

		case MARK_PAID_SUCCESS:
			return { loading: false, order: action.payload }

		case MARK_PAID_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case MARK_PAID_CLEAR:
			return {}

		default:
			return state
	}
}

export const markAsDeliveredReducer = (state = {}, action) => {
	switch (action.type) {
		case MARK_DELIVERED_REQUEST:
			return { loading: true }

		case MARK_DELIVERED_SUCCESS:
			return { loading: false, order: action.payload }

		case MARK_DELIVERED_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case MARK_DELIVERED_CLEAR:
			return {}

		default:
			return state
	}
}
