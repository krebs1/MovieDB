import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {publicRoutes} from "./routes";

const AppRouter = () => {
    return (
        <Routes>
            {
                publicRoutes.map((route)=>
                    <Route path={route.path}
                           element={route.element}
                           key={route.path}
                />)
            }
        </Routes>
    );
};

export default AppRouter;