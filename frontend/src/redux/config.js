import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import {
	homeFeaturedReducer,
	optionReducer,
	shopReducer,
	productDetailsReducer,
	relatedProductsReducer,
	getAllProductsReducer,
	createCommentReducer,
	createProductReducer,
	productVendorDetailsReducer,
	productUpdateDetailsReducer,
	productDeleteDetailsReducer,
	searchReducer,
} from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducer"
import {
	loginReducer,
	registerReducer,
	getAllUsersReducer,
	getSingleUserReducer,
	editSingleUserReducer,
	getSingleUserAdminReducer,
	deleteUserReducer,
} from "./reducers/userReducer"
import { vendorReducer } from "./reducers/VendorReducer"
import {
	shippingDetailsReducer,
	orderCreateReducer,
	orderDetailsReducer,
	getOrderListReducer,
	markAsPaidReducer,
	markAsDeliveredReducer,
} from "./reducers/orderReducer"

const reducer = combineReducers({
	homeFeatured: homeFeaturedReducer,
	option: optionReducer,
	shopList: shopReducer,
	search: searchReducer,
	cart: cartReducer,
	user: loginReducer,
	register: registerReducer,
	vendor: vendorReducer,
	productDetails: productDetailsReducer,
	relatedProduct: relatedProductsReducer,
	getAllProductsList: getAllProductsReducer,
	getAllUsersList: getAllUsersReducer,
	getSingleUser: getSingleUserReducer,
	getSingleUserAdmin: getSingleUserAdminReducer,
	editSingleUser: editSingleUserReducer,
	deleteUser: deleteUserReducer,
	shippingDetails: shippingDetailsReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	commentCreate: createCommentReducer,
	getOrderList: getOrderListReducer,
	createProduct: createProductReducer,
	productVendorDetails: productVendorDetailsReducer,
	productUpdateDetails: productUpdateDetailsReducer,
	productDeleteDetails: productDeleteDetailsReducer,
	markAsPaid: markAsPaidReducer,
	markAsDelivered: markAsDeliveredReducer,
})

const initialCart = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: []

const initialUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
const shippingAddress = localStorage.getItem("shippingAddress")
	? JSON.parse(localStorage.getItem("shippingAddress"))
	: null

const initialState = {
	cart: {
		cartItems: initialCart,
	},
	user: {
		user: initialUser,
	},
	shippingDetails: {
		shipping: shippingAddress,
	},
}

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store
