import React, { createContext, useContext, useState, useEffect } from 'react';

// CreateContext
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Load initial cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('nutrinest_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart", error);
      return [];
    }
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('nutrinest_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size, price) => {
    setCartItems(prev => {
      // Check if item with exact product and size already exists
      const existingItem = prev.find(item => item.id === product.id && item.size === size);
      
      if (existingItem) {
        // Increment quantity
        return prev.map(item => 
          item.id === product.id && item.size === size 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // Add new item
      return [...prev, {
        id: product.id,
        name: product.name,
        emoji: product.emoji,
        size: size,
        price: price,
        quantity: 1
      }];
    });
    
    // Automatically open sidebar when item is added
    setIsSidebarOpen(true);
  };

  const removeFromCart = (id, size) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id, size, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.size === size) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => setCartItems([]);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isSidebarOpen,
      toggleSidebar,
      openSidebar,
      closeSidebar
    }}>
      {children}
    </CartContext.Provider>
  );
};
