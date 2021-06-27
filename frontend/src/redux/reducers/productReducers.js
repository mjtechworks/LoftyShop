import {
	HOME_FEATURED_PRODUCT_REQUEST,
	HOME_FEATURED_PRODUCT_SUCCESS,
	HOME_FEATURED_PRODUCT_FAIL,
	OPTIONS_REQUEST,
	OPTIONS_SUCCESS,
	OPTIONS_FAIL,
	SHOP_PRODUCT_REQUEST,
	SHOP_PRODUCT_SUCCESS,
	SHOP_PRODUCT_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	RELATED_PRODUCTS_REQUEST,
	RELATED_PRODUCTS_SUCCESS,
	RELATED_PRODUCTS_FAIL,
	GET_ALL_PRODUCTS_REQUEST,
	GET_ALL_PRODUCTS_SUCCESS,
	GET_ALL_PRODUCTS_FAIL,
	GET_ALL_PRODUCTS_CLEAR,
	CREATE_COMMENT_REQUEST,
	CREATE_COMMENT_SUCCESS,
	CREATE_COMMENT_FAIL,
	CREATE_COMMENT_CLEAR,
	CREATE_PRODUCT_REQUEST,
	CREATE_PRODUCT_SUCCESS,
	CREATE_PRODUCT_FAIL,
	CREATE_PRODUCT_CLEAR,
	GET_VENDOR_PRODUCT_REQUEST,
	GET_VENDOR_PRODUCT_SUCCESS,
	GET_VENDOR_PRODUCT_FAIL,
	GET_VENDOR_PRODUCT_CLEAR,
	UPDATE_PRODUCT_REQUEST,
	UPDATE_PRODUCT_SUCCESS,
	UPDATE_PRODUCT_FAIL,
	UPDATE_PRODUCT_CLEAR,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAIL,
	DELETE_PRODUCT_CLEAR,
	SEARCH_PRODUCT_REQUEST,
	SEARCH_PRODUCT_SUCCESS,
	SEARCH_PRODUCT_FAIL,
	SEARCH_PRODUCT_CLEAR,
} from "../constants/productConstant"

export const homeFeaturedReducer = (state = { loading: true }, action) => {
	switch (action.type) {
		case HOME_FEATURED_PRODUCT_REQUEST:
			return { loading: true }

		case HOME_FEATURED_PRODUCT_SUCCESS:
			return { products: action.payload, loading: false }

		case HOME_FEATURED_PRODUCT_FAIL:
			return { error: action.payload, loading: false }

		default:
			return state
	}
}

export const optionReducer = (state = { data: [] }, action) => {
	switch (action.type) {
		case OPTIONS_REQUEST:
			return { data: [], loading: true }
		case OPTIONS_SUCCESS:
			return { data: action.payload, loading: false }
		case OPTIONS_FAIL:
			return { error: action.payload, loading: false }
		default:
			return state
	}
}

export const shopReducer = (state = { loading: true }, action) => {
	switch (action.type) {
		case SHOP_PRODUCT_REQUEST:
			return { loading: true, product: [] }
		case SHOP_PRODUCT_SUCCESS:
			return {
				loading: false,
				product: action.payload.shopProducts,
				currentPage: action.payload.currentPage,
				pages: action.payload.pages,
			}
		case SHOP_PRODUCT_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const searchReducer = (state = { search: [] }, action) => {
	switch (action.type) {
		case SEARCH_PRODUCT_REQUEST:
			return { loading: true }
		case SEARCH_PRODUCT_SUCCESS:
			return {
				loading: false,
				search: action.payload,
			}
		case SEARCH_PRODUCT_FAIL:
			return { loading: false, error: action.payload }
		case SEARCH_PRODUCT_CLEAR:
			return { search: [] }
		default:
			return state
	}
}

export const productDetailsReducer = (state = { loading: true }, action) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return { ...state, loading: true }
		case PRODUCT_DETAILS_SUCCESS:
			return {
				loading: false,
				product: action.payload,
			}
		case PRODUCT_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}

export const relatedProductsReducer = (state = { loading: true }, action) => {
	switch (action.type) {
		case RELATED_PRODUCTS_REQUEST:
			return {
				loading: true,
			}
		case RELATED_PRODUCTS_SUCCESS:
			return {
				loading: false,
				products: action.payload,
			}
		case RELATED_PRODUCTS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}

export const getAllProductsReducer = (state = { loading: true }, action) => {
	switch (action.type) {
		case GET_ALL_PRODUCTS_REQUEST:
			return {
				loading: true,
			}
		case GET_ALL_PRODUCTS_SUCCESS:
			return {
				loading: false,
				products: action.payload,
			}
		case GET_ALL_PRODUCTS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case GET_ALL_PRODUCTS_CLEAR:
			return { loading: true }

		default:
			return state
	}
}

export const createCommentReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_COMMENT_REQUEST:
			return {
				loading: true,
			}
		case CREATE_COMMENT_SUCCESS:
			return {
				loading: false,
				review: true,
			}
		case CREATE_COMMENT_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case CREATE_COMMENT_CLEAR:
			return {}

		default:
			return state
	}
}

export const createProductReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_PRODUCT_REQUEST:
			return {
				loading: true,
			}
		case CREATE_PRODUCT_SUCCESS:
			return {
				loading: false,
				product: action.payload,
			}
		case CREATE_PRODUCT_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case CREATE_PRODUCT_CLEAR:
			return {}

		default:
			return state
	}
}

export const productVendorDetailsReducer = (state = { loading: true }, action) => {
	switch (action.type) {
		case GET_VENDOR_PRODUCT_REQUEST:
			return { ...state, loading: true }
		case GET_VENDOR_PRODUCT_SUCCESS:
			return {
				loading: false,
				product: action.payload,
			}
		case GET_VENDOR_PRODUCT_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		case GET_VENDOR_PRODUCT_CLEAR:
			return { loading: true }

		default:
			return state
	}
}

export const productUpdateDetailsReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_PRODUCT_REQUEST:
			return { ...state, loading: true }
		case UPDATE_PRODUCT_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			}
		case UPDATE_PRODUCT_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		case UPDATE_PRODUCT_CLEAR:
			return {}

		default:
			return state
	}
}

export const productDeleteDetailsReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_PRODUCT_REQUEST:
			return { ...state, loading: true }
		case DELETE_PRODUCT_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			}
		case DELETE_PRODUCT_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		case DELETE_PRODUCT_CLEAR:
			return {}

		default:
			return state
	}
}
