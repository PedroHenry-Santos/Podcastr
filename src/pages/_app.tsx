import { AppProps } from 'next/app';

import '../styles/global.scss';

import { Header } from '../Components/Header';
import { Player } from '../Components/Player';

import styles from '../styles/app.module.scss';
import { PlayerContextProvider } from '../contexts/PlayerContext';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <PlayerContextProvider>
            <div className={styles.wrapper}>
                <main>
                    <Header />
                    <Component {...pageProps} />
                </main>
                <Player />
            </div>
        </PlayerContextProvider>
    );
};

export default MyApp;
