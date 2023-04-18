import React, {FC, MouseEventHandler} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import styles from './CListItem.module.scss'

interface ListItemProps{
    icon: IconProp,
    text: string,
    className?: string,
    clickHandler?: MouseEventHandler<HTMLLIElement>
}

const CListItem:FC<ListItemProps> = ({icon, className = '', clickHandler, text}) => {
    return (
        <li className={`${styles.control} ${className}`}
            onClick={clickHandler}
        >
            <FontAwesomeIcon icon={icon}
                             className={styles.control_icon}
            />
            {text}
        </li>
    );
};

export default CListItem;