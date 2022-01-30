import config from '../config.json';

const { gray300 } = config.theme.colors.neutrals;

function Skeleton ({ borderRadius = '0', isCircle = false, color = gray300, height = '50px', width = '100%' }) {
    const { white } = config.theme.colors.neutrals;

    return (
        <>
            <div></div>
            <style jsx>{`
                div {
                    display: inline-block;
                    height: ${height};
                    min-height: ${height};
                    position: relative;
                    overflow: hidden;
                    background-color: ${color};
                    width: ${width};
                    min-width: ${width};
                    border-radius: ${isCircle ? '50%' : borderRadius};
                }

                div::after {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    transform: translateX(-100%);
                    background: linear-gradient(to right, transparent 0%, #E8E8E8 50%, transparent 100%);
                    animation: loading 2s infinite;
                    content: '';
                }

                @keyframes loading {  
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>
        </>
    );
}

export { Skeleton }
