import { useState } from 'react';
import { useRouter } from 'next/router';
import { Background } from '../../components/Background';
import { HeaderChat } from '../../components/HeaderChat';
import { Send } from '../../icons/Send';
import { useUserData } from '../../hooks/useUserData';
import config from '../../config.json';

function Message () {
    return (
        <>
            <li>
                <div>User foto</div>
                <p>Mensagem</p>
            </li>
            <style jsx>{`
            
            `}</style>
        </>
    );
}

function Chat () {
    const [messages, setMessages] = useState([]);
    const { green, blue100, blue750 } = config.theme.colors.primary;

    return (
        <>
            <section>
                <ul>
                    {messages.map((message) => {
                        return (
                            <Message
                                key={message.id}
                                content={message.content}
                                user={message.user}
                            />
                        );
                    })}
                </ul>
                <div className='input-area'>
                    <input />
                    <button type="button">
                        <Send color={blue750} />
                    </button>
                </div>
            </section>
            <style jsx>{`
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
    const { username } = router.query
    const userData = useUserData(username);

    return (
        <>
            <Background>
                <HeaderChat userData={userData} />
                <Chat />
            </Background>
        </>
    );
}

export default ChatPage
