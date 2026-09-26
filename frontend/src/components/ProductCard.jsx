import React from "react"
import {Link} from "react-router-dom"
import "../styles/ProductCard.css"


const ProductCard = ({product})=>{
    const imageSource = Array.isArray(product.imageUrl)
        ? product.imageUrl[0]
        : product.imageUrl
    const priceValue = Number(product.price)

    return(
        <div className="product-card">
            
        <img src={imageSource} alt={product.name} className="product-image"/>
        <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${Number.isFinite(priceValue) ? priceValue.toFixed(2) : "0.00"}</p>
<Link to = {`/products/${product._id}`} className="product-link"> 
  View details</Link>
        </div>
        </div>
    )
}

export default ProductCard