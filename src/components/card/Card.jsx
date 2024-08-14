import { FaCartShopping } from "react-icons/fa6";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Card.module.scss";

const Card = ({ product, setCart, setAdd, cart }) => {
  const [cartCount, setCartCount] = useState(() => {
    // Mahsulot lokal xotiradan mavjud bo'lsa, uni olish
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return storedCart.filter((item) => item.id === product.id).length;
  });

  useEffect(() => {
    // Cart o'zgarishini lokal xotiraga saqlash
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = () => {
    // Agar mahsulot allaqachon cart'da bo'lsa, uni qayta qo'shmaslik uchun tekshirish
    if (cart.some((item) => item.id === product.id)) return;

    const updatedCart = [...cart, product];
    setCart(updatedCart);
    setAdd((prevAdd) => prevAdd + 1);

    // Cart Count-ni yangilash
    setCartCount(cartCount + 1);

    // Mahsulotni localStorage-ga saqlash
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    console.log("Added product:", product);
  };

  // Mahsulot allaqachon cart-ga qo'shilgan bo'lsa, buttonni disable qilish
  const isProductInCart = cart.some((item) => item.id === product.id);

  return (
    <div>
      <img
        src={product.image_url}
        alt={product.name}
        className={styles.image}
      />
      <h4>
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </h4>
      <p>{product.description}</p>

      <div className={styles.colors}>
        {product.color_options.map((color, index) => (
          <div
            key={index}
            style={{ background: color }}
            className={styles.color}
          />
        ))}
      </div>
      <div>${product.price}</div>
      <div className={styles.basic}>
        <Button onClick={addToCart} disabled={isProductInCart}>
          <FaCartShopping />
          {cartCount > 0 && <span className={styles.count}>{cartCount}</span>}
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Card;
