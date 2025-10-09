import axios from 'axios';

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