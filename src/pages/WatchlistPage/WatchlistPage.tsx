import React, {useEffect, useRef, useState} from 'react';
import {IFilm} from "../../types/types";
import {useFetching} from "../../hooks/useFetching";
import {useObserver} from "../../hooks/useObserver";
import FilmList from "../../components/FilmList/FilmList";
import Loader from "../../components/UI/Loader/Loader";
import UserService from "../../api/UserService";
import styles from './WatchlistPage.module.scss'

const WatchlistPage = () => {
    const numOfFilms = 9;
    const limit = 12;

    const [films, setFilms] = useState<IFilm[]>([]);
    const [page, setPage] = useState(0);

    const observedObj = useRef<HTMLDivElement>(null);

    const [fetchFilms, isFilmsLoading, Error] = useFetching(async (page: number) => {
        let response = await UserService.getWL(limit, page);
        if (response !== null) {
            const [data, status, statusText] = response;
            setFilms([...films, ...data])
        }
    })
    useEffect(() => {
        fetchFilms(page)
    }, [page])
    useObserver(observedObj, page < Math.ceil(numOfFilms / 12), isFilmsLoading, () => {
        setPage(page + 1)
    });

    return (
        <div className={styles.favWrapper}>
            <h1 className={styles.favWrapper_header}>Буду смотреть</h1>
            <FilmList filmList={films}
                      filmsInRow={4}
                      cardMR={10}
            />
            {isFilmsLoading && <Loader/>}
            {
                !isFilmsLoading &&
                <div ref={observedObj}/>
            }
        </div>
    );
};

export default WatchlistPage;