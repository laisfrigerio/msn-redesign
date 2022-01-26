function Image ({ src, ...props}) {
    const addDefaultSrc = (event) => {
        event.target.src = 'https://via.placeholder.com/150';
    }

    return (
        <img
            {...props}
            src={src}
            onError={addDefaultSrc}
        />
    );
}

export { Image }
