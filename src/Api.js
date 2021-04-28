import axios from 'axios'

const SERVER_URL = 'http://localhost:5050';

const instance = axios.create ({
    baseURL: SERVER_URL,
    timeout: 1000
});

export default {

    getAll: () => instance.get('/assets',{
        transformResponse: [function (data) {
            return data? JSON.parse(data)._embedded.assets : data;

        }]
    })
}