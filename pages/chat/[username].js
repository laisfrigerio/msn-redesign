import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowDown } from '../../components/ArrowDown';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { LoadingHeader } from '../../components/LoadingHeader';
import { useUserData } from '../../hooks/useUserData';
import { getChats } from '../../supabase';
import config from '../../config.json';

function HeaderProfile ({ userData }) {
    if (!userData) {
        return (<LoadingHeader />);
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
    const { blue100 } = config.theme.colors.primary;

    if (!chats.length) {
        return <></>;
    }

    return (
        <>
            <section>
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
            </section>
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

function ListChatPage () {
    const [chats, setChats] = useState([]);

    const router = useRouter();
    const { username } = router.query;
    const userData = useUserData(username);

    useEffect(() => {
        getChats().then((data) => setChats(data));
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
