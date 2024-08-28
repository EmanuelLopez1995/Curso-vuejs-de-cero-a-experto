

import axios from "axios";


const journalApi = axios.create({
    // aca va hasta el .com sin las otras rutas y sin el slash final
    baseURL: 'https://vue-demos-4511d-default-rtdb.firebaseio.com'
})

export default journalApi