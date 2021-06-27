import React from "react"
import HeadingMid from "../Typography/HeadingMid"
import HeadingSmall from "../Typography/HeadingSmall"
import Star from "../Utils/Star"
import "./review.css"
import Message from "../Utils/Message"
import SmallSpin from "../Utils/SmallSpin"
import { useSelector } from "react-redux"

const Review = ({
	reviews,
	comment,
	changeComment,
	rating,
	changeRating,
	submitComment,
	reviewError,
	reviewLoading,
}) => {
	const { user } = useSelector((state) => state.user)

	return (
		<div className="review">
			<div className="review-heading">
				<HeadingMid color="black">reviews</HeadingMid>
			</div>
			{reviews.length > 0 ? (
				reviews.map((user) => {
					return (
						<div key={user._id} className="review-details">
							<div className="review-user">
								<HeadingSmall color="light-grey headingSmall-L">
									{user.name}
								</HeadingSmall>
							</div>
							<div className="review-star">
								<Star ratings={user.rating} />
							</div>
							<div className="review-time">{user.updatedAt.split("T")[0]}</div>
							<div className="user-comment">{user.comment}</div>
						</div>
					)
				})
			) : (
				<Message color="dark-message">no reviews</Message>
			)}
			{user ? (
				<div className="write-review">
					<div className="write-review-heading">
						<HeadingMid color="black">write a review</HeadingMid>
					</div>
					<div className="write-review-input">
						<label htmlFor="rating" className="review-label">
							Rating
						</label>
						<select
							name="rating"
							id="rating"
							className="review-input"
							value={rating}
							onChange={(e) => changeRating(e.target.value)}
						>
							{[...Array(5).keys()].map((i) => {
								return (
									<option key={i + 1} value={i + 1}>
										{i + 1}
									</option>
								)
							})}
						</select>
						<label htmlFor="comment" className="review-label">
							comment
						</label>
						<textarea
							name="comment"
							id="comment"
							cols="30"
							rows="10"
							className="review-input1"
							value={comment}
							onChange={(e) => changeComment(e.target.value)}
						/>
						{reviewError && <Message color="red-message">{reviewError}</Message>}
						<div className="comment-button">
							<button
								className="checkout-button blue button-relative send-order"
								onClick={submitComment}
							>
								add comment
								{reviewLoading && (
									<div className="cover-1 ">
										<SmallSpin />
									</div>
								)}
							</button>
						</div>
					</div>
				</div>
			) : (
				<Message color="blue-message" children="log in to write a review" />
			)}
		</div>
	)
}

export default Review
