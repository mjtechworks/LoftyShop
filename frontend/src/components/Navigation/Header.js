import React, { useState, useEffect } from "react"
import "./header.css"
import { NavLink, useHistory } from "react-router-dom"
import SearchIcon from "../../assets/svg/SearchIcon"
import SidebarButton from "./SideBarButton"
import ShoppinCart from "../../assets/svg/ShoppinCart"
import { useSelector, useDispatch } from "react-redux"
import { userLogout } from "../../redux/actions/userActions"
import { searchProducts } from "../../redux/actions/productActions"
import SmallSpin from "../Utils/SmallSpin"
import { SEARCH_PRODUCT_CLEAR } from "../../redux/constants/productConstant"

const Header = ({ toggle, sidebarHandle }) => {
	const [loginHandler, toggleLogin] = useState(false)
	const [searchInput, searchInputChange] = useState("")
	const [focused, focusedChange] = useState(false)

	const loginToggle = () => {
		toggleLogin(focused ? false : !loginHandler)
		focusedChange(false)
	}

	const open = () => {
		toggleLogin(false)
		focusedChange(true)
	}

	const scroll = () => {
		if (window.scrollY > 100) {
			document.getElementById("navbar").classList.add("fixed")
		} else {
			document.getElementById("navbar").classList.remove("fixed")
		}
	}

	const history = useHistory()

	useEffect(() => {
		window.addEventListener("scroll", scroll)
		return () => {
			window.removeEventListener("scroll", scroll)
		}
	}, [])

	const cart = useSelector((state) => state.cart.cartItems)
	const { loading, search, error } = useSelector((state) => state.search)
	const user = useSelector((state) => state.user)
	const { user: userInfo } = user
	const dispatch = useDispatch()

	const searchItem = (e) => {
		let value = e.target.value
		searchInputChange(value)
		if (value.length > 2) {
			dispatch(searchProducts(value))
		} else {
			dispatch({ type: SEARCH_PRODUCT_CLEAR })
		}
	}

	// console.log(userInfo.isVendor)
	// console.log(userInfo)

	const goTo = (id, gender) => {
		searchInputChange("")
		focusedChange(false)
		dispatch({ type: SEARCH_PRODUCT_CLEAR })
		history.push(`/product/${gender}/${id}`)
	}

	return (
		<>
			<div className="navbar-container" id="navbar">
				<div className="navbar">
					{(loginHandler || focused) && (
						<div className="header-modal" onClick={loginToggle}></div>
					)}
					<div className="top-nav">
						<img src="/images/Untitled-1.png" alt="" className="logo-image" />
						<div className="search">
							<input
								type="text"
								name="search-bar"
								className="search-bar"
								placeholder="Search Products"
								onChange={searchItem}
								value={searchInput}
								onFocus={open}
							/>
							<div className="search-icon">
								<div className="search-icon-self">
									<SearchIcon />
								</div>
							</div>
							{searchInput.length > 0 && focused ? (
								loading ? (
									<SmallSpin />
								) : error ? (
									console.error(error)
								) : (
									<div className="search-items">
										{" "}
										{search.length > 0
											? search.map((item) => {
													return (
														<p
															key={item._id}
															onClick={() =>
																goTo(item._id, item.gender)
															}
														>
															{item.name}
														</p>
													)
											  })
											: null}
									</div>
								)
							) : null}
						</div>
					</div>
					<div className="bottom-nav">
						<SidebarButton toggle={toggle} sidebarHandle={sidebarHandle} />
						<ul className="nav-links">
							<li>
								<NavLink
									exact
									activeClassName="active-link"
									to="/"
									className="links"
								>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									exact
									activeClassName="active-link"
									to="/shop"
									className="links"
								>
									shop
								</NavLink>
							</li>
							<li>
								<NavLink
									exact
									activeClassName="active-link"
									to="/women"
									className="links"
								>
									women
								</NavLink>
							</li>
							<li>
								<NavLink
									exact
									activeClassName="active-link"
									to="/men"
									className="links"
								>
									men
								</NavLink>
							</li>
							<li>
								<NavLink
									exact
									activeClassName="active-link"
									to="/about"
									className="links"
								>
									about
								</NavLink>
							</li>
							<li>
								<NavLink
									exact
									activeClassName="active-link"
									to="/contact"
									className="links"
								>
									contact
								</NavLink>
							</li>
						</ul>
						<div className="icon-links">
							<NavLink to="/cart">
								<div className="icon">
									<div className="icon-icon">
										<ShoppinCart color="nav-icon shopping-cart-2" />
									</div>
									{cart && cart.length > 0 && (
										<div className="icon-length">{cart.length}</div>
									)}
								</div>
							</NavLink>
							<div className="login" onClick={loginToggle}>
								<p className="login-nav">
									{userInfo ? userInfo.name : "Login /Register"}
								</p>
								<div className={`login-links ${loginHandler && "display-login"}`}>
									{userInfo ? (
										<>
											{userInfo.isAdmin && (
												<NavLink
													to="/orders"
													activeClassName="active-link"
													className="login-login"
												>
													Orders
												</NavLink>
											)}
											{(userInfo.isAdmin || userInfo.isVendor) && (
												<NavLink
													to="/vendor/products"
													activeClassName="active-link"
													className="login-login"
												>
													Products
												</NavLink>
											)}
											{userInfo.isAdmin && (
												<NavLink
													to="/admin/users"
													activeClassName="active-link"
													className="login-login"
												>
													Users
												</NavLink>
											)}
											<NavLink
												to="/profile"
												activeClassName="active-link"
												className="login-login"
											>
												Profile
											</NavLink>
											<div
												className="login-login"
												onClick={() => dispatch(userLogout())}
											>
												Logout
											</div>
										</>
									) : (
										<>
											<NavLink
												to="/login"
												activeClassName="active-link"
												className="login-login"
											>
												Login
											</NavLink>
											<NavLink
												to="/register"
												activeClassName="active-link"
												className="login-login"
											>
												Register
											</NavLink>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Header
