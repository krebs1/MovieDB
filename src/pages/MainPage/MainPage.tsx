import React, {LegacyRef, useEffect, useRef, useState} from 'react';
import FilmList from '../../components/FilmList/FilmList';
import FilmsService from "../../api/FilmsService";
import '../../styles/main.scss'
import Loader from "../../components/UI/Loader/Loader";
import {useFetching} from "../../hooks/useFetching";
import {IFilm} from "../../types/types";
import styles from './mainPage.module.scss'
import {useObserver} from "../../hooks/useObserver";

const MainPage = () => {
    const numOfFilms = 100;
    const limit = 12;

    const [films, setFilms] = useState<IFilm[]>([]);
    const [page, setPage] = useState(0);

    const observedObj = useRef<HTMLDivElement>(null);

    const [fetchFilms, isFilmsLoading, Error] = useFetching(async (page: number) => {
        let response = await FilmsService.getAllFilms(limit, page);
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
        <div>
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

export default MainPage;