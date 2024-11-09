import React, { useState } from "react";
import ToastContext from "./ToastService";
import { RxCross2 } from "react-icons/rx";

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const open = (component, timeout = 3000) => {
    const id = Date.now();

    setToasts((toasts) => [...toasts, { id, component }]);

    setTimeout(() => close(id), timeout);
  };

  const close = (id) => {
    setToasts(toasts.filter((toast) => toast.id != id));
  };

  return (
    <ToastContext.Provider value={{ open, close }}>
      {children}
      <div className="w-80 z-20 font-roboto font-normal text-base space-y-2 absolute top-3 right-3 ">
        {toasts.map(({ id, component }) => (
          <div key={id} className="relative">
            <button
              onClick={() => close(id)}
              className="absolute top-2 right-2 rounded-lg bg-gray-200/20 text-gray-800/60"
            >
              <RxCross2 size={18} />
            </button>
            {component}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
