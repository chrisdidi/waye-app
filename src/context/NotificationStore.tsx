import React, { useState } from "react";

export const NotificationStore = React.createContext<any | null>(null);

const NotificationStoreProvider = ({ children }: any) => {
  const [message, setMessage] = useState<string | null>(null);

  const toast = (e: string) => {
    setMessage(e);
  };

  const dismiss = () => {
    setMessage(null);
  };
  return (
    <NotificationStore.Provider
      value={{
        message,
        toast,
        dismiss,
      }}
    >
      {children}
    </NotificationStore.Provider>
  );
};

export default NotificationStoreProvider;
