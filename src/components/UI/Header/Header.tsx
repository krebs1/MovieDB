import React, {FC, useContext} from 'react';
import styles from './header.module.scss'
import CSearchBar from "../SearchBar/CSearchBar";
import {AuthorizeContext, IAuthorizeContext} from "../../../context";
import {useNavigate} from "react-router-dom";
import CUserControls from "../UserControls/CUserControls";
import CListItem from "../ListItem/CListItem";
import {faBookmark, faHeart} from "@fortawesome/free-regular-svg-icons";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";

interface IHeaderProps {
    className?: string
}

const Header: FC<IHeaderProps> = ({className}: IHeaderProps) => {
    const {isAuth, setIsAuth} = useContext<IAuthorizeContext>(AuthorizeContext);
    const nav = useNavigate();

    return (
        <header className={`${styles.headerWrapper} ${className}`}>
            <div className={styles.headerWrapper_logoWrapper}
                 onClick={() => nav('/')}
            >
                <span>MovieDB</span>
            </div>
            <div className={styles.headerWrapper_searchWrapper}>
                <CSearchBar/>
            </div>
            <div>
                {
                    !isAuth &&
                    <a onClick={(e) => {
                        e.preventDefault()
                        if (isAuth && setIsAuth !== undefined) setIsAuth(false);
                        else if (!isAuth) nav('/authorize')
                    }}
                       className={styles.headerWrapper_navBtns}
                    >Войти</a>
                }
                {
                    isAuth &&
                    <CUserControls>
                        <CListItem icon={faHeart}
                                   text={"Любимое"}
                                   clickHandler={() => {
                                       nav('/fav')
                                   }}
                        />
                        <CListItem icon={faBookmark}
                                   text={"Буду смотреть"}
                                   clickHandler={() => {
                                       nav('/watchlist')
                                   }}
                        />
                        <CListItem icon={faRightFromBracket}
                                   text={"Выйти"}
                                   clickHandler={() => {
                                       if (setIsAuth !== undefined) setIsAuth(false)
                                   }}
                        />
                    </CUserControls>
                }
            </div>

        </header>
    );
};

export default Header;