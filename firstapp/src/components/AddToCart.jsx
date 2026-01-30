import React, { useState } from "react"
import axios from "axios"

export default function AddToCart({ productId }) {
  const [quantity, setQuantity] = useState(1)

  const userId = localStorage.getItem("userId") // store userId after login

  async function addToCart() {
    if (!userId) {
      alert("Please login first ❌")
      return
    }

    try {
      const res = await axios.post(
        `http://localhost:4000/api/cart/add?userId=${userId}`,
        {
          productId,
          quantity: Number(quantity),
        }
      )

      alert(res.data.message || "Added to cart ✅")
    } catch (err) {
      alert(err.response?.data?.message || "Error adding to cart ❌")
    }
  }

  return (
    <div className="d-flex gap-2">
      <input
        type="number"
        min="1"
        value={quantity}
        className="form-control w-25"
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button className="btn btn-success" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  )
}