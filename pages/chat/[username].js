import { useRouter } from 'next/router';
import { Background } from '../../components/Background';
import { HeaderChat } from '../../components/HeaderChat';
import { useUserData } from '../../hooks/useUserData';

function Chat () {
    return (
        <>
            <section></section>
            <style jsx>{`
            
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
            </Background>
        </>
    );
}

export default ChatPage
