import React, {FC} from 'react';
import styles from './CInput.module.scss'

interface InputProps {
    value?: string
    label: string,
    error?: string,
    placeholder: string,
    inputHandler?: Function,
}

const CInput: FC<InputProps> = ({label, error, placeholder, inputHandler, value}) => {
    return (
        <div className={styles.InputWrapper}>
            <label className={styles.InputWrapper_label}>
                {label}
                <input className={styles.InputWrapper_input}
                       placeholder={placeholder} type="text"
                       value={value}
                       onInput={
                           (e: React.ChangeEvent<HTMLInputElement>) => {
                               if (inputHandler !== undefined) inputHandler(e);
                           }
                       }
                />
            </label>
            {
                (error !== '' && error !== undefined) &&
                <span className={styles.InputWrapper_error}>{error}</span>
            }
        </div>
    );
};

export default CInput;