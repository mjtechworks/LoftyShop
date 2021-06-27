import React from "react"
import "./App.css"
import "./components/Utils/animations.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from "./components/Navigation/Header"
import Footer from "./components/Navigation/Footer"
import { useState } from "react"
import Sidebar from "./components/Navigation/Sidebar"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CompanyDetails from "./pages/CompanyDetails"
import SocialMedia from "./pages/SocialMedia"
import ContactInfo from "./pages/ContactInfo"
import ProductDetails from "./pages/ProductDetails"
import Checkout from "./pages/Checkout"
import ProductList from "./pages/ProductList"
import UserList from "./pages/UserList"
import Profile from "./pages/Profile"
import OrderDetails from "./pages/OrderDetail"
import OrderList from "./pages/OrderList"
import UserDetails from "./pages/UserDetails"
import ProductEdit from "./pages/ProductEdit"

function App() {
	const [sidebarHandler, toggleSidebar] = useState(false)

	const toggle = () => {
		toggleSidebar(!sidebarHandler)
	}

	return (
		<Router>
			<div className="app">
				<Header toggle={toggle} sidebarHandle={sidebarHandler} />
				<Sidebar toggle={toggle} sidebarHandle={sidebarHandler} />
				<div className="body">
					<Switch>
						<Route path="/shop" exact component={Shop} />
						<Route path="/women" exact component={Shop} />
						<Route path="/men" exact component={Shop} />
						<Route path="/product/:gender/:id" exact component={ProductDetails} />
						<Route path="/contact" exact component={Contact} />
						<Route path="/cart" exact component={Cart} />
						<Route path="/checkout" exact component={Checkout} />
						<Route path="/order/:id" exact component={OrderDetails} />
						<Route path="/orders" exact component={OrderList} />
						<Route path="/about" exact component={About} />
						<Route path="/login" exact component={Login} />
						<Route path="/register" exact component={Register} />
						<Route path="/vendor/products" exact component={ProductList} />
						<Route path="/vendor/products/edit/:id" exact component={ProductEdit} />
						<Route path="/profile" exact component={Profile} />
						<Route path="/admin/users" exact component={UserList} />
						<Route path="/admin/users/:id" exact component={UserDetails} />
						<Route path="/register/vendor/company_details" component={CompanyDetails} />
						<Route path="/register/vendor/contact_info" component={ContactInfo} />
						<Route path="/register/vendor/social_media" component={SocialMedia} />
						<Route path="/" exact component={Home} />
					</Switch>
				</div>

				<Footer />
			</div>
		</Router>
	)
}

export default App
