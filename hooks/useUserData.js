import { useEffect, useState } from 'react';

function useUserData (username) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!username) {
            return;
        }

        fetch(`https://api.github.com/users/${username}`)
            .then((response) => response.json())
            .then((data) => setUserData(data))
            .catch(() => setUserData(null))
    }, [username]);

    return userData
}

export { useUserData }
