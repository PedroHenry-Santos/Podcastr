import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://teste-api-poscaster-pedrohenry-santos.vercel.app/api'
});
