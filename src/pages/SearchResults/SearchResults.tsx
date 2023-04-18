import React, {useEffect, useRef, useState} from 'react';
import {IFilm} from "../../types/types";
import {useFetching} from "../../hooks/useFetching";
import {useObserver} from "../../hooks/useObserver";
import FilmList from "../../components/FilmList/FilmList";
import Loader from "../../components/UI/Loader/Loader";
import styles from './SearchResults.module.scss'
import {useLocation, useParams, useSearchParams} from "react-router-dom";
import FilmsService from "../../api/FilmsService";

const SearchResults = () => {
    const numOfFilms = 9;
    const limit = 12;
    const [films, setFilms] = useState<IFilm[]>([]);
    const [page, setPage] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();

    const observedObj = useRef<HTMLDivElement>(null);

    const q = searchParams.get('q');

    const [fetchFilms, isFilmsLoading, setIsLoading, Error] = useFetching(async (page: number) => {
        if (!isFilmsLoading) {
            let response = await FilmsService.getAllByName('name', q !== null ? q : '', page, limit);
            if (response !== null) {
                const [data, status, statusText] = response;
                setFilms([...films, ...data])
            }
        }
    })

    useEffect(() => {
        fetchFilms(page)
    }, [page])
    useEffect(() => {
        setIsLoading(true)
        setPage(0)
        setFilms([])
    }, [q])

    useObserver(observedObj, page < Math.ceil(numOfFilms / 12), isFilmsLoading, () => {
        if(!isFilmsLoading) setPage(page + 1)
    });

    return (
        <div className={styles.favWrapper}>
            <h1 className={styles.favWrapper_header}>{`По запросу "${q}" ${films.length !== 0 ? 'найдено:' : 'ничего не найдено'}`}</h1>
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

export default SearchResults;