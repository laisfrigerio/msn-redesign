import config from '../config.json';

function Background ({ children }) {
    const { white } = config.theme.colors.neutrals;
    
    return (
        <>
            <section>{children}</section>
            <style jsx>{`
                section {
                    background: ${white};
                    height: 100vh;
                    width: 100%;
                    max-width: 600px;
                    margin: 20px auto 0;
                    box-shadow: 0px 0px 10px -1px rgb(237 237 237);
                }

                @media screen and (min-width: 642px) {
                    section {
                        height: 500px;
                        margin: 200px auto 0;
                    }
                }
            `}</style>
        </>
    );
}

export { Background }
