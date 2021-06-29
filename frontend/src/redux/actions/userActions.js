import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_FAIL,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	GET_ALL_USERS_REQUEST,
	GET_ALL_USERS_SUCCESS,
	GET_ALL_USERS_FAIL,
	CLEAR_ALL_USERS,
	GET_SINGLE_USER_REQUEST,
	GET_SINGLE_USER_FAIL,
	GET_SINGLE_USER_SUCCESS,
	CLEAR_SINGLE_USER,
	EDIT_SINGLE_USER_REQUEST,
	EDIT_SINGLE_USER_SUCCESS,
	EDIT_SINGLE_USER_FAIL,
	GET_SINGLE_USER_ADMIN_REQUEST,
	GET_SINGLE_USER_ADMIN_SUCCESS,
	GET_SINGLE_USER_ADMIN_FAIL,
	CLEAR_SINGLE_USER_ADMIN,
	DELETE_SINGLE_USER_REQUEST,
	DELETE_SINGLE_USER_SUCCESS,
	DELETE_SINGLE_USER_FAIL,
} from "../constants/userConstants"
import axios from "axios"
import { GET_ALL_PRODUCTS_CLEAR } from "../constants/productConstant"
import {
	CREATE_ORDER_CLEAR,
	GET_ORDER_CLEAR,
	GET_ALL_ORDERS_CLEAR,
} from "../constants/orderConstants"

export const userLogin = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST })

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		}

		const { data } = await axios.post("/api/user/login", { email, password }, config)

		dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

		localStorage.setItem("user", JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const userRegister = (name, email, password, isAdmin = false) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST })

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		}

		const { data } = await axios.post(
			"/api/user/register",
			{ email, password, name, isAdmin },
			config
		)

		dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

		localStorage.setItem("user", JSON.stringify(data))
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		dispatch({
			type: USER_REGISTER_FAIL,
			payload: message,
		})
	}
}

export const userLogout = () => (dispatch) => {
	localStorage.removeItem("user")
	dispatch({ type: USER_LOGOUT })
	dispatch({ type: GET_ALL_PRODUCTS_CLEAR })
	dispatch({ type: CLEAR_ALL_USERS })
	dispatch({ type: CLEAR_SINGLE_USER })
	dispatch({ type: CREATE_ORDER_CLEAR })
	dispatch({ type: GET_ORDER_CLEAR })
	dispatch({ type: GET_ALL_ORDERS_CLEAR })
	dispatch({ type: CLEAR_SINGLE_USER_ADMIN })
}

export const getAllUsers = (currentPage = 1) => async (dispatch, getState) => {
	try {
		dispatch({ type: GET_ALL_USERS_REQUEST })

		const { user } = getState().user

		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		}

		const { data } = await axios.get(`/api/user/all/users?currentPage=${currentPage}`, config)

		dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data })
	} catch (error) {
		const err =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		if (err === "Not authorized, token failed") {
			dispatch(userLogout)
		} else {
			dispatch({ type: GET_ALL_USERS_FAIL, payload: err })
		}
	}
}

export const getSingleUser = () => async (dispatch, getState) => {
	try {
		dispatch({ type: GET_SINGLE_USER_REQUEST })

		const { user } = getState().user
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		}

		const { data } = await axios.get("/api/user/single/user", config)

		dispatch({ type: GET_SINGLE_USER_SUCCESS, payload: data })
	} catch (error) {
		const err =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		if (err === "Not authorized, token failed") {
			dispatch(userLogout())
		} else {
			dispatch({ type: GET_SINGLE_USER_FAIL, payload: err })
		}
	}
}

export const editSingleUser = (fields) => async (dispatch, getState) => {
	try {
		dispatch({ type: EDIT_SINGLE_USER_REQUEST })

		const { user } = getState().user
		const config = {
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${user.token}`,
			},
		}

		const { data } = await axios.put("/api/user/register", fields, config)

		dispatch({ type: EDIT_SINGLE_USER_SUCCESS, payload: data.message })
		dispatch({ type: USER_LOGIN_SUCCESS, payload: { ...data.updatedUser, token: user.token } })

		localStorage.setItem("user", JSON.stringify({ ...data.updatedUser, token: user.token }))
	} catch (error) {
		const err =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		if (err === "Not authorized, token failed") {
			dispatch(userLogout())
		} else {
			dispatch({ type: EDIT_SINGLE_USER_FAIL, payload: err })
		}
	}
}

export const getSingleUserAdmin = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: GET_SINGLE_USER_ADMIN_REQUEST })

		const { user } = getState().user
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		}

		const { data } = await axios.get(`/api/user/admin/user?id=${id}`, config)

		dispatch({ type: GET_SINGLE_USER_ADMIN_SUCCESS, payload: data })
	} catch (error) {
		const err =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		if (err === "Not authorized, token failed") {
			dispatch(userLogout())
		} else {
			dispatch({ type: GET_SINGLE_USER_ADMIN_FAIL, payload: err })
		}
	}
}

export const deleteSingleUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: DELETE_SINGLE_USER_REQUEST })

		const { user } = getState().user
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		}

		await axios.delete(`/api/user/register?id=${id}`, config)

		dispatch({ type: DELETE_SINGLE_USER_SUCCESS })
	} catch (error) {
		const err =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		if (err === "Not authorized, token failed") {
			dispatch(userLogout())
		} else {
			dispatch({ type: DELETE_SINGLE_USER_FAIL, payload: err })
		}
	}
}
