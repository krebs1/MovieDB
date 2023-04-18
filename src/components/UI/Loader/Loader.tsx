import React from 'react';
//@ts-ignore
import styles from './loader.module.scss'

const Loader = () => {
    return (
        <div className={styles.loaderWrapper}>
            <div className={styles.loaderWrapper_loader}/>
        </div>
    );
};

export default Loader;