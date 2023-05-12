// Write your code here
import {Component} from 'react'
import Cookie from 'js-cookie'
import {FaRegMinusSquare} from 'react-icons/fa'
import {BsPlusSquare} from 'react-icons/bs'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

class ProductItemDetails extends Component {
  state = {productDetails: {}, similarProducts: []}

  componentDidMount() {
    this.getItemDetails()
  }

  getItemDetails = async () => {
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookie.get('jwt_token')

    const api = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, options)

    if (response.ok) {
      const data = await response.json()
      const similarProducts = data.similar_products
      // console.log(data.similar_products)
      const updatedSimilarProducts = similarProducts.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        title: each.title,
        rating: each.rating,
        price: each.price,
        brand: each.brand,
        totalReviews: each.total_reviews,
        availability: each.availability,
      }))
      const updatedData = {
        imageUrl: data.image_url,
        id: data.id,
        title: data.title,
        brand: data.brand,
        price: data.price,
        rating: data.rating,
        description: data.description,
        totalReviews: data.total_reviews,
        availability: data.availability,
      }
      this.setState({
        productDetails: updatedData,
        similarProducts: updatedSimilarProducts,
      })
    } else {
      console.log('failed')
    }
  }

  renderProduct = () => {
    const {productDetails, similarProducts} = this.state
    console.log(similarProducts)
    const {
      imageUrl,
      id,
      price,
      description,
      title,
      brand,
      totalReviews,
      rating,
      availability,
    } = productDetails

    return (
      <>
        <Header />
        <div className="product_details_container">
          <div className="bg">
            <div className="product_image">
              <img src={imageUrl} className="image" />
            </div>
            <div className="product_details">
              <h1 className="product_title">{title}</h1>
              <p className="product_price">{`RS ${price}/-`}</p>
              <div className="rating_container">
                <div className="rating">
                  <p>{rating}</p>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    className="star"
                    alt="star"
                  />
                </div>
                <p>{totalReviews} Reviews</p>
              </div>

              <p className="description">{description}</p>
              <p className="available">
                Available: <span className="span">{availability}</span>
              </p>
              <p className="available">
                Brand: <span className="span">{brand}</span>
              </p>
              <hr />
              <div className="count_container">
                <FaRegMinusSquare />
                <p className="counter">0</p>
                <BsPlusSquare />
              </div>
              <div className="button_container">
                <button type="button" className="addBtn">
                  {' '}
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <h1 className="similar_heading">Similar Products</h1>
        <div className="similar_products">
          {similarProducts.map(each => (
            <SimilarProductItem similarProduct={each} />
          ))}
        </div>
      </>
    )
  }

  render() {
    return this.renderProduct()
  }
}

export default ProductItemDetails
