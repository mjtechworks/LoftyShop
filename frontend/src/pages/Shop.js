import React, { useState, useEffect } from "react"
import "./Shop.css"
import { useDispatch, useSelector } from "react-redux"
import { getOptions, getProducts } from "../redux/actions/productActions"
import Pagination from "../components/Utils/Pagination"
import ShopHero from "../components/Shop/ShopHero"
import MenHero from "../components/Shop/MenHero"
import ShopProduct from "../components/Shop/ShopProduct"
import WomenHero from "../components/Shop/WomenHero"

const Shop = (props) => {
	const { location, history } = props
	const { search, pathname } = location

	const men = "/men"
	const women = "/women"

	const [prevState, changePrevState] = useState({})

	const [gender, genderChange] = useState(
		pathname === men ? "male" : pathname === women ? "female" : "gender"
	)

	const [category, categoryChange] = useState("category")

	const [vendor, vendorChange] = useState("vendor")

	const [minPrice, minPriceChange] = useState(0)

	const [maxPrice, maxPriceChange] = useState(2000)

	const changeGender = (e) => {
		genderChange(e.target.value)
		changePrevState((value) => {
			return { ...value, gender: "" }
		})
	}

	const changeCategory = (e) => {
		categoryChange(e.target.value)
		changePrevState((value) => {
			return { ...value, category: "" }
		})
	}

	const changeVendor = (e) => {
		vendorChange(e.target.value)
		changePrevState((value) => {
			return { ...value, vendor: "" }
		})
	}

	const filterProducts = () => {
		let paramst = []
		if (gender !== "gender") paramst.push(`gender=${gender}`)
		if (vendor !== "vendor") paramst.push(`vendor=${vendor}`)
		if (category !== "category") paramst.push(`category=${category}`)

		if (minPrice < maxPrice && minPrice > 0) paramst.push(`minPrice=${minPrice}`)
		else if (minPrice > maxPrice) {
			paramst.push(`minPrice=${maxPrice}`)
			paramst.push(`maxPrice=${minPrice}`)
		}

		if (minPrice < maxPrice && maxPrice < 2000) paramst.push(`maxPrice=${maxPrice}`)

		history.push(`?${paramst.join("&")}`)
	}

	const vendors = useSelector((state) => state.option)
	const { data, loading: vendorsLoading, error: vendorsError } = vendors

	const shop = useSelector((state) => state.shopList)
	const { product, currentPage, pages, loading, error } = shop

	const dispatch = useDispatch()

	useEffect(() => {
		let result = {}
		let all
		const newParams = () => {
			// Get the values from the query
			const search2 = new URLSearchParams(search).entries()
			for (let it of search2) {
				result[it[0]] = it[1]
			}
			if (pathname !== "/shop") result.gender = pathname === men ? "male" : "female"
			changePrevState(result)
			all = Object.keys(result).map((items) => {
				return items + `=${result[items]}`
			})
		}
		newParams()
		dispatch(getOptions())
		dispatch(getProducts(all.join("&")))
	}, [dispatch, search, pathname])

	return (
		<div className="shop">
			<div className="shop-container">
				{pathname === men ? <MenHero /> : pathname === women ? <WomenHero /> : <ShopHero />}
				<ShopProduct
					gender={gender}
					prevState={prevState}
					changeGender={changeGender}
					category={category}
					changeCategory={changeCategory}
					vendor={vendor}
					changeVendor={changeVendor}
					vendorsLoading={vendorsLoading}
					vendorsError={vendorsError}
					minPrice={minPrice}
					maxPrice={maxPrice}
					data={data}
					filterProducts={filterProducts}
					loading={loading}
					error={error}
					product={product}
					path={pathname}
					changePrevState={changePrevState}
					maxPriceChange={maxPriceChange}
					minPriceChange={minPriceChange}
				/>
				{pages > 1 && (
					<Pagination
						pages={pages}
						currentPage={currentPage}
						path={pathname}
						search={search}
					/>
				)}
			</div>
		</div>
	)
}

export default Shop
