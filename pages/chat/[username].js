import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowDown } from '../../components/ArrowDown';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { LoadingHeader } from '../../components/LoadingHeader';
import { Skeleton } from '../../components/Skeleton';
import { useUserData } from '../../hooks/useUserData';
import { getChats, subscribeChats } from '../../supabase';
import config from '../../config.json';

function BackgroundList ({ children }) {
    const { blue100 } = config.theme.colors.primary;

    return (
        <>
            <section>{children}</section>
            <style jsx>{`
                section {
                    background: ${blue100};
                    padding: 16px 24px;
                    height: 500px;
                    overflow-y: auto;
                }
            `}</style>
        </>
    );
}

function HeaderProfile ({ userData }) {
    if (!userData) {
        return (
            <>
                <div className='skeleton'>
                    <Skeleton isCircle height="50px" width="50px" />
                    <div>
                        <Skeleton height="15px" />
                        <Skeleton height="15px" width="70%" />
                    </div>
                </div>
                <style jsx>{`
                    .skeleton {
                        align-items: center;
                        display: flex;
                        padding: 8px 16px;
                        gap: 8px;
                    }
    
                    .skeleton div {
                        width: 100%;
                    }
                `}</style>
            </>
        );
    }

    return (
        <>
            <Header userData={userData} />
        </>
    );
}

function ListChatItem ({ chat, username }) {
    const { blue700, blue750 } = config.theme.colors.primary;
    const { white } = config.theme.colors.neutrals;
    const { description, id, name } = chat;

    return (
        <>
            <li>
                <Link href={`/chat/${username}/${id}`}>
                    <a>
                        <p>{name}</p>
                        <small>{description}</small>
                    </a>
                </Link>
            </li>
            <style jsx>{`
                li  {
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: ${white};
                    border-radius: 10px;
                    padding: 12px;
                    margin-bottom: 12px;
                }
                a {
                    text-decoration: none;
                }

                li p {
                    color: ${blue750};
                }

                li small {
                    color: ${blue700};
                }
            `}</style>
        </>
    );
}

function ListChatHeader () {
    const { green, blue700 } = config.theme.colors.primary;

    return (
        <>
            <div className='chat-header'>
                <div className='chat-name'>
                    <p>Chat</p>
                    <ArrowDown />
                </div>
                <div className='chat-new'>+</div>
            </div>
            <style jsx>{`
                .chat-header {
                    display: flex;
                    justify-content: space-between;
                    color: ${blue700};
                    margin-bottom: 24px;
                }

                .chat-name {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: ${blue700};
                    font-size: 14px;
                }

                .chat-name p {
                    margin-bottom: -3px;
                }

                .chat-new {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: ${green};
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: bold;
                    height: 35px;
                    width: 35px;
                }
            `}</style>
        </>
    );
}

function ListChats ({ chats, username }) {
    if (!chats.length) {
        return (
            <>
                <div className='skeleton'>
                    <Skeleton borderRadius="10px" height="50px" />
                    <Skeleton borderRadius="10px" height="50px" />
                    <Skeleton borderRadius="10px" height="50px" />
                    <Skeleton borderRadius="10px" height="50px" />
                </div>
                <style jsx>{`
                    .skeleton {
                        display: flex;
                        flex-direction: column;
                        gap: 16px;
                        width: 100%;
                        padding: 24px 12px;
                    }
                `}</style>
            </>
        );
    }

    return (
        <>
            <BackgroundList>
                <ListChatHeader />
                <ul>
                    {chats.map((chat) => {
                        return (
                            <ListChatItem
                                key={chat.id}
                                chat={chat}
                                username={username}
                            />
                        );
                    })}
                </ul>
            </BackgroundList>
        </>
    );
}

function ListChatPage () {
    const [chats, setChats] = useState([]);

    const router = useRouter();
    const { username } = router.query;
    const userData = useUserData(username);

    useEffect(() => {
        getChats().then((data) => setChats(data));

        const subscription = subscribeChats((newChat) => {
            setChats((currentChatList) => {
                return [ newChat, ...currentChatList ]
            });
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    return (
        <>
            <Background>
                <HeaderProfile userData={userData} />
                <ListChats
                    chats={chats}
                    username={username}
                />
            </Background>
        </>
    );
}

export default ListChatPage
