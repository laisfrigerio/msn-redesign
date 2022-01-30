function LoadingHeader () {
    return (
        <>
            <p>Loading ....</p>
            <style jsx>{`
                p {
                    align-items: center;
                    display: flex;
                    justify-content: center;
                    height: 101px;
                    width: 100%;
                }
            `}</style>
        </>
    );
}

export { LoadingHeader }
