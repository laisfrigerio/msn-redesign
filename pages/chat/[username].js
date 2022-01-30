import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowDown } from '../../components/ArrowDown';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { Skeleton } from '../../components/Skeleton';
import { SkeletonHeaderProfile } from '../../components/SkeletonHeaderProfile';
import { useUserData } from '../../hooks/useUserData';
import { getChats, saveChat, subscribeChats } from '../../supabase';
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
        return <SkeletonHeaderProfile />;
    }

    return (
        <>
            <Header userData={userData} />
        </>
    );
}

function AddChat ({ setAddNewChat }) {
    const [chatName, setChatName] = useState('');
    const [chatDescrition, setChatDescrition] = useState('');
    const { green, blue750 } = config.theme.colors.primary;
    const { gray300, gray600 } = config.theme.colors.neutrals;

    const [disabled, setDisabled]  = useState(false);

    function sendChat (event) {
        event.preventDefault();
        
        setDisabled(true);

        const payload = {
            name: chatName,
            description: chatDescrition
        }

        saveChat(payload)
            .then((response) => {
                if (response) {
                    setChatName('');
                    setChatDescrition('');
                    setAddNewChat(false);
                }

                setDisabled(true);
            });
    }

    return (
        <>
            <form>
                <input
                    placeholder="Chat name"
                    value={chatName}
                    onChange={(event) => setChatName(event.target.value)}
                />

                <input
                    placeholder="Chat description"
                    value={chatDescrition}
                    onChange={(event) => setChatDescrition(event.target.value)}
                />
                <button
                    disabled={chatName === '' || chatName.length < 3 || disabled}
                    onClick={sendChat}
                >
                    Save
                </button>
            </form>
            <style jsx>{`
                form {
                    display: flex;
                    flex-direction: column;
                    border-radius: 10px;
                    gap: 16px;
                    // padding: 16px;
                    margin-top: 50px;
                    // border: 1px solid ${blue750};
                }

                input {
                    color: ${blue750};
                    height: 48px;
                    padding: 8px 12px;
                    position: relative;
                    width: 100%;
                    border: 1px solid #dae8ef;
                    border-radius: 16px;
                }

                input:focus {
                    outline: 1px solid #516a8f;
                }

                button {
                    background: ${green};
                    color: ${blue750};
                    font-weight: bold;
                    border-radius: 10px;
                    cursor: pointer;
                    height: 48px;
                    padding: 10px;
                    width: fit-content;
                }

                button:disabled {
                    background: ${gray300};
                    color: ${gray600};
                }
            `}</style>
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
                    margin-bottom: 12px;
                }
                a {
                    text-decoration: none;
                    padding: 12px;
                    width: 100%;
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

function ListChatHeader ({ addNewChat, setAddNewChat }) {
    const { green, blue700 } = config.theme.colors.primary;

    return (
        <>
            <div className='chat-header'>
                <div className='chat-name'>
                    <p>Chat</p>
                    <ArrowDown />
                </div>
                <button
                    className='chat-new'
                    onClick={() => setAddNewChat(!addNewChat)}
                >+</button>
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
                    color: ${blue700};
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

function ListChats ({ chats, username, addNewChat, setAddNewChat }) {
    if (!chats.length) {
        return (
            <>
                <div className='skeleton'>
                    <Skeleton borderRadius="10px" height="50px" />
                    <Skeleton borderRadius="10px" height="50px" width="80%" />
                    <Skeleton borderRadius="10px" height="50px" width="50%" />
                    <Skeleton borderRadius="10px" height="50px" width="30%" />
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
                <ListChatHeader addNewChat={addNewChat} setAddNewChat={setAddNewChat} />
                {addNewChat && (<AddChat setAddNewChat={setAddNewChat}/>)}
                {!addNewChat && (<ul>
                    {chats.map((chat) => {
                        return (
                            <ListChatItem
                                key={chat.id}
                                chat={chat}
                                username={username}
                            />
                        );
                    })}
                </ul>)}
            </BackgroundList>
        </>
    );
}

function ListChatPage () {
    const [chats, setChats] = useState([]);
    const [addNewChat, setAddNewChat] = useState(false);

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
                    addNewChat={addNewChat}
                    setAddNewChat={setAddNewChat}
                />
            </Background>
        </>
    );
}

export default ListChatPage
