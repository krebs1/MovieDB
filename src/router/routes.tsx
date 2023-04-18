import MainPage from "../pages/MainPage/MainPage";
import FilmPage from "../pages/FilmPage/FilmPage";
import {IRoute} from "../types/types";
import AuthorizePage from "../pages/AuthorizePage/AuthorizePage";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";
import WatchlistPage from "../pages/WatchlistPage/WatchlistPage";
import SearchResults from "../pages/SearchResults/SearchResults";

export const publicRoutes: IRoute[] = [
    {path: '/', element: <MainPage/>},
    {path: '/film/:id', element: <FilmPage/>},
    {path: '/authorize', element: <AuthorizePage/>},
    {path: '/fav', element: <FavoritesPage/>},
    {path: '/watchlist', element: <WatchlistPage/>},
    {path: '/search', element: <SearchResults/>},
]