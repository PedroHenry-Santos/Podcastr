import { NextApiRequest, NextApiResponse } from 'next';
import server from '../../../../server.json';

const Api = (request: NextApiRequest, response: NextApiResponse) => {
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
    return response.json(server.episodes);
};

export default Api;
