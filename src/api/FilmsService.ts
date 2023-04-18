import axios from "axios";

export default class FilmsService {
    private static basicUrl: string = "http://localhost:3001";

    static async getAllFilms(limit: number | null = null, page: number | null = null) {
        if (limit === null && page === null) {
            let response = await axios.get(this.basicUrl + '/movies');
            return [response.data, response.status, response.statusText];
        }
        if (typeof limit === 'number' && typeof page === 'number') {
            let response = await axios.get(this.basicUrl + `/movies?_limit=${limit}&_page=${page}`);
            return [response.data, response.status, response.statusText];
        }
        return null;
    }
    static async getAllByName(name: string, value: string, page: number, limit: number) {
        let query = this.basicUrl + `/movies?_limit=${limit}&_page=${page}&${name}_like=${value}`
        let response = await axios.get(query);
        return [response.data, response.status, response.statusText];
    }
    static async getFilmByID(id: number) {
        let response = await axios.get(this.basicUrl + '/movie');
        return [response.data, response.status, response.statusText];
    }
}