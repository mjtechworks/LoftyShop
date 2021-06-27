import React from "react"
import { Link, useLocation } from "react-router-dom"
import "./Pagination.css"

const Pagination = ({ pages, currentPage, path }) => {
	const search = useLocation().search
	const split = search.split("currentPage")
	const page = +currentPage ? +currentPage : 1
	return (
		<div className="pagination">
			<div className="pagination-container">
				{[...Array(pages).keys()].map((item) => (
					<Link
						key={item}
						to={
							search === ""
								? `?currentPage=${item + 1}`
								: split[1]
								? `${split[0]}currentPage=${item + 1}`
								: `${search}&currentPage=${item + 1}`
						}
						className={`pagination-button ${page === item + 1 && "pagination-active"}`}
					>
						{item + 1}
					</Link>
				))}
			</div>
		</div>
	)
}

export default Pagination
