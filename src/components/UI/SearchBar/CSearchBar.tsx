import React, {FC, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import styles from './CSearchBar.module.scss'
import {useNavigate} from "react-router-dom";

interface CSearchBarProps {
    classNames?: string
}

const CSearchBar: FC<CSearchBarProps> = ({classNames}) => {
    const [searchQ, setSearchQ] = useState<string>('');

    const nav = useNavigate();

    return (
        <div className={`${styles.searchWrapper} ${classNames}`}>
            <input type="text"
                   className={styles.searchWrapper_input}
                   placeholder={"поиск..."}
                   onInput={
                       (e: React.ChangeEvent<HTMLInputElement>) => {
                           setSearchQ(e.target.value)
                       }
                   }
                   value={searchQ}
            />
            <button className={styles.searchWrapper_clear}
                    style={{color: '#eeeeee'}}
                    onClick={() => {
                        setSearchQ('')
                    }}
            >
                <FontAwesomeIcon icon={faXmark}
                                 className={styles.searchWrapper_icon}
                />
            </button>
            <button className={styles.searchWrapper_find}
                    style={{color: '#424856'}}
                    onClick={() => {
                        nav(`/search?q=${searchQ}`)
                    }}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass}
                                 className={styles.searchWrapper_icon}
                />
            </button>
        </div>
    );
};

export default CSearchBar;