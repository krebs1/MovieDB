import React, {FC, ReactNode, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket, faUser} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import styles from './CUserControls.module.scss'
import {faBookmark, faHeart} from "@fortawesome/free-regular-svg-icons";
import CListItem from "../ListItem/CListItem";

interface UserControlsProps{
    children: ReactNode
}

const CUserControls:FC<UserControlsProps> = ({children}) => {
    const [isMouseOn, setIsMouseOn] = useState<boolean>(false);

    return (
        <div onMouseOver={(e)=>setIsMouseOn(true)}
             onMouseLeave={(e)=>setIsMouseOn(false)}
             className={styles.wrapper}
        >
            <Button style={{borderRadius: '50%'}}
                    className={styles.wrapper_avatar}
            >
                <FontAwesomeIcon icon={faUser}
                                 style={{color: '#eeeeee'}}
                />
            </Button>
            {
                isMouseOn &&
                <ul className={styles.wrapper_controlsWrapper}>
                    {children}

                </ul>
            }
        </div>
    );
};

export default CUserControls;