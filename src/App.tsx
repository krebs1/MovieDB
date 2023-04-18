import React, {createContext, useState} from 'react';
import MainLayout from "./layouts/MainLayout/MainLayout";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter";
import './styles/index.scss'
import {AuthorizeContext} from "./context";

function App() {
    const [isAuth, setIsAuth] = useState<boolean>(true);

  return (
    <>
        <AuthorizeContext.Provider value={{isAuth, setIsAuth}}>
            <BrowserRouter>
                <MainLayout>
                    <AppRouter/>
                </MainLayout>
            </BrowserRouter>
        </AuthorizeContext.Provider>
    </>
  );
}

export default App;
