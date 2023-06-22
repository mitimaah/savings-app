import { createContext, useState } from 'react';
import Toast from 'ui/molecules/Toast';

const Context = createContext({});
let count = 0;
export const ToastContext = ({ children }) => {
  const initContext = {
    push: handlePush,
    toasts: [],
  };
  const [value, setValue] = useState(initContext);
  const closeToast = (id) => {
    setValue((prevState) => {
      const arr = [
        ...prevState.toasts.map((toast) => toast.id !== id && toast),
      ].filter((item) => item);
      return {
        ...prevState,
        toasts: [...arr],
      };
    });
  };

  const displayToast = () => {
    return (
      <div
        className="overlay"
        style={{
          marginTop: 80,
          display: 'flex',
          flexDirection: 'column',
          pointerEvents: 'none',
          alignItems: 'flex-end',
        }}
      >
        {value.toasts.map(({ message, color, Icon, id }, index) => (
          <Toast
            key={id}
            message={message}
            color={color}
            Icon={Icon}
            closeFn={closeToast}
            index={index}
            id={id}
          />
        ))}
      </div>
    );
  };
  function handlePush(opts) {
    const newOpts = { ...opts, id: `${count}-toast` };
    count++;
    setValue((prevState) => ({
      ...prevState,
      toasts: [...prevState.toasts, newOpts],
    }));
  }

  return (
    <Context.Provider value={value}>
      {children}
      {value.toasts.length ? displayToast() : null}
    </Context.Provider>
  );
};

export default Context;
