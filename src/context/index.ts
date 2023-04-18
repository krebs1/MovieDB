import {createContext, Dispatch, SetStateAction} from "react";
export interface IAuthorizeContext{
    isAuth: boolean,
    setIsAuth?: Dispatch<SetStateAction<boolean>>
}
export const AuthorizeContext = createContext<IAuthorizeContext>({
    isAuth: false,
});