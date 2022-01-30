import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Background } from '../../../components/Background';
import { Header } from '../../../components/Header';
import { Skeleton } from '../../../components/Skeleton';
import { ArrowLeft } from '../../../icons/ArrowLeft';
import { Send } from '../../../icons/Send';
import { useUserData } from '../../../hooks/useUserData';
import { getChat, getMessagesByChat, saveMessage, subscribeMessagesByChat } from '../../../supabase';
import config from '../../../config.json';

function ChatInfo ({ chatInfo, username }) {
    if (!chatInfo) {
        return (
            <>
                <div className='skeleton'>
                    <Skeleton isCircle height="10px" width="10px" />
                    <div>
                        <Skeleton borderRadius="10px" height="15px" />
                        <Skeleton borderRadius="10px" height="15px" width="70%" />
                    </div>
                </div>
                <style jsx>{`
                    .skeleton {
                        align-items: center;
                        display: flex;
                        margin: 0 12px 16px;
                        padding: 16px;
                        gap: 8px;
                    }
    
                    .skeleton div {
                        width: 100%;
                    }
                `}</style>
            </>
        );
    }
    
    const { name, description } = chatInfo
    const { blue100, blue700, blue750 } = config.theme.colors.primary;

    return (
        <>
            <section>
                <Link href={`/chat/${username}`}>
                    <a>
                        <ArrowLeft color={blue700} />
                    </a>
                </Link>
                <div>
                    <p>{name}</p>
                    <small>{description}</small>
                </div>
            </section>
            <style jsx>{`
                section {
                    align-items: center;
                    display: flex;
                    gap: 16px;
                    background: ${blue100};
                    margin: 0 12px 16px;
                    padding: 16px;
                    border-radius: 10px;
                }

                p {
                    color: ${blue750};
                }

                small {
                    color: ${blue700};
                }

                section :global(.ico-arrow-left) {
                    cursor: pointer;
                }
            `}</style>
        </>
    );
}

function Message ({ message, username }) {
    const { content, from_github_login, from_github_name } = message
    const { green, blue100, blue700, blue750 } = config.theme.colors.primary;
    const { white } = config.theme.colors.neutrals;

    function isMessageFromCurrentUser () {
        return username === from_github_login ? green : white;
    }

    return (
        <>
            <li>
                <div>{from_github_name || from_github_login} diz:</div>
                <p>{content}</p>
            </li>
            <style jsx>{`
                li {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    background: ${isMessageFromCurrentUser()};
                    margin: 10px;
                    border-radius: 16px;
                    padding: 12px;
                    position: relative;
                    width: fit-content;
                }

                li div {
                    color: ${blue700};
                    font-size: 13px;
                    margin-bottom: 4px;
                }

                li p {
                    color: ${blue750};
                    font-size: 16px;
                }

                li:after {
                    content: "";
                    bottom: -9px;
                    position: absolute;
                    right: 16px;
                    border-left: 10px solid ${blue100};
                    border-right: 10px solid ${blue100};
                    border-top: 10px solid ${isMessageFromCurrentUser()};
                }
            `}</style>
        </>
    );
}

function Chat ({ chatId, currentUser, currentMessage, setCurrentMessage, messages, setMessages }) {
    const { green, blue100, blue750 } = config.theme.colors.primary;

    function onChangeInput (event) {
        event.preventDefault();
        const message = event.target.value;
        setCurrentMessage(message);
    }

    function sendCurrentMessage () {
        if (currentMessage !== '') {
            const payload = {
                chat_id: chatId,
                content: currentMessage,
                from_github_name: currentUser.name,
                from_github_login: currentUser.login
            }
            setCurrentMessage('');
            saveMessage(payload);
        }
    }

    function onKeyPressInput (event) {
        if (event.code === 'Enter' && currentMessage !== '') {
            sendCurrentMessage()
        }
    }

    return (
        <>
            <section>
                <ul>
                    {messages.map((message) => {
                        return (
                            <Message
                                key={message.id}
                                message={message}
                                username={currentUser.login}
                            />
                        );
                    })}
                </ul>
                <div className='input-area'>
                    <input
                        type="text" 
                        value={currentMessage}
                        onChange={onChangeInput}
                        onKeyPress={onKeyPressInput}
                    />
                    <button type="button" onClick={sendCurrentMessage}>
                        <Send
                            color={blue750}
                        />
                    </button>
                </div>
            </section>
            <style jsx>{`
                ul {
                    display: flex;
                    flex: 1;
                    flex-direction: column-reverse;
                    height: 340px;
                    overflow-y: scroll;
                    padding: 4px;
                }

                section {
                    background-color: ${blue100};
                    height: 400px;
                    position: relative;
                }

                .input-area {
                    bottom: 4px;
                    max-width: 600px;
                    position: absolute;
                    width: 100%;
                    padding: 0 4px;
                }

                .input-area input {
                    color: ${blue750};
                    height: 48px;
                    padding: 8px 12px;
                    position: relative;
                    width: 100%;
                    border: 1px solid #dae8ef;
                    border-radius: 16px;
                }

                .input-area input:focus {
                    outline: 1px solid #516a8f;
                }

                .input-area button {
                    background: ${green};
                    border-radius: 50%;
                    cursor: pointer;
                    height: 35px;
                    position: absolute;
                    right: 10px;
                    top: 7px;
                    width: 35px;
                }
            `}</style>
        </>
    );
}

function ChatPage () {
    const router = useRouter();
    const username = router.query.username;
    const currentUser = useUserData(username);
    const chatId = router.query.chatid;

    const [chatInfo, setChatInfo] = useState(null);
    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getChat(chatId).then(data => setChatInfo(data));
    }, [])

    useEffect(() => {
        if (!chatId) {
            return;
        }

        getMessagesByChat(chatId).then(data => setMessages(data));

        const subscription = subscribeMessagesByChat(chatId, (newMessage) => {
            setMessages((currentListMessages) => {
                return [ newMessage, ...currentListMessages ]
            });
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [chatId]);

    return (
        <>
            <Background>
                <Header userData={currentUser} />
                <ChatInfo chatInfo={chatInfo} username={username} />
                <Chat
                    chatId={chatId}
                    currentUser={currentUser}
                    currentMessage={currentMessage}
                    setCurrentMessage={setCurrentMessage}
                    messages={messages}
                    setMessages={setMessages}
                />
            </Background>
        </>
    );
}

export default ChatPage
