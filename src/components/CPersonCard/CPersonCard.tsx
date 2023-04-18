import React, {FC, useEffect, useRef, useState} from 'react';
import Image from "../UI/Image/Image";
import {IPerson} from "../../types/types";

interface PersonCardProps extends IPerson{

}

const CPersonCard:FC<IPerson> = ({id, name, photo}) => {
    const [imgHeight, setImgHeight] = useState<number>(60);

    const wrapperRef = useRef<HTMLDivElement>(null);

    /*useEffect(() => {
        windowResizeHandler();

        function windowResizeHandler() {
            if (wrapperRef !== null) {
                const wrapperWidth = wrapperRef.current!.offsetWidth;
                setImgHeight(wrapperWidth * 1.583);
            }
        }

        window.addEventListener('resize', windowResizeHandler);
        return () => {
            window.removeEventListener('resize', windowResizeHandler);
        };
    }, [])**/

    return (
        <div>
            <Image alt={name}
                   url={photo}
                   width={"100%"}
                   height={imgHeight}
            />
            <span>{name}</span>
        </div>
    );
};

export default CPersonCard;