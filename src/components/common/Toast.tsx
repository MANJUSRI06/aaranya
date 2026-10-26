import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, Info, Heart, ShoppingBag } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'wishlist' | 'cart';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'info' | 'wishlist' | 'cart') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: 'success' | 'info' | 'wishlist' | 'cart' = 'success') => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast-item">
            {toast.type === 'cart' && <ShoppingBag size={18} color="#C5A059" />}
            {toast.type === 'wishlist' && <Heart size={18} color="#C5A059" fill="#C5A059" />}
            {toast.type === 'success' && <CheckCircle size={18} color="#C5A059" />}
            {toast.type === 'info' && <Info size={18} color="#C5A059" />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
