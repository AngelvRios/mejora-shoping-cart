import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);

  function ContadorSuma() {
    setCount(count => count + 1);
  }

  function ContadorResta(cantidad) {
    setCount(count => Math.max(0, count - cantidad));
  }

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);    
    ContadorSuma();
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      return setCart(updatedCart);
    }
    return setCart([...cart, { ...product, quantity: 1 }]);
  }

  const removeFromCart = (product) => {
    const productToRemove = cart.find((item) => item.id === product.id);
    if (productToRemove) {
      ContadorResta(productToRemove.quantity);
      setCart(cart.filter((item) => item.id !== product.id));
    }
  }

  const clearCart = () => {
    setCount(0); 
    setCart([]); 
  }

  const increaseQuantity = (product) => {
    ContadorSuma();
    setCart(cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (product) => {
    const productToDecrease = cart.find((item) => item.id === product.id);
    if (productToDecrease && productToDecrease.quantity > 1) {
      ContadorResta(1);
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      ));
    }
  };

  return (
    <CartContext.Provider value={{ count, cart, addToCart, clearCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
}
