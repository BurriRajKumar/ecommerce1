import React, { useEffect, useState } from "react"
import axios from "axios"
import AddToCart from "./AddToCart"

export default function ProductList() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:4000/api/product/all")
      .then(res => setProducts(res.data))
  }, [])

  return (
    <div className="container mt-4">
      <div className="row">
        {products.map(product => (
          <div className="col-md-4 mb-3" key={product._id}>
            <div className="card shadow p-3">
              <h5>{product.name}</h5>
              <p>₹{product.price}</p>
              <AddToCart productId={product._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}