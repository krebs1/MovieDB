import React, {createContext, FormEvent, useContext, useEffect, useState} from 'react';
import CInput from "../../components/UI/Input/CInput";
import styles from './AuthorizePage.module.scss'
import Button from "../../components/UI/Button/Button";
import UserService from "../../api/UserService";
import {AuthorizeContext, IAuthorizeContext} from "../../context";
import {useNavigate} from "react-router-dom";


interface IData {
    value: string,
    err: string
}

const AuthorizePage = () => {
    const emailRegEx = new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])');
    const {isAuth, setIsAuth} = useContext<IAuthorizeContext>(AuthorizeContext);

    const [email, setEmail] = useState<IData>({
        value: '',
        err: ''
    });
    const [pass, setPass] = useState<IData>({
        value: '',
        err: ''
    });

    const nav = useNavigate();

    useEffect(() => {
        if (isAuth) nav('/')
    }, [])

    const signIn = async () => {

        if (emailRegEx.test(email.value)) {
            setEmail({value: '', err: ''});
            setPass({value: '', err: ''});
        } else {
            setEmail({value: '', err: 'Неправильный формат'});
            setPass({value: '', err: ''});
            return
        }

        const response = await UserService.authorize(email.value, pass.value);
        if (response.authorized) {
            if (setIsAuth !== undefined) {
                setIsAuth(true)
                nav('/')
            }
        } else {
            setEmail({value: '', err: 'Неправильный логин или пароль'});
            setPass({value: '', err: 'Неправильный логин или пароль'});
        }
    }

    return (
        <div className={styles.authorizeWrapper}>
            <div className={styles.authorizeWrapper_formWrapper}>
                <CInput label={'e-mail'}
                        placeholder={'e-mail'}
                        error={email.err}
                        value={email.value}
                        inputHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail({value: e.target.value, err: ''})
                        }}
                />
                <CInput label={'password'}
                        placeholder={'password'}
                        error={pass.err}
                        value={pass.value}
                        inputHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPass({value: e.target.value, err: ''})
                        }}
                />
                <Button text={'Войти'}
                        onClick={() => {
                            signIn()
                        }}
                />
            </div>
        </div>
    );
};

export default AuthorizePage;