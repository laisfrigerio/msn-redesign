import Head from 'next/head';

function GlobalStyle () {
    return (
        <style global jsx>{`
        * {
            margin: 0;
            padding: 0;
            border: 0;
            box-sizing: border-box;
            list-style: none;
            font-family: sans-serif;
        }

        body, html, #__next {
            min-height: 100vh;
            display: flex;
            flex: 1;
        }
    `}</style>
    );
}

function App ({ Component, pageProps }) {
    const pageTitle = 'MSN Redesign | Alura';
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content="Primeira Imersão React 2022 da Alura com o tema clone do discord: um chat. Customizado com o layout de um redesign do MSN." />
                <meta property="og:type" content="website" />
                <meta property="og:image" itemprop="image" content="/og-image.png"></meta>
                <meta name="keywords" content="Imersão, React, Alura, alura-cord, 2022, MSN, redesign"></meta>
                <meta name="author" content="Lais Frigério"></meta>
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="icon" href="favicon-16x16.png" sizes="16x16" type="image/png" />
                <link rel="icon" href="favicon-32x32.png" sizes="32x32 48x48" type="image/png" />
            </Head>
            <GlobalStyle />
            <Component {...pageProps}/>
        </>
    );
}

export default App
