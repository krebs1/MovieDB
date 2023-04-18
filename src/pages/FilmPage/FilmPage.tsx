import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import FilmsService from "../../api/FilmsService";
import {IFilmByID} from "../../types/types";
import Rating from "../../components/UI/Rating/Rating";
import CTime from "../../components/UI/Time/CTime";
import styles from './FilmPage.module.scss'
import CPersonCard from "../../components/CPersonCard/CPersonCard";

const FilmPage = () => {
    const [filmData, setFilmData] = useState<IFilmByID | null>(null);
    const [videoHeight, setVideoHeight] = useState<number>(0);
    const [persons, setPersons] = useState<ReactNode[]>([]);

    const videoWrapperRef = useRef<HTMLDivElement>(null);

    const [fetchFilm, isFilmLoading, Error] = useFetching(async (page: number) => {
        let response = await FilmsService.getFilmByID(0);
        if (response !== null) {
            const [data, status, statusText] = response;
            setFilmData(data);
            personsFiltering();
        }
    })

    useEffect(() => {
        fetchFilm();
        windowResizeHandler();

        function windowResizeHandler() {
            if (videoWrapperRef !== null) {
                const wrapperWidth = videoWrapperRef.current!.offsetWidth;
                setVideoHeight(wrapperWidth / 16 * 9);
            }
        }

        window.addEventListener('resize', windowResizeHandler);
        return () => {
            window.removeEventListener('resize', windowResizeHandler);
        };
    }, [])

    const personsFiltering = ()=>{
        const components:ReactNode[] = [];
        console.log(filmData?.persons)
        filmData?.persons.forEach((person)=>{
            components.push(<CPersonCard key={person.id} id={person.id} photo={person.photo} name={person.name} profession={person.profession}/>)
        })
        setPersons(components)
    }

    return (
        <div className={styles.FilmPageWrapper}>
            <div className={styles.FilmPageWrapper_mainWrapper}>
                <div className={styles.FilmPageWrapper_mainWrapper_videoWrapper}
                     ref={videoWrapperRef}
                >
                    <iframe width="100%"
                            height={videoHeight}
                            src={filmData?.videos.trailers[0].url}>
                    </iframe>
                </div>
                <div className={styles.FilmPageWrapper_mainWrapper_info}>
                    <h1 className={styles.FilmPageWrapper_mainWrapper_info_name}>{filmData?.name}</h1>
                    <div className={styles.FilmPageWrapper_mainWrapper_info_mainInfo}>
                        <Rating rating={filmData?.rating !== undefined ? filmData?.rating.kp : -1}/>
                        <CTime time={filmData?.movieLength !== undefined ? filmData.movieLength : 0}/>
                        <span>{`${filmData?.ageRating}+`}</span>
                        <span>{(new Date(filmData?.premiere.world !== undefined ? filmData?.premiere.world : '')).getFullYear()}</span>
                    </div>
                    <div className={styles.FilmPageWrapper_mainWrapper_info_description}>
                        <p>{filmData?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilmPage;