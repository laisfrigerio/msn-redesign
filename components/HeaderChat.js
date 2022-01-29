import { ProfilePicture } from './ProfilePicture';
import config from '../config.json';

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

export { HeaderChat }
