import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Saree, CartItem } from '../types';
import { brandConfig } from '../config/brand.config';

interface CartContextType {
  items: CartItem[];
  addItem: (saree: Saree, quantity?: number, selectedBlouseOption?: string) => void;
  removeItem: (sareeId: string) => void;
  updateQuantity: (sareeId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  estimatedTotal: number;
  freeShippingRemaining: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'aaranya_shopping_bag_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist cart:', e);
    }
  }, [items]);

  const addItem = (saree: Saree, quantity = 1, selectedBlouseOption?: string) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.saree.id === saree.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            saree,
            quantity,
            selectedBlouseOption,
            addedAt: new Date().toISOString(),
          },
        ];
      }
    });
    setIsCartOpen(true);
  };

  const removeItem = (sareeId: string) => {
    setItems((prev) => prev.filter((item) => item.saree.id !== sareeId));
  };

  const updateQuantity = (sareeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(sareeId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.saree.id === sareeId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.saree.price * item.quantity, 0);

  const freeShippingThreshold = brandConfig.shipping.freeShippingThreshold;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = items.length === 0 || isFreeShipping ? 0 : brandConfig.shipping.standardShippingFee;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const estimatedTotal = subtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shippingFee,
        estimatedTotal,
        freeShippingRemaining,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen((prev) => !prev),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
