import { NextApiRequest, NextApiResponse } from 'next';
import server from '../../../../../server.json';

const Api = (request: NextApiRequest, response: NextApiResponse) => {
    const { query } = request;

    let result;

    server.episodes.forEach((el, i) => {
        if (el.id === query.id) {
            result = server.episodes[i];
        }
    });

    if (request.method === 'OPTIONS') {
        response.status(200).end();
        return {};
    }

    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader(
        'Access-Control-Allow-Methods',
        'GET,OPTIONS,PATCH,DELETE,POST,PUT'
    );
    return response.json(result);
};

export default Api;
