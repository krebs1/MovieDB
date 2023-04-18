import React, {FC, ReactNode} from 'react';
import Header from "../../components/UI/Header/Header";
import Footer from "../../components/UI/Footer/Footer";
//@ts-ignore
import styles from './mainLayout.module.scss';

interface ILayoutProps {
    children: ReactNode
}

const MainLayout = ({children, ...props}: ILayoutProps) => {
    return (
        <div className={styles.wrapper}>
            <Header className={styles.wrapper_header}/>
            <main className={styles.wrapper_main}>
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default MainLayout;