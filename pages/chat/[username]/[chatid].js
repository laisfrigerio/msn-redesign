import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Background } from '../../../components/Background';
import { Header } from '../../../components/Header';
import { LoadingHeader } from '../../../components/LoadingHeader';
import { Send } from '../../../icons/Send';
import { useUserData } from '../../../hooks/useUserData';
import { getChat, saveMessage } from '../../../supabase';
import config from '../../../config.json';

function ChatInfo ({ chatInfo }) {
    if (!chatInfo) {
        return (<LoadingHeader />);
    }
    
    const { name, description } = chatInfo
    const { blue100, blue700, blue750 } = config.theme.colors.primary;

    return (
        <>
            <section>
                <p>{name}</p>
                <small>{description}</small>
            </section>
            <style jsx>{`
                section {
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
            `}</style>
        </>
    );
}

function Message ({ message }) {
    const { content, from_github_name } = message
    const { green, blue100, blue700, blue750 } = config.theme.colors.primary;

    return (
        <>
            <li>
                <div>{from_github_name} diz:</div>
                <p>{content}</p>
            </li>
            <style jsx>{`
                li {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    background: ${green};
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
                    border-top: 10px solid ${green};
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

    function submitMessage (event) {
        if (event.code === 'Enter') {
            const payload = {
                chat_id: chatId,
                content: currentMessage,
                from_github_name: currentUser.name,
                from_github_login: currentUser.login
            }

            setMessages([
                {...payload, id: messages.length + 1 },
                ...messages]);
            setCurrentMessage('');
            saveMessage(payload);
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
                            />
                        );
                    })}
                </ul>
                <div className='input-area'>
                    <input
                        type="text" 
                        value={currentMessage}
                        onChange={onChangeInput}
                        onKeyPress={submitMessage}
                    />
                    <button type="button">
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
    const currentUser = useUserData(router.query.username);
    const chatId = router.query.chatid;

    const [chatInfo, setChatInfo] = useState(null);
    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getChat(chatId).then(data => setChatInfo(data))
    }, [])

    return (
        <>
            <Background>
                <Header userData={currentUser} />
                <ChatInfo chatInfo={chatInfo} />
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
