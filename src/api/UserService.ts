import axios from "axios";

export default class UserService {
    private static basicUrl: string = "http://localhost:3001";

    static async authorize(email: string, pass: string) {
        const response = await axios.get(this.basicUrl+"/users",{
            params:{
                email: email,
                pass: pass
            }
        })
        if(response.data.length === 0){
            return {
                authorized: false
            }
        }else{
            return {
                authorized: true
            }
        }
    }
    static async getFavs(limit: number | null = null, page: number | null = null){
        if (limit === null && page === null) {
            let response = await axios.get(this.basicUrl + '/favorites');
            return [response.data, response.status, response.statusText];
        }
        if (typeof limit === 'number' && typeof page === 'number') {
            let response = await axios.get(this.basicUrl + `/favorites?_limit=${limit}&_page=${page}`);
            return [response.data, response.status, response.statusText];
        }
        return null;
    }
    static async isFav(id: number){
        const response = await axios.get(this.basicUrl+"/favorites",{
            params:{
                id: id
            }
        })
        return response.data.length !== 0
    }
    static async getWL(limit: number | null = null, page: number | null = null){
        if (limit === null && page === null) {
            let response = await axios.get(this.basicUrl + '/watchlist');
            return [response.data, response.status, response.statusText];
        }
        if (typeof limit === 'number' && typeof page === 'number') {
            let response = await axios.get(this.basicUrl + `/watchlist?_limit=${limit}&_page=${page}`);
            return [response.data, response.status, response.statusText];
        }
        return null;
    }
    static async isInWL(id: number){
        const response = await axios.get(this.basicUrl+"/watchlist",{
            params:{
                id: id
            }
        })
        return response.data.length !== 0
    }
}