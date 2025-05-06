import { createContext } from "react";


export const AppContext = createContext(null);



const AppContextProvider = (props) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const value = {
    backend_url: backend_url
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );


};

export default AppContextProvider;