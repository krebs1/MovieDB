import React, {FC, useContext, useEffect, useState} from 'react';
import {IFilm} from "../../types/types";
import styles from './filmCard.module.scss'
import Rating from "../UI/Rating/Rating";
import Button from "../UI/Button/Button";
import Image from "../UI/Image/Image";
import {Link, Navigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark as faBookmarkReg, faHeart as faHeartReg} from "@fortawesome/free-regular-svg-icons";
import {faBookmark as faBookmarkSolid, faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import UserService from "../../api/UserService";
import {AuthorizeContext, IAuthorizeContext} from "../../context";

interface IFilmCardProps extends IFilm {
    width?: string | number,
    height?: string | number,
    cardMR?: number,
}

const FilmCard: FC<IFilmCardProps> = ({poster, rating, name, width, height, cardMR, id}) => {
    const [mouseOn, setMouseOn] = useState<boolean>(false)
    const [isFav, setIsFav] = useState<boolean>(false)
    const [isInWL, setIsInWL] = useState<boolean>(false)

    const {isAuth, setIsAuth} = useContext<IAuthorizeContext>(AuthorizeContext);

    const checkIsFav = async () => {
        const fav = await UserService.isFav(id)
        setIsFav(fav)
    }
    const checkIsInWL = async () => {
        const inWL = await UserService.isInWL(id)
        setIsInWL(inWL)
    }

    useEffect(() => {
        checkIsFav()
        checkIsInWL()
    }, [])

    return (
        <div className={styles.filmCard}
             onMouseOver={() => {
                 setMouseOn(true)
             }}
             onMouseLeave={() => {
                 setMouseOn(false)
             }}
             style={{
                 marginRight: cardMR
             }}
        >
            <Image alt={name}
                   url={poster.previewUrl}
                   width={width}
                   height={height}/>
            {mouseOn &&
                <div className={styles.filmCard_infoWrapper}>
                    <div className={styles.filmCard_infoWrapper_header}>
                        <Rating rating={rating.kp}
                                className={styles.filmCard_infoWrapper_header_rating}
                        />
                        <div className={styles.filmCard_infoWrapper_header_btns}>
                            <Button>
                                {
                                    isAuth &&
                                    <FontAwesomeIcon icon={isFav ? faHeartSolid : faHeartReg}/>
                                }
                                {
                                    !isAuth &&
                                    <FontAwesomeIcon icon={faHeartReg}/>
                                }
                            </Button>
                            <Button>
                                {
                                    isAuth &&
                                    <FontAwesomeIcon icon={isInWL ? faBookmarkSolid : faBookmarkReg}/>
                                }
                                {
                                    !isAuth &&
                                    <FontAwesomeIcon icon={faBookmarkReg}/>
                                }
                            </Button>
                        </div>
                    </div>
                    <p className={styles.filmCard_infoWrapper_name}>{name}</p>
                    <Link to={`/film/${id}`}
                          style={{
                              height: 30,
                              borderRadius: 5,
                              backgroundColor: '#424856',
                              color: '#eeeeee',
                              padding: 10,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                          }}
                          className={styles.filmCard_infoWrapper_button}
                    >{"подробнее".toUpperCase()}</Link>
                </div>
            }
        </div>
    );
};

export default FilmCard;