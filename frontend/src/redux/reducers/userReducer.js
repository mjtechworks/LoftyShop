import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	GET_ALL_USERS_REQUEST,
	GET_ALL_USERS_SUCCESS,
	GET_ALL_USERS_FAIL,
	CLEAR_ALL_USERS,
	GET_SINGLE_USER_REQUEST,
	GET_SINGLE_USER_SUCCESS,
	GET_SINGLE_USER_FAIL,
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
	EDIT_SINGLE_USER_CLEAR,
} from "../constants/userConstants"

export const loginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return {
				loading: true,
			}
		case USER_LOGIN_SUCCESS:
			return {
				loading: false,
				user: action.payload,
			}
		case USER_LOGIN_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case USER_LOGOUT:
			return {}

		default:
			return state
	}
}

export const registerReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return {
				loading: true,
			}
		case USER_REGISTER_SUCCESS:
			return {
				loading: false,
				user: action.payload,
			}
		case USER_REGISTER_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case USER_LOGOUT:
			return {}

		default:
			return state
	}
}

export const getAllUsersReducer = (state = { loading: true }, action) => {
	switch (action.type) {
		case GET_ALL_USERS_REQUEST:
			return {
				loading: true,
			}
		case GET_ALL_USERS_SUCCESS:
			return {
				loading: false,
				users: action.payload,
			}
		case GET_ALL_USERS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case CLEAR_ALL_USERS:
			return { loading: true }

		default:
			return state
	}
}

export const getSingleUserReducer = (state = { loading: true }, action) => {
	switch (action.type) {
		case GET_SINGLE_USER_REQUEST:
			return { loading: true }
		case GET_SINGLE_USER_SUCCESS:
			return { loading: false, user: action.payload }
		case GET_SINGLE_USER_FAIL:
			return { loading: false, error: action.payload }
		case CLEAR_SINGLE_USER:
			return { loading: true }

		default:
			return state
	}
}

export const editSingleUserReducer = (state = {}, action) => {
	switch (action.type) {
		case EDIT_SINGLE_USER_REQUEST:
			return { loading: true }
		case EDIT_SINGLE_USER_SUCCESS:
			return { loading: false, success: action.payload }
		case EDIT_SINGLE_USER_FAIL:
			return { loading: false, error: action.payload }
		case EDIT_SINGLE_USER_CLEAR:
			return {}

		default:
			return state
	}
}

export const getSingleUserAdminReducer = (state = { loading: true }, action) => {
	switch (action.type) {
		case GET_SINGLE_USER_ADMIN_REQUEST:
			return { loading: true }
		case GET_SINGLE_USER_ADMIN_SUCCESS:
			return { loading: false, user: action.payload }
		case GET_SINGLE_USER_ADMIN_FAIL:
			return { loading: false, error: action.payload }
		case CLEAR_SINGLE_USER_ADMIN:
			return { loading: true }

		default:
			return state
	}
}

export const deleteUserReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_SINGLE_USER_REQUEST:
			return { loading: true }
		case DELETE_SINGLE_USER_SUCCESS:
			return { loading: false, result: "success" }
		case DELETE_SINGLE_USER_FAIL:
			return { loading: false, error: action.payload }

		default:
			return state
	}
}
