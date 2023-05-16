

import axios from 'axios';


const wakandaApi = axios.create({
    baseURL: '/api'
});


export default wakandaApi;