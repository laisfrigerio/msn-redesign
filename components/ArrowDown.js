import config from '../config.json';

function ArrowDown () {
    const { blue700 } = config.theme.colors.primary;

    return (
        <>
            <i className="arrow down"></i>
            <style jsx>{`
                .arrow {
                    border: solid ${blue700};
                    border-width: 0 2px 2px 0;
                    display: inline-block;
                    padding: 3px;
                  }

                .down {
                    transform: rotate(45deg);
                    -webkit-transform: rotate(45deg);
                }
            `}</style>
        </>
    );
}

export { ArrowDown }
