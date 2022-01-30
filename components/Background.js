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
                    box-shadow: 0 8px 4px 0 rgb(229 229 229);
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
