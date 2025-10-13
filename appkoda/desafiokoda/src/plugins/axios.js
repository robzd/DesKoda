import axios from 'axios';

// VITE_TMDB_TOKEN=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmEwZDJhMzM1NWQxOTUwYTVhNjZmYjZjNDExNmEzNyIsIm5iZiI6MTc1OTY4MjExOS4wNzcsInN1YiI6IjY4ZTI5ZTQ3M2EwMTA1Njk4ZTljYWI0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IadGfuyXLcwGsFV3Mm4QiCY3QXjWQGYiAK9F61H6nKY
// VITE_API_URL=https://api.themoviedb.org/3

import { inject } from 'vue';

export const useAxios = () => inject('axios');

export default {
    install: (app, options) => {
        const axiosInstance = axios.create({
            baseURL: options.baseURL,
            headers: {
                'Accept': 'application/json',
            }
        });

        axiosInstance.interceptors.request.use(
            function (config) {
                config.headers["Authorization"] = 'Bearer ' + options.token
        
                return config
            },
            function (error) {
                return Promise.reject(error);
            }
        );
        axiosInstance.interceptors.response.use(
            function (response) {
                return response
            }
        );
        
        app.provide('axios', axiosInstance);
        app.config.globalProperties.$axios = axiosInstance
    }
}