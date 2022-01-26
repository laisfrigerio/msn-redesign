import { useState } from 'react'
import msnLogoImage from '../assets/images/msn-logo-white.png'
import config from '../config.json'

function BorderDesktop ({ children }) {
    return (
        <>
            <div>{children}</div>
            <style jsx>{`
                div {
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    align-items: center;
                }

                @media screen and (min-width: 642px) {
                    div {
                        padding: 30px 70px;
                        border: 5px solid ${config.theme.colors.primary.green};
                        border-radius: 20px;
                    }
                }
            `}</style>
        </>
    );
}

function Background ({ children }) {
    return (
        <>
            <section>{children}</section>
            <style jsx>{`
                section {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    background: transparent
                            linear-gradient(180deg, 
                                ${config.theme.colors.primary.blue500} 0%, 
                                ${config.theme.colors.primary.blue600} 100%)
                                 0% 0% no-repeat padding-box;
                    height: 100%;
                    width: 100%;
                }
            `}</style>
        </>
    );
}

function Image ({ src, ...props}) {
    const addDefaultSrc = (event) => {
        event.target.src = 'https://via.placeholder.com/150';
    }

    return (
        <img
            {...props}
            src={src}
            onError={addDefaultSrc}
        />
    );
}

function FormButton ({ label, marginTop = "0px", variant = "primary", ...props }) {
    return (
        <>
            <button
                className={variant}
                {...props}
            >
                {label}
            </button>
            <style jsx>{`
                button {
                    border-radius: 20px;
                    font-weight: 800;
                    margin-top: ${marginTop};
                    padding: 12px 32px;
                    width: 100%;
                }

                button.primary {
                    background-color: ${config.theme.colors.primary.green};
                    color: ${config.theme.colors.primary.blue600} ;
                }
            `}</style>
        </>
    );
}

function FormInput ({ name, placeholder = "", type = 'text', ...props}) {
    return (
        <>
            <input
                {...props}
                name={name}
                placeholder={placeholder}
                type={type}
            />
            <style jsx>{`
                input {
                    border-radius: 20px;
                    padding: 12px 12px;
                    outline: none;
                }

                input:focus {
                    border: 1px solid ${config.theme.colors.neutrals.white};
                    box-shadow: 0px 0px 15px 0px ${config.theme.colors.primary.green};
                }
            `}</style>
        </>
    );
}

function Form ({ username, onChangeUsername }) {
    return (
        <>
            <form>
                <FormInput
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => onChangeUsername(event.target.value)}
                />
                <FormButton
                    label="Entrar"
                    marginTop="10px"
                />
            </form>
            <style jsx>{`
                form {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    flex-direction: column;
                    margin-top: 15px;
                }
            `}</style>
        </>
    );
}

function ProfilePicture ({ img = "" }) {
    return (
        <>
            <section>
                {img && (<Image src={img} />)}
                <div></div>
            </section>
            <style jsx>{`

                section {
                    align-items: center;
                    display: flex;
                    justify-content: center;
                    background: transparent linear-gradient(
                        180deg, ${config.theme.colors.primary.green} 0%, ${config.theme.colors.primary.blue600} 100%) 0% 0% no-repeat padding-box;
                    box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%);
                    backdrop-filter: blur( 10px );
                    -webkit-backdrop-filter: blur( 10px );
                    border-radius: 50%;
                    height: 150px;
                    width: 150px;
                    margin: 20px 0;
                }

                section :global(img) {
                    border-radius: 50%;
                    height: 130px;
                    width: 130px;
                }
            `}</style>
        </>
    );
}

function Status () {
    return (
        <>
            <div className='status'>
                <p className='status-text'>Entrar como:</p>
                <div className='selected-status'>
                    <span></span>
                    <p>Disponível</p>
                </div>
            </div>
            <style jsx>{`
                .status {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    flex-direction: column;
                    padding: 8px 14px;
                    gap: 4px;
                    border-radius: 8px;
                }

                .status-text {
                    color: ${config.theme.colors.neutrals.white};
                    margin-bottom: 0;
                    font-family: sans-serif;
                    font-size: 13px;
                    font-weight: 100;
                }

                .selected-status {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    background: ${config.theme.colors.primary.blue450} 0% 0% no-repeat padding-box;
                    padding: 8px 16px;
                    gap: 4px;
                    border-radius: 8px;
                }

                .selected-status span {
                    background: ${config.theme.colors.primary.green} 0% 0% no-repeat padding-box;
                    border-radius: 4px;
                    height: 15px;
                    width: 15px;
                }

                .selected-status p {
                    color: ${config.theme.colors.neutrals.white};
                    font-family: sans-serif;
                    font-size: 13px;
                }
            `}</style>
        </>
    );
}

function Register () {
    return (
        <>
            <div className="register">
                <p>Não tem uma conta?</p>
                <a href="#">Clique aqui e registre-se.</a>
            </div>

            <style jsx>{`
                .register {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    flex-direction: column;
                    margin-top: 100px;
                }

                p {
                    color: ${config.theme.colors.neutrals.white};
                    font-family: sans-serif;
                    font-size: 14px;
                }

                a {
                    color: ${config.theme.colors.primary.blue400};
                    font-family: sans-serif;
                    font-size: 14px;
                    text-decoration: none;
                }
            `}</style>
        </>
    );
}

function HomePage () {
    const [username, setUsername] = useState('omariosouto');

    return (
        <>
            <Background>
                <BorderDesktop>
                    <Image
                        height="50px"
                        width="170px"
                        src={msnLogoImage.src}
                    />
                    <ProfilePicture img={`https://github.com/${username}.png`}/>
                    <Status />
                    <Form username={username} onChangeUsername={setUsername} />
                    <Register />
                </BorderDesktop>
            </Background>
        </>
    );
}

export default HomePage
