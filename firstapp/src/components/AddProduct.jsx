import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const role = localStorage.getItem("role")
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
  }, [])

  // ✅ Add to Cart Function (FIXED)
  function addToCart(productId) {
    const userId = localStorage.getItem("userId")

    if (!userId) {
      alert("Login first to add products to cart ❌")
      navigate("/login")
      return
    }

    axios.post(
      `https://ecommerce1-c9ec.onrender.com/api/cart/add?userId=${userId}`,
      { productId, quantity: 1 }
    )
      .then(res => {
        alert("Product added to cart ✅")
        navigate("/cart")
      })
      .catch(err => {
        console.log("Add to cart error:", err)
        alert(err.response?.data?.message || "Error adding to cart ❌")
      })
  }

  // ✅ Fetch Products
  function fetchProducts() {
    axios.get("https://ecommerce1-c9ec.onrender.com/api/product")
      .then(res => {
        if (res.status === 200) {
          setProducts(res.data)
          setLoading(false)
        }
      })
      .catch(err => {
        console.log("Error fetching products", err)
      })
  }

  // ✅ Delete Product (Admin Only)
  function deleteProduct(id) {
    axios.delete(`https://ecommerce1-c9ec.onrender.com/api/product/delete/${id}`)
      .then(res => {
        alert("Product deleted ✅")
        fetchProducts()
      })
      .catch(err => {
        alert("Error deleting product ❌")
      })
  }

  return (
    <div className='container mt-4'>
      <h2 className="text-center mb-3">🛍️ Products</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className='row row-cols-1 row-cols-md-3 g-4 mt-3'>
          {products.map((i) => (
            <div className="col" key={i._id}>
              <div className="card h-100 shadow">
                <div className="card-body">
                  <h5 className="card-title"><b>Name:</b> {i.name}</h5>
                  <p className="card-text"><b>Price:</b> ₹{i.price}</p>
                  <p className="card-text"><b>Category:</b> {i.category}</p>
                  <p className="card-text"><b>Description:</b> {i.description}</p>
                  <p className="card-text"><b>Stock:</b> {i.stock}</p>

                  {role === "admin" ? (
                    <button 
                      onClick={() => deleteProduct(i._id)} 
                      className='btn btn-danger w-100'
                    >
                      Delete
                    </button>
                  ) : (
                    <button 
                      onClick={() => addToCart(i._id)} 
                      className='btn btn-warning text-white w-100'
                    >
                      Add to Cart
                    </button>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}