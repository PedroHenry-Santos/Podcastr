import { GetStaticProps } from 'next';
import { DbTypes } from '../@types/dbTypes';

interface propsResponse {
    dbData: DbTypes;
}

const Home: React.FC<propsResponse> = ({ dbData }) => {
    return (
        <div>
            <h1>Index</h1>
            <h1>{JSON.stringify(dbData)}</h1>
        </div>
    );
};

export const getStaticProps: GetStaticProps<propsResponse> = async () => {
    const response = await fetch('http://localhost:3333/episodes');
    const data = await response.json();

    return {
        props: {
            dbData: data
        },
        revalidate: 60 * 60 * 8
    };
};

export default Home;
