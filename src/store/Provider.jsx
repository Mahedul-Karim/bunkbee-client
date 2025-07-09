import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const appToken = localStorage.getItem("token") || null;

  console.log(appToken);

  const [token, setToken] = useState(appToken);

  const handleUser = (user, token) => {
    setUser(user);
    setToken(token);
    setIsLoading(false);
    localStorage.setItem('token',token)
  };

  return (
    <AppContext
      value={{
        user,
        isLoading,
        token,
        setUser,
        setToken,
        setIsLoading,
        handleUser,
      }}
    >
      {children}
    </AppContext>
  );
};

export const useStore = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useStore must be used within a Provider");
  }
  return context;
};

export default Provider;
