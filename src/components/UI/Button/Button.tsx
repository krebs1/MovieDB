import React, {FC, ReactNode} from 'react';
import {inspect} from "util";
import styles from './button.module.scss'

interface IButtonProps {
    text?: string,
    className?: string,
    onClick?: Function,
    children?: ReactNode,
    style?: React.CSSProperties
}

const Button: FC<IButtonProps> = ({
                                      text,
                                      className,
                                      onClick,
                                      children,
                                      style
                                  }) => {
    return (
        <button className={`${styles.button} ${className}`}
                onClick={() => {
                    if (onClick !== undefined) onClick()
                }}
                style={style}
        >
            {text}
            {children}
        </button>
    );
};

export default Button;