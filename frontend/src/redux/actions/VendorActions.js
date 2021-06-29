import {
	VENDOR_REGISTER_REQUEST,
	VENDOR_REGISTER_SUCCESS,
	VENDOR_REGISTER_FAIL,
} from "../constants/vendorConstant"
import axios from "axios"
import { USER_LOGIN_SUCCESS } from "../constants/userConstants"

export const vendorRegister = (contactInfo) => async (dispatch, getState) => {
	try {
		dispatch({ type: VENDOR_REGISTER_REQUEST })

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		}

		const { vendorDetails, companyDetails, socialMedia } = getState().vendor

		const { data } = await axios.post(
			"/api/vendor/register",
			{ vendorDetails, companyDetails, socialMedia, contactInfo },
			config
		)

		dispatch({ type: VENDOR_REGISTER_SUCCESS, payload: data })
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

		localStorage.setItem("user", JSON.stringify(data))
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		dispatch({
			type: VENDOR_REGISTER_FAIL,
			payload: message,
		})
	}
}
