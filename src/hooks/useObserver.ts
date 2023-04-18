import {MutableRefObject, useEffect, useRef} from "react";

//TODO change any types
//TODO remove ts-ignore

export const useObserver = (ref:any, canLoad:boolean, isLoading:boolean, callback:Function) => {
    const observer = useRef();

    useEffect(() => {
        if(isLoading) return;
        //@ts-ignore
        if(observer.current) observer.current.disconnect();

        var cb = function(entries:any, observer:any) {
            if (entries[0].isIntersecting && canLoad) {
                callback()
            }
        };
        //@ts-ignore
        observer.current = new IntersectionObserver(cb);
        //@ts-ignore
        observer.current.observe(ref.current)
    }, [isLoading])
}