import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://podcastr-pedrohenry-santos.vercel.app/api'
});
