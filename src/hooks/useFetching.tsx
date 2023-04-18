import {useState} from "react";
import filmList from "../components/FilmList/FilmList";

//TODO change type of error e in try catch

export const useFetching = (callback:Function) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetching = async (...args: any[]) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (e:any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, setIsLoading, error] as const
}