import React, {FC, useEffect, useRef, useState} from 'react';
import styles from "./image.module.scss";

interface IImageProps {
    alt: string,
    url: string,
    className?: string
    width?: string | number,
    height?: string | number
}

const Image: FC<IImageProps> = ({alt, url, width, height, className = ''}) => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    return (
        <div>
            {!imageLoaded &&
                <div style={{
                    height,
                    width,
                    backgroundColor: '#424856'
                }}
                />
            }
            <img src={url}
                 alt={alt}
                 onLoad={() => setImageLoaded(true)}
                 style={{
                     height,
                     width,
                     display: imageLoaded ? 'block' : 'none',
                 }}
            />
        </div>
    );
};

export default Image;