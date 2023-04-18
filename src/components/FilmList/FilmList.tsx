import React, {FC, useEffect, useRef, useState} from 'react';
import {IFilm, IFilmList} from "../../types/types";
import FilmCard from "../FilmCard/FilmCard";
import styles from './filmList.module.scss'

interface IFilmListProps extends IFilmList {
    filmsInRow: number,
    cardMR: number
}

const FilmList: FC<IFilmListProps> = ({filmList, filmsInRow, cardMR}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [chunks, setChunks] = useState<IFilm[][]>([]);
    const [cardWidth, setCardWidth] = useState<number>(0);

    const chunkSlicer = (filmList: IFilm[], chunkSize: number) => {

    }

    useEffect(() => {
        let chunks = [];
        for (let i = 0; i < filmList.length; i += filmsInRow) chunks.push(filmList.slice(i, i + filmsInRow));
        setChunks(chunks);
    }, [filmList, filmsInRow])
    useEffect(() => {
        if(cardWidth === 0){
            const wrapperWidth = wrapperRef.current!.offsetWidth;
            setCardWidth((wrapperWidth - (filmsInRow - 1) * cardMR) / filmsInRow);
        }

        function windowResizeHandler(){
            if (wrapperRef !== null) {
                const wrapperWidth = wrapperRef.current!.offsetWidth;
                setCardWidth((wrapperWidth - (filmsInRow - 1) * cardMR) / filmsInRow);
            }
        }
        window.addEventListener('resize', windowResizeHandler);
        return () => {window.removeEventListener('resize', windowResizeHandler);};
    }, [cardMR, cardWidth, filmsInRow])

    return (
        <div ref={wrapperRef}>
            {chunks.map((chunk, index) =>
                <div className={styles.filmRow}
                     key={index}
                >
                    {chunk.map((film) =>
                        <FilmCard key={film.id}
                                  id={film.id}
                                  poster={film.poster}
                                  rating={film.rating}
                                  name={film.name}
                                  width={cardWidth}
                                  height={cardWidth * 1.5}
                                  cardMR={cardMR}
                        />)}
                </div>
            )}
        </div>
    );
};

export default FilmList;