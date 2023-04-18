import {ReactNode} from "react";

export interface IFilm {
    id: number,
    poster: {
        url: string,
        previewUrl: string
    },
    rating: IRating,
    name: string,
}

export interface IFilmByID {
    id: number,
    poster: {
        url: string,
        previewUrl: string
    },
    rating: IRating,
    name: string,
    backdrop: {
        url: string,
        previewUrl: string
    },
    movieLength: number,
    ageRating: number,
    videos: {
        trailers: {
            url: string,
            name: string,
            site: string
        }[],
    },
    watchability: {
        items: [
            name: string,
            logo: {
                url: string
            },
            url: string
        ]
    },
    genres: [
        {
            name: string
        }
    ],
    countries: [
        {
            name: string
        }
    ],
    description: string,
    premiere:{
        world: string
    },
    persons: IPerson[],
}

export interface IRating {
    kp: number,
    imdb: number,
    filmCritics: number,
    russianFilmCritics: number,
    await: number,
}

export interface IFilmList {
    filmList: IFilm[]
}

export interface IRoute {
    path: string,
    element: ReactNode
}

export interface ITime {
    minutes: number,
    hours: number
}

export interface IPerson {
    id:number,
    photo: string,
    name: string,
    profession: string,
}