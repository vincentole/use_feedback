import type { NextPage } from 'next';
import Head from 'next/head';
import { useAuth } from '../lib/auth';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
    const auth = useAuth();

    return (
        <div className={styles.container}>
            <Head>
                <title>Use Feedback</title>
                <meta name='description' content='Use feedback in your project.' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Use Feedback</h1>
                {!auth?.user && <button onClick={auth?.signinWithGitHub}>Sign In</button>}
                {auth?.user && <button onClick={auth?.signout}>Sign Out</button>}
                <div>{auth?.user?.email}</div>
                <div>Test</div>
            </main>
            <footer className={styles.footer}></footer>
        </div>
    );
};

export default Home;
