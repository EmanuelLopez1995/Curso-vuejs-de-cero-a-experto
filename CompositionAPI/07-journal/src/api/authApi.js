

import axios from "axios";


const authApi = axios.create({
    // aca va hasta el .com sin las otras rutas y sin el slash final
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: 'AIzaSyAyUfQ3Ugtwz_35PosuGc-RNiOHCVyFJq0'
    }
})

export default authApi