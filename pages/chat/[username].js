import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowDown } from '../../components/ArrowDown'
import { ProfilePicture } from '../../components/ProfilePicture';
import config from '../../config.json';

function Background ({ children }) {
    const { white } = config.theme.colors.neutrals;
    
    return (
        <>
            <section>{children}</section>
            <style jsx>{`
                section {
                    background: ${white};
                    height: 100%;
                    width: 100%;
                    max-width: 600px;
                    margin: 20px auto 0;
                    box-shadow: 0 8px 4px 0 rgb(229 229 229);
                }
            `}</style>
        </>
    );
}

function HeaderChat ({ userData }) {
    const { blue700, blue750 } = config.theme.colors.primary;

    if (!userData) {
        return (
            <p>Loading ....</p>
        );
    }

    const { avatar_url, bio, name } = userData

    return (
        <>
            <div className='header-chat'>
                <ProfilePicture img={avatar_url} />
                <div className='profile-name-status'>
                    <p>{name}</p>
                    <small>{bio}</small>
                </div>
            </div>
            <style jsx>{`
                .header-chat {
                    display: flex;
                    gap: 8px;
                    padding: 24px 12px;
                }

                .profile-name-status {
                    display: flex;
                    flex-direction: column;
                }

                p, small {
                    font-family: sans-serif;
                }

                p {
                    color: ${blue750};
                    font-size: 20px;
                    font-weight: 800;
                }

                small {
                    color: ${blue700};
                }

                div :global(.profile-picture) {
                    height: 50px;
                    margin: 0;
                    min-width: 50px;
                    width: 50px;
                }

                div :global(.profile-picture img) {
                    height: 40px;
                    width: 40px;
                }
            `}</style>
        </>
    );
}

function Favorites ({ following }) {
    const { blue100, blue700, blue750 } = config.theme.colors.primary;
    const { white } = config.theme.colors.neutrals;

    if (!following.length) {
        return <></>;
    }

    const renderUser = ({ avatar_url, id, html_url, login }) => {
        return (
            <li className='card-user' key={id}>
                <ProfilePicture img={avatar_url} />
                <div>
                    <p>{login}</p>
                    <small>{html_url}</small>
                </div>
            </li>
        );
    }

    return (
        <>
            <section>
                <div className='title'>
                    <p>Favoritos</p>
                    <ArrowDown />
                </div>
                <ul>
                    {following.map((user) => renderUser(user))}
                </ul>
            </section>
            <style jsx>{`
                section {
                    background: ${blue100};
                    padding: 16px 24px;
                }

                .title {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: ${blue700};
                    font-family: sans-serif;
                    font-size: 14px;
                    margin-bottom: 24px;
                }

                .title p {
                    margin-bottom: -3px;
                }

                section :global(.card-user) {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: ${white};
                    border-radius: 10px;
                    padding: 12px;
                    margin-bottom: 12px;
                }

                section :global(.card-user p),
                section :global(.card-user small) {
                    font-family: sans-serif;
                }

                section :global(.card-user p) {
                    color: ${blue750};
                }

                section :global(.card-user small) {
                    color: ${blue700};
                }

                section :global(.profile-picture) {
                    height: 42px;
                    margin: 0;
                    min-width: 42px;
                    width: 42px;
                    background: transparent linear-gradient(
                        180deg, ${config.theme.colors.primary.green} 0%, ${config.theme.colors.neutrals.white} 100%) 0% 0% no-repeat padding-box;
                }

                section :global(.profile-picture img) {
                    height: 32px;
                    width: 32px;
                }
            `}</style>
        </>
    );
}

function ChatPage () {
    const [userData, setUserData] = useState(null);
    const [following, setFollowing] = useState([]);

    const router = useRouter();
    const { username } = router.query

    useEffect(() => {
        if (!username) {
            return;
        }

        fetch(`https://api.github.com/users/${username}`)
            .then((response) => response.json())
            .then((data) => setUserData(data))
    }, [username]);

    useEffect(() => {
        if (!userData) {
            return;
        }

        const { following_url } = userData;

        if (followingUrl === null) {
            return;
        }

        const followingUrl = following_url.replace('{/other_user}', '');

        fetch(followingUrl)
            .then((response) => response.json())
            .then((data) => setFollowing(data))

    }, [userData]);

    return (
        <>
            <Background>
                <HeaderChat userData={userData} />
                <Favorites following={following} />
            </Background>
        </>
    );
}

export default ChatPage
