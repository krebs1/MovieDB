import React, {FC, useEffect, useState} from 'react';
import styles from './rating.module.scss'

interface IRatingProps{
    rating: number,
    className?: string
}

const Rating:FC<IRatingProps> = ({rating, className = ''}) => {
    const [ratingStr, setRatingStr] = useState<string>('');
    const [ratingColor, setRatingColor] = useState<string>(styles.greyRating);

    const getClassName = (rating:number) => {
        if(rating > 7) setRatingColor(styles.greenRating)
        else if(rating > 5 && rating <= 7 || rating === -1) setRatingColor(styles.greyRating)
        else if(rating < 5) setRatingColor(styles.redRating)
    }

    useEffect(()=>{
        setRatingStr(rating.toFixed(1));
        getClassName(rating);
    }, [rating])


    return (
        <div className={`${styles.ratingWrapper} ${ratingColor} ${className}`}>
            <span className={styles.ratingWrapper_value}>{ratingStr}</span>
        </div>
    );
};

export default Rating;