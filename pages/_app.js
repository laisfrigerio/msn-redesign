function GlobalStyle () {
    return (
        <style global jsx>{`
        * {
            margin: 0;
            padding: 0;
            border: 0;
            box-sizing: border-box;
            list-style: none;
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
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
}

export default App
