import React from "react"
import "./orderList.css"
import HeadingBig from "../components/Typography/HeadingBig"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import Spinner from "../components/Utils/Spin"
import Message from "../components/Utils/Message"
import Pagination from "../components/Utils/Pagination"
import { useLocation, useHistory } from "react-router-dom"
import { getOrders, getOrdersAdmin } from "../redux/actions/orderAction"
import Marked from "../assets/svg/Marked"
import Cancel from "../assets/svg/Cancel"

const OrderList = () => {
	const history = useHistory()

	const search = useLocation().search
	const dispatch = useDispatch()

	const { user } = useSelector((state) => state.user)

	useEffect(() => {
		if (!user) {
			history.push("/login")
		} else {
			const newPage = search ? search.split("=")[1] : null

			if (user.isAdmin) dispatch(getOrdersAdmin(newPage))
			else dispatch(getOrders(newPage))
		}
	}, [dispatch, search, user, history])

	const allProducts = useSelector((state) => state.getOrderList)
	const { loading, orders, currentPage, totalPages, error } = allProducts

	return (
		<div className="orderList">
			<div className="orderList-container">
				<div className="orderList-heading">
					<HeadingBig>
						{orders?.length === 0 ? "pls order something" : "orders list"}
					</HeadingBig>
				</div>
				{loading ? (
					<Spinner />
				) : error ? (
					<Message color="red-message">{error}</Message>
				) : (
					orders.length > 0 && (
						<>
							<div className="orderList-details">
								<div className="orderList-details-heading">
									<p>orderId</p>
									<p>name</p>
									<p>date</p>
									<p>total</p>
									<p>paid</p>
									<p>delivered</p>
									<p></p>
								</div>
								<div className="orderList-details-items">
									{orders.map((order) => {
										return (
											<div key={order._id} className="orderList-details-item">
												<p>{order._id}</p>
												<p>{order.user.name}</p>
												<p id="pcategory">
													{order.createdAt.split("T")[0]}
												</p>
												<p>{`$${order.totalPrice}.00`}</p>
												<p>{order.isPaid ? <Marked /> : <Cancel />}</p>
												<p>{order.isDelivered ? <Marked /> : <Cancel />}</p>
												<button
													onClick={() =>
														history.push(`order/${order._id}`)
													}
												>
													details
												</button>
											</div>
										)
									})}
								</div>
							</div>
							{+totalPages > 1 && (
								<Pagination pages={totalPages} currentPage={currentPage} />
							)}
						</>
					)
				)}
			</div>
		</div>
	)
}

export default OrderList
