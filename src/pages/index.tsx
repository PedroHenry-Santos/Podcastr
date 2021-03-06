import { GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { EpisodeDB } from '../@types/episodeDB';
import { api } from '../services/api';
import { ConvertDurationToTimeString } from '../utils/ConvertDurationToTimeString';
import { usePlayer } from '../contexts/PlayerContext';

import styles from './home.module.scss';

interface Episode {
    id: string;
    title: string;
    members: string;
    publishedAt: string;
    thumbnail: string;
    url: string;
    duration: number;
    durationAsString: string;
}
interface HomeProps {
    latestEpidodes: Episode[];
    allEpisodes: Episode[];
}

const Home: React.FC<HomeProps> = ({ latestEpidodes, allEpisodes }) => {
    const { playList } = usePlayer();

    const episodeList = [...latestEpidodes, ...allEpisodes];

    return (
        <div className={styles.homePage}>
            <Head>
                <title>Home | Podcaster</title>
            </Head>

            <section className={styles.latestEpisodes}>
                <h2>Últimos lançamentos</h2>

                <ul>
                    {latestEpidodes.map((episode, index) => {
                        return (
                            <li key={episode.id}>
                                <Image
                                    width={192}
                                    height={192}
                                    src={episode.thumbnail}
                                    alt={episode.title}
                                    objectFit="cover"
                                />

                                <div className={styles.episodeDetails}>
                                    <Link href={`/episodes/${episode.id}`}>
                                        {episode.title}
                                    </Link>

                                    <p>{episode.members}</p>
                                    <span>{episode.publishedAt}</span>
                                    <span>{episode.durationAsString}</span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => playList(episodeList, index)}
                                >
                                    <img
                                        src="/play-green.svg"
                                        alt="Tocar episódio"
                                    />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </section>

            <section className={styles.allEpisodes}>
                <h2>Todos episódios</h2>
                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th> </th>
                            <th>Podcast</th>
                            <th>Integrantes</th>
                            <th>Data</th>
                            <th>Duração</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allEpisodes.map((episode, index) => {
                            return (
                                <tr key={episode.id}>
                                    <td style={{ width: 72 }}>
                                        <Image
                                            width={120}
                                            height={120}
                                            src={episode.thumbnail}
                                            alt={episode.title}
                                            objectFit="cover"
                                        />
                                    </td>
                                    <td>
                                        <Link href={`/episodes/${episode.id}`}>
                                            {episode.title}
                                        </Link>
                                    </td>
                                    <td>{episode.members}</td>
                                    <td style={{ width: 100 }}>
                                        {episode.publishedAt}
                                    </td>
                                    <td>{episode.durationAsString}</td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                playList(
                                                    episodeList,
                                                    index +
                                                        latestEpidodes.length
                                                )
                                            }
                                        >
                                            <img
                                                src="/play-green.svg"
                                                alt="Tocar episódio"
                                            />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const { data } = await api.get('episodes', {
        params: {
            _limit: 12,
            _sort: 'published_at',
            _order: 'desc'
        }
    });

    const episodes = data.map((episode: EpisodeDB) => {
        return {
            id: episode.id,
            title: episode.title,
            members: episode.members,
            publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
                locale: ptBR
            }),
            thumbnail: episode.thumbnail,
            url: episode.file.url,
            duration: Number(episode.file.duration),
            durationAsString: ConvertDurationToTimeString(
                Number(episode.file.duration)
            )
        };
    });

    const latestEpidodes = episodes.slice(0, 2);
    const allEpisodes = episodes.slice(2, episodes.length);

    return {
        props: {
            latestEpidodes,
            allEpisodes
        },
        revalidate: 60 * 60 * 8
    };
};

export default Home;
