import React from "react";
import styles from "./home.module.scss";

const Home = ({ cart, setCart }) => {
  const handleDelete = (idToRemove) => {
    console.log("Attempting to delete item with id:", idToRemove);
    // Cartdagi id bo'yicha mahsulotni filtrlash
    const updatedCart = cart.filter((item) => item.id !== idToRemove);

    // Cartni yangilash va localStorage-ga saqlash
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    console.log("Deleted item with id:", idToRemove);
    console.log("Updated Cart after delete:", updatedCart);
  };

  return (
    <div className={styles["home-container"]}>
      <h3>Your Products:</h3>
      <ul className={styles["product-list"]}>
        {cart.length > 0 ? (
          cart.map((item) => (
            <li key={item.id} className={styles["product-item"]}>
              <img
                src={item.image_url || "/path/to/default/image.jpg"} // Fallback image if URL is not available
                alt={item.name || "Product Image"} // Default alt text
                className={styles["product-image"]}
              />
              <div>{item.name}</div>
              <div>Brand: {item.brand_name}</div>
              <div>Price: ${item.price}</div>
              <button
                className={styles["delete-button"]}
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No products in the cart.</p>
        )}
      </ul>
    </div>
  );
};

export default Home;
