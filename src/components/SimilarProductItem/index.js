// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {similarProduct} = props
  const {imageUrl, title, brand, totalReviews, price, rating} = similarProduct
  return (
    <div className="similar-product">
      <img src={imageUrl} className="img" alt={title} />
      <p>{title}</p>
      <p>by {brand}</p>
      <div className="price_container">
        <p>RS {price}/- </p>
        <div className="rating_container">
          <p>{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            className="star"
            alt="star"
          />
        </div>
      </div>
    </div>
  )
}

export default SimilarProductItem
