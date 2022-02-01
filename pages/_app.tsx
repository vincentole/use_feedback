import type { AppProps } from 'next/app';
import { AuthProvider } from '@/lib/auth';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/styles/theme';
import Head from 'next/head';
import { css, Global } from '@emotion/react';

const GlobalStyle: React.FC = ({ children }) => {
    return (
        <>
            <Global
                styles={css`
                    html {
                        min-width: 360px;
                        scroll-behavior: smooth;
                    }
                    #__next {
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                    }
                `}
            />
            {children}
        </>
    );
};

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Use Feedback</title>
                <meta name='description' content='Use feedback in your project.' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            
                <ChakraProvider theme={theme}>
                    <AuthProvider>
                        <GlobalStyle>
                            <Component {...pageProps} />
                        </GlobalStyle>
                    </AuthProvider>
                </ChakraProvider>
            
        </>
    );
}

export default MyApp;
