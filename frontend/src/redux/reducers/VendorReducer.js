import {
	VENDOR_SAVE,
	VENDOR_SAVE_COMPANY_DETAILS,
	VENDOR_SAVE_SOCIAL_MEDIA,
	VENDOR_REGISTER_REQUEST,
	VENDOR_REGISTER_FAIL,
	VENDOR_REGISTER_SUCCESS,
} from "../constants/vendorConstant"

export const vendorReducer = (
	state = { vendorDetails: {}, companyDetails: {}, socialMedia: {} },
	action
) => {
	switch (action.type) {
		case VENDOR_SAVE:
			return {
				...state,
				vendorDetails: action.payload,
			}
		case VENDOR_SAVE_COMPANY_DETAILS:
			return {
				...state,
				companyDetails: action.payload,
			}
		case VENDOR_SAVE_SOCIAL_MEDIA:
			return {
				...state,
				socialMedia: action.payload,
			}

		case VENDOR_REGISTER_REQUEST:
			return {
				...state,
				loading: true,
			}

		case VENDOR_REGISTER_FAIL:
			return {
				...state,
				error: action.payload,
				loading: false,
			}
		case VENDOR_REGISTER_SUCCESS:
			return { vendorDetails: {}, companyDetails: {}, socialMedia: {} }

		default:
			return state
	}
}
